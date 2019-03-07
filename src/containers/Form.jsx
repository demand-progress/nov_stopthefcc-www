import React, { Component } from 'react';
import { CONF, URLS } from '../config';
import { getQueryVariables } from '../utils';

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = getQueryVariables()
        this.state.submitted = false
        this.state.countDown = 5
        this.onSubmit = this.onSubmit.bind(this)
        this.closeModal = this.closeModal.bind(this)

        this.renderHeaderText = this.renderHeaderText.bind(this);
        this.renderFormDisclaimer = this.renderFormDisclaimer.bind(this);
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
    }

    renderHeaderText() {
      const { headerContent } = this.props;

      return headerContent ? headerContent.header_text : ''
    }

    renderFormDisclaimer() {
      const { headerContent } = this.props;

      return headerContent ? headerContent.form_disclaimer : ''
    }

    render() {
      let modal = null;
      let topOfPage = null;
      let middle = null; 
      console.log('FORM PROPS', this.props)
      const subHeader = (
        <div id="subHeader">
          <div>
            {/* <p><strong>The FCC gutted net neutrality and gave Big Cable the power to control the internet. But after millions of people spoke out, the Senate voted to overturn the agency's repeal. Now the House of Representatives can do the same by passing a special resolution — but they must act before the end of 2018. Contact your reps to demand net neutrality!</strong></p> */}
            <p><strong>{this.renderHeaderText()}</strong></p>
          </div>
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
            <span>SIGN NOW</span>
          </button>
        </div>
      </form>
      {/* <span><i>One or more of the participating organizations (listed at bottom) may email you about their campaigns.</i></span> */}
      <span style={{color: 'white'}}><i>{this.renderFormDisclaimer()}</i></span>
      <br/><br/>
      </div>
      )
  
      if(this.props.isMobile){
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
                  <h2 id="modal-header-thanks">Thanks for signing.</h2>
                </header>
                <article>
                <div className="modal-thanks-text">
                  <p>Please call Congress and tell your lawmakers to overturn the FCC and restore net neutrality:</p>
                  <h3>Call Now:</h3>
                  <h3><a href="tel:8582640403">858-264-0403</a></h3>
                  <p>We’ll connect you to your lawmakers.  You can use this script — just introduce yourself, be polite, and say:</p>
                  <p><em>"I support Title Two net neutrality and I urge you to sign the discharge petition and vote for the Congressional Review Act ‘resolution of disapproval’ to restore net neutrality."</em></p>
                  </div>
                </article>
              </div>
            </div>
        )
      }
      
      return (
        <div onSubmit={ this.onSubmit }>
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

export default Form;