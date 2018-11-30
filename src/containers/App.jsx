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
   }

   logoCheck(isVisible){
    if(isVisible && this.state.isMobile){
        this.setState({
            showLogos: true
        })
      }
   }
   
    render(){
        return(
            <div>
                <Main logoCheck={this.logoCheck} isMobile={this.state.isMobile}/>
                <Footer showLogos={this.state.showLogos} isMobile={this.state.isMobile}/>
            </div>
        )
    }
  
}

export default Responsive(App);