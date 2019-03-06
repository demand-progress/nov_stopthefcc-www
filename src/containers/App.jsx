import React, { Component } from 'react';
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import Responsive from 'react-responsive-decorator';


class App extends Component  { 
   constructor(props){
       super(props)
       this.state = {
           showLogos: false,
           isMobile: true
       }
       this.logoCheck = this.logoCheck.bind(this)
       this.fetchS3Content = this.fetchS3Content.bind(this)
   }


   componentDidMount(){
    this.props.media({ minWidth: 768 }, () => {
        this.setState({
          isMobile: false
        }, () => {console.log('is mobile?', this.state.isMobile)})
      })
      this.props.media({ maxWidth: 768 }, () => {
        this.setState({
          isMobile: true
        }, () => {console.log('is mobile?', this.state.isMobile)})
      })

      this.fetchS3Content()
   }

   logoCheck(isVisible){
    if(isVisible && this.state.isMobile){
        this.setState({
            showLogos: true
        })
      }
   }

   fetchS3Content(){
      fetch('https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/demand-progress/stop-the-fcc.json')
      .then(res => {
        return res.json()
      })
      .then(content => {
        let newState = Object.assign(this.state, content)
        this.setState(newState)
      })
      .catch(err => {
        console.log(err)
      })
   }
   
    render(){
      console.log(this.state)
        return(
            <div>
                <Main 
                  logoCheck={this.logoCheck} 
                  isMobile={this.state.isMobile}
                  content={this.state.content}
                  headerContent={this.state.acf}
                  />
                <Footer showLogos={this.state.showLogos} isMobile={this.state.isMobile}/>
            </div>
        )
    }
  
}

export default Responsive(App);