import React, {Component} from 'react'
import Logo from './Logo.jsx'
import axios from 'axios'

class Footer extends Component {
    constructor(props){
        super(props)

        this.state = {
            allLogos: null
        }
    }

    componentDidMount(){
        axios({
            method: "get",
            url: 'https://api.tipe.io/api/v1/document/5bec770936d58100136e41bb',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'DC37ZIL72X4BNJ6A3SPO6KF5N',
              'Tipe-Id': 'NWFlOWYyYTQzMjNmYzkwMDEzY2I0ZGZh'
            }
          })
          .then(response => {
            const logos = response.data.blocks
            const swapLogos = logos.filter(element => element.apiId !== 'demandProgressAction');
            const dpLogoUrl = logos.filter(element => element.apiId === 'demandProgressAction')[0].value.url;
            this.setState({
              allLogos: swapLogos,
              dpLogoUrl
            })
          })
          .catch(console.error);
          
    }
    
    render(){
        let logos = null
        let logosText = null
        let tweet = "https://twitter.com/intent/tweet?text="+this.props.tweet

        if(this.state.allLogos){
           let orderedLogos = this.state.allLogos.sort(function(a, b) {
               logosText = []
               const firstLogoName = a.name.toLowerCase();
               const secondLogoName = b.name.toLowerCase();
                if (/\d/.test(firstLogoName)){
                    return -1 
                } else if(/\d/.test(secondLogoName)){
                    return 1
                } else {
                    return (firstLogoName < secondLogoName) ? -1 : (firstLogoName > secondLogoName) ? 1 : 0;
                }     
            })
            
            logos = orderedLogos.map(({ key, name, value}) => {
              return <Logo key={value.key} alt={name} src={value.url}/>
                } 
            )

            this.state.allLogos.forEach((logo) => {
                if(/\d/.test(logo.name)){
                    name = logo.name.substring(1)
                    logosText.push(name)
                } else {
                    logosText.push(logo.name)
                }
            })
            logosText = logosText.join(', ')  
        } else {
            logosText = ''+ this.props.swapPartners
        }

        return (
            <div id="footer">
                <div className="footer">
                    <div className="logos-unit">
                        <div className="built-by">
                            <p><br/><br/>Built by:</p> <img src={this.state.dpLogoUrl} />
                            {/* <p>In partnership with: </p> <img src="images/DailyKosLogo.png" /> */}
                        </div>
                        <div className="logos" style={{display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center"}}>
                            {logos}
                        </div>
                        <div className="media-press-social">
                            <div className="social-media">
                                <a className="twitter" href={tweet} target="_blank">
                                    <img src="images/twitter_white.svg" />
                                    <span>Share on twitter</span>
                                </a>
                                <a className="facebook" href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fstopthefcc.net%2Ffb%3Fsource%3Dfbshare" target="_blank">
                                    <img src="images/facebook_white.svg" />
                                    <span>Share on facebook</span>
                                </a>
                            </div> 
                            <div className="press-inquiries">
                                <h3>For Press inquiries, please contact us at:</h3>
                                <p>
                                    <a className="no-em" href="tel:1-202-681-7582">202-681-7582</a> or <a href="mailto:press@demandprogress.org">press@demandprogress.org</a>
                                </p>

                                <br/>
                                <p>
                                    <a href="https://demandprogress.org/privacy-policy/" target="_blank">Our privacy policy</a>
                                </p>
                            </div>        
                        </div>
                        <div className="orgs">{logosText}</div>
                    </div>
                </div>
            </div>);
    }
}

export default Footer;