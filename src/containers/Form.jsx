import React, { Component } from 'react';
import { CONF, URLS } from '../config';
import { getQueryVariables } from '../utils';
import Markdown from 'react-markdown'
import Responsive from 'react-responsive-decorator';


class Form extends Component {

    constructor(props) {
        super(props)
        this.state = getQueryVariables()
        this.state.submitted = false
        this.state.countDown = 5
        this.state.isMobile = false
        this.onSubmit = this.onSubmit.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount(){
      // const swaps = [
      //   '6CPDA','6CHV', '6CommonCause', '6CorporateAcct', '6Kos', '6DemandProgress','6DFA','6FOE', '6Greenpeace', '6OpenMedia', '6PeoplesAction', '6PFAW','6ProgressAmerica','6PCAF','6SumOfUs', '6Nation', '6Watchdog'
      // ]
      
      // const includeBusinessBox = swaps.includes(this.state.source)

      // if(includeBusinessBox){
      //   this.setState({
      //     includeBusinessBox: includeBusinessBox
      //   })
      // }
    
      this.props.media({ minWidth: 768 }, () => {
        this.setState({
          isMobile: false
        })
      })
      this.props.media({ maxWidth: 768 }, () => {
        this.setState({
          isMobile: true
        })
      })
    }

    render() {
      let modal = null;
      let topOfPage = null;
      let middle = null; 

      const subHeader = (
        <div id="subHeader">          
          <Markdown source={this.props.subHeader} />
        </div>
      )

      const form = (
        <div>
        <form id="form">
        <div className="flex">
          <input type="text" className="form-input" name="name" placeholder="Your Name" />
          <input type="email" className="form-input" name="email" placeholder="Your Email" />
        </div>
        <div className="flex" style={{marginBottom: '20px'}}>
          <input type="text" className="form-input" name="street" placeholder="Street Address" />
          <input type="text" className="form-input" name="zip" placeholder="Your Zipcode" />
        </div>       
        <div className="flex" style={{marginTop: '25px'}}>
          <button className="btn">
            <span>{this.props.formButton}</span>
          </button>
        </div>
      </form>
      <span><i>{this.props.disclaimer}</i></span>
      <br/><br/>
      </div>
      )

      if(this.state.isMobile){
        topOfPage = form
        middle = subHeader
        } else {
        topOfPage = subHeader
        middle = form
      }

      if(this.state.submitted) {
        modal = (
              <div id="thanks" className="modal-wrapper-thanks modal-open-thanks" style={{ 'display' : this.state.submitted ? 'block' : 'none'}}>
              <div className="modal-thanks">
                <a className="close-thanks" href="#" onClick={ this.closeModal }>×</a>
                <header>
                  <h2 id="modal-header-thanks">{this.props.modalHeader}</h2>
                </header>
                <article>
                <Markdown className="modal-thanks-text" source= {this.props.modalText} />
                </article>
              </div>
            </div>
        )
      }
      
      return (
        <div className="bftn-form call-action-form" onSubmit={ this.onSubmit }>
          <Markdown source={this.props.header} />
            {topOfPage}
            {middle}
            {modal}
          </div>
      );
    }

    closeModal(evt) {
      evt.preventDefault();
      this.setState({ submitted: false });
    }

    onSubmit(evt) {
        evt.preventDefault();

        const form = evt.target;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        
        const name = form.name;
        if (!name.value.trim()) {
            name.focus();
            alert('Please enter your name.');
            return;
        }

        const email = form.email;
        if (!email.value.trim()) {
            email.focus();
            alert('Please enter your email.');
            return;
        } else if (!emailRegex.test(email.value.trim())) {
            email.focus();
            alert('Please enter a valid email.');
            return;
        }

        const address1 = form.street;
        if (!address1.value.trim()) {
            address1.focus();
            alert("Please enter your address.");
            return;
        }

        const zip = form.zip;
        if (!zip.value.trim()) {
            zip.focus();
            alert('Please enter your Zipcode.');
            return;
        } else if (zip.value.length < 5 || zip.value.length > 5) {
            zip.focus();
            alert('Please enter a valid Zipcode.');
            return;
        }

        const fields = {
            'action_user_agent': navigator.userAgent,
            'country': 'United States',
            'email': email.value.trim(),
            'form_name': 'act-petition',
            'js': 1,
            'name': name.value.trim(),
            'address1': address1.value.trim(),
            'zip': zip.value.trim(),
            'opt_in': 1,
            'page': CONF.actionKitPageShortName,
            'source': this.state.source || 'website',
            'want_progress': 1,
        };
      
        this.sendFormToActionKit(fields);
    }

    clearUserForm(){
      const formFlex = document.getElementById("form").getElementsByClassName("flex")
      const firstRow = formFlex[0].getElementsByClassName("form-input")
      const secondRow = formFlex[1].getElementsByClassName("form-input")
      firstRow[0].value = ''
      firstRow[1].value = ''
      secondRow[0].value = ''
      secondRow[1].value = ''
    }

    sendFormToActionKit(fields) {
        // iFrame
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.setAttribute('name', 'actionkit-iframe');
        document.body.appendChild(iframe);

        // Form
        const form = document.createElement('form');
        form.style.display = 'none';
        form.setAttribute('action', URLS.actionKit);
        form.setAttribute('method', 'post');
        form.setAttribute('target', 'actionkit-iframe');
        document.body.appendChild(form);

        Object.keys(fields).forEach(function(key) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = fields[key];
            form.appendChild(input);
        });

        form.submit()
        this.setState(
          { submitted: true }, 
          () => {this.clearUserForm()});   
    }

}

export default Responsive(Form);