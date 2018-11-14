import React, { Component } from 'react';
import { CONF } from '../config/index'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import axios from 'axios'
import keys from '../config/keys'

class App extends Component {
   
    constructor(props) {
        super(props)

        this.state = {
            textContent: {
                header: null,
                subHeader: null,
                congressLanguage: null,
                main: null,
                disclaimer: null,
                formButton: null,
                modalHeader: null,
                modalText: null,
                tweet: null
            },
            loading: true
        }  
    }

    componentDidMount(){
        const { tipeAuth, tipeId } = keys;
        window.scrollTo(0, 0);

        axios({
          method: "get",
          url: 'https://api.tipe.io/api/v1/document/5bec764ad21b7c0013457284',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': tipeAuth,
            'Tipe-Id': tipeId
          }
        })
        .then(response => {
          const { data } = response
          const textContent = {}
          data.blocks.map((textObject) => {
            const { name, value}  = textObject
            textContent[name] = value
          })
          this.setState({
            textContent,
            loading: false
          })
        })
        .catch(console.error);

      }

    render() {
        const { 
            header, 
            subHeader, 
            main, 
            congressLanguage, 
            disclaimer, 
            formButton, 
            modalHeader, 
            modalText, 
            tweet 
        } = this.state.textContent
        
        return(
            <div style={{display: this.state.loading ? 'none': 'block'}}>
                <Main 
                header={ header } 
                subHeader={ subHeader} 
                main={ main } 
                congressLanguage={ congressLanguage } 
                disclaimer={ disclaimer }
                formButton={ formButton }
                modalHeader={ modalHeader }
                modalText= { modalText }
                />
                <Footer tweet= {tweet} />
            </div>
        )
    }
}

export default App;