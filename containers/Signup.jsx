import React, {Component} from 'react';
import VisibilitySensor from 'react-visibility-sensor';

class Signup extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            
        <div id="app" className="sign-up-page">
            <div className="unit">
                <div className="hero" id="signup-action-form">
                    <div>
                        <div id="signThePetition">
                            <div className="bftn-form call-action-form">
                                <div>
                                    <h3>
                                      Thanks For Signing!
                                    </h3>
                                </div>
    
                            </div>
                        </div>
                    </div>
                    <div className="unit" >
                        <div id="congress-alert">
                            <div>
                                
                                <p>There’s still more you can do — please call Congress and tell your lawmakers to restore net neutrality.</p>
								<h4>
									Call Now: <br />
									858-264-0403
								</h4>
								<p>We'll connect you to your lawmakers. You can use this script — just introduce yourself, be polite, and say:</p>

								<p><em><i>"I'm calling to tell my lawmakers I support strong net neutrality, and I want them to cosponsor and demand a vote on the Save the Internet Act in the Senate. Thank you."</i></em></p>


                            </div>
                        </div>
                   
                    </div>
                </div>
            </div>
        </div>)
    }
   ;
}

export default Signup;
