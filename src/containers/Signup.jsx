import React, {Component} from 'react';
import VisibilitySensor from 'react-visibility-sensor';

class Signup extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            
        <div id="app">
            <div className="unit">
                <div className="hero" id="bftn-action-form">
                    <div>
                        <div id="signThePetition">
                            <div className="bftn-form call-action-form">
                                <div>
                                    <h3>
                                      Thanks For Signing Up
                                    </h3>
                                </div>
    
                            </div>
                        </div>
                    </div>
                    <div className="unit" >
                        <div id="congress">
                            <div>
                                
                                <p><em>Please Call Congress And Tell Your Lawyers To Restore Net Neutrality:</em></p>
								<h4>
									Call Now: <br />
									858-264-0403
								</h4>
								<p><em>We'll connect you to your lawmakers. You can use this script -- just introduce yourself, be polite, and say:</em></p>

								<p><em><i>"I'm calling to tell my lawmakers I support strong net neutrality and I want them to vote 'yes' on the Save The Internet Act and reject any bad admendments. Thank you."</i></em></p>


                            </div>
                        </div>
                    <hr/>
                        <div style={{color: 'white'}}>
                            <div>
                            
                                <p>Save The Internet Act has been introduced in the House and Senate to fully restore protections.</p>

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
