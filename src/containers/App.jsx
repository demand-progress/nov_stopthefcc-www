import React, { Component } from 'react';
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import Responsive from 'react-responsive-decorator';


class App extends Component  { 
   constructor(props){
       super(props)
       this.state = {
           showLogos: false,
           isMobile: true,
           statement_text: '',
           about_text: '',
           statement_leadin: '',
       }
       this.logoCheck = this.logoCheck.bind(this)
       this.getActionKitData = this.getActionKitData.bind(this)
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

      this.getActionKitData()
   }

   logoCheck(isVisible){
    if(isVisible && this.state.isMobile){
        this.setState({
            showLogos: true
        })
      }
   }

   getActionKitData(){
     fetch('https://cors-anywhere.herokuapp.com/https://vexq0wyt42.execute-api.us-east-1.amazonaws.com/default/dp-ak-service?page=2662')
      .then(res => res.json())
      .then(data => {
        console.log(data.objects[0])
        this.setState({
          statement_text: data.objects[0].statement_text,
          about_text: data.objects[0].about_text,
          statement_leadin: data.objects[0].statement_leadin,
        })
      })
      .catch(err => console.log('FAILED TO FETCH AK API', err));
   }
   
    render(){
        return(
            <div>
                <Main 
                  logoCheck={this.logoCheck} 
                  isMobile={this.state.isMobile}
                  statementText={this.state.statement_text}
                  aboutText={this.state.about_text}
                  statementLeadin={this.state.statement_leadin}
                  />
                <Footer showLogos={this.state.showLogos} isMobile={this.state.isMobile}/>
            </div>
        )
    }
  
}

export default Responsive(App);