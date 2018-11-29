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
            url: 'https://api.tipe.io/api/v1/document/5bef4999ccea83001386cc1e',
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
        let logosText = "Demand Progress, American Family Voices, CA Clean Money Action Fund, California League of Conservation Voters, Center For Media Justice, Climate Hawks Vote, Color Of Change, Common Cause, Common Dreams, CPD Action, Daily Kos, Democracy for America, Free Press Action Fund, Friends of the Earth Action, The Nation, OpenMedia, People For The American Way, Presente Action, Progress America, RootsAction, SumOfUs, Watchdog.net, The Zero Hour"
        let tweet = "https://twitter.com/intent/tweet?text=Tell%20your%20representative%20to%20stand%20for%20real%20%23NetNeutrality%20by%20supporting%20the%20Congressional%20Review%20Act%20resolution%20to%20save%20the%20open%20internet.%20Call%20Congress%20TODAY%3A%20https%3A%2F%2Fstopthefcc.net%2F%20"

        if(this.state.allLogos){
           let orderedLogos = this.state.allLogos.sort(function(a, b) {
               let firstLogoName = a.name.toLowerCase();
               let secondLogoName = b.name.toLowerCase();
                if(firstLogoName.indexOf('the ') === 0) {
                    firstLogoName =  firstLogoName.substring(4);
                }

                if(secondLogoName.indexOf('the ') === 0){
                    secondLogoName = secondLogoName.substring(4);
                }

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
        }

        return (
            <div id="footer">
                <div className="footer">
                    <div className="logos-unit">
                        <div className="built-by">
                            <p><br/><br/>Built by:</p> <img src={this.state.dpLogoUrl} />
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
                                <a className="facebook" href="https://www.facebook.com/sharer.php?u=https://www.stopthefcc.net/" target="_blank">
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