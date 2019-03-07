import React, {Component} from 'react';
import Form from './Form.jsx';
import VisibilitySensor from 'react-visibility-sensor';

class Main extends Component {

    constructor(props){
        super(props);

        this.renderContent = this.renderContent.bind(this);
        this.renderHeaderContent = this.renderHeaderContent.bind(this);
    }

    renderHeaderContent() {
        const { headerContent } = this.props

        return {__html: headerContent ? headerContent.header_cta : ''}
    }

    renderContent() {
        const { content } = this.props

        return {__html: content ? content.rendered : ''}
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
                                    {/* <h3>Time is Running Out. Tell Congress:</h3><h3>Restore Net Neutrality Now!</h3> */}
                                    <h3 dangerouslySetInnerHTML={this.renderHeaderContent()}></h3>
                                </div>
                                <Form headerContent={this.props.headerContent} isMobile={this.props.isMobile}/>
                            </div>
                        </div>
                    </div>
                    <div className="unit" >
                        <div id="congress">
                            <div>
                                <h4>Here's the language that will be sent to Congress:</h4>
                                <p><em>"The FCC's vote to destroy net neutrality protections cannot stand. Please co-sponsor, sign the discharge petition for, and vote for the Congressional Review Act resolution to overturn the FCC's repeal of net neutrality."</em></p>
                                <p><em>“The FCC's decision willfully ignored the outcry of tens of millions of people, and it abdicated the FCC's responsibility to protect the internet from ISP blocking and discrimination. Please overturn it to restore net neutrality and ensure that the internet continues to enable speech, commerce, and democracy."</em></p>
                            </div>
                        </div>
                    <hr/>
                        <div style={{color: 'white'}}>
                            {/* <div>
                            <VisibilitySensor onChange={this.props.logoCheck}>
                                <h4>The House of Representatives has a golden opportunity to save net neutrality in 2018 by passing the Congressional Review Act resolution to overturn the FCC — or face an uphill battle in 2019.</h4>
                            </VisibilitySensor>   
                                <p>A year ago, Trump FCC Chairman Ajit Pai—a former top lawyer for Verizon—pushed through a measure to end net neutrality and let Big Cable companies control which websites and apps you use, where you get your news, how you listen to music and watch videos — everything you do on the internet.</p>
                                <p>Then, thanks to grassroots pressure—and flying in the face of what many Beltway pundits said was possible—the Senate took a historic vote in May to overturn the FCC’s disastrous decision. Despite the attempts of Big Cable’s army of lobbyists to turn net neutrality into a partisan issue, lawmakers from both parties opted to stand with their constituents over Comcast.</p>
                                <p>Now the Congressional Review Act resolution to overturn the FCC has moved to the House, where we need a simple majority of representatives, or 218, to sign a discharge petition to force the resolution to a floor vote and then pass it. Because of procedural rules, we must get this done before the end of 2018, or we have to start over in the next Congress. Right now, the resolution has the support of 177 representatives in the House — it’s crucial we get as many remaining members as possible to sign.</p>
                                <p><a href="#signThePetition">Sign the petition and call on Congress to pass the CRA resolution to stop the repeal of net neutrality before it’s too late.</a></p>
                                <p>Polls show 86% of Americans oppose the FCC's move to end net neutrality. Net neutrality is vital to free speech, small business, and communities that might not otherwise have a voice in the mainstream media. The only ones who benefit from the repeal of net neutrality are Big Cable executives and the lobbyists they employ. There’s NO EXCUSE —  every lawmaker, both Republican or Democrat, must support net neutrality.</p>
                            </div> */}
                            <div dangerouslySetInnerHTML={this.renderContent()}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
   ;
}

export default Main;