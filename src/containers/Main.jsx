import React, {Component} from 'react';
import Form from './Form.jsx';
import VisibilitySensor from 'react-visibility-sensor';

class Main extends Component {

    constructor(props){
        super(props);

        this.renderMainContent = this.renderMainContent.bind(this);
        this.petitionHeader = this.petitionHeader.bind(this);
        this.subContentBody = this.subContentBody.bind(this);    
        this.subContentHeader = this.subContentHeader.bind(this);
    }

    petitionHeader() {
        const { content } = this.props

        return content.header_cta.split('\n').map(text => (
            <h3 dangerouslySetInnerHTML={{__html: text}}></h3>
        ))
    }


    renderMainContent() {
        const { main } = this.props

        return {__html: main ? main.rendered : ''}
    }

    subContentHeader() {
        const { content } = this.props;

        return {__html: content ? content.sub_content_header : ''}
    }

    subContentBody() {
        const { content } = this.props;
            return content.sub_content_body
                .split(':')
                .map(text => (
                <p><em dangerouslySetInnerHTML={{__html: text}}></em></p>
            ))
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
                                    {this.props.content && this.petitionHeader()}
                                </div>
                                <Form content={this.props.content} isMobile={this.props.isMobile}/>
                            </div>
                        </div>
                    </div>
                    <div className="unit" >
                        <div id="congress">
                            <h4 dangerouslySetInnerHTML={this.subContentHeader()}></h4>
                            {this.props.content && this.subContentBody()}
                            <div>
                                <h4>Here's the language that will be sent to Congress:</h4>
                                <p><em>"The FCC's vote to destroy net neutrality protections cannot stand. Please co-sponsor and vote for the Save the Internet Act to fully restore the open internet protections repealed by the FCC, and reject any legislation that does not provide the same level of protections as the 2015 Open Internet Order."</em></p>
                                <p><em>"The FCC's decision willfully ignored the outcry of tens of millions of people, and it abdicated the FCC's responsibility to protect the internet from ISP blocking and discrimination. Please overturn it to restore net neutrality and ensure that the internet continues to enable speech, commerce, and democracy."</em></p>
                            </div>
                        </div>
                    <hr/>
                        <div style={{color: 'white'}}>
                            <div>
                            <VisibilitySensor onChange={this.props.logoCheck}>
                                <h4>Congress can restore net neutrality by passing the Save the Internet Act and rejecting fake net neutrality bills.</h4>
                            </VisibilitySensor>   
                                <p>Just over a year ago, Trump FCC Chairman Ajit Pai—a former top lawyer for Verizon—pushed through a measure to end net neutrality and let Big Cable companies control which websites and apps you’re able to use. The repeal went into effect last summer, and the consequences are already becoming apparent, from Verizon throttling California firefighters’ so-called ‘unlimited’ data service during a wildfire, to reports emerging of video streaming services like Netflix and YouTube being throttled.</p>
                                <p>But thanks to tireless grassroots pressure, legislation called the ‘Save the Internet Act’ has been introduced in both the House and the Senate to fully restore open internet protections.</p>
                                <p>Activists have kept this issue alive and have refused, flat out, to give Big Cable lobbyists an easy win.</p>
                                <p>Going forward, it’s going to be a knock-down fight to get this legislation through Congress, especially as well-funded industry lobbyists swarm Capitol Hill in opposition — but the open internet movement has a knack for achieving big things. Now’s the time to keep pressure on every lawmaker in DC and demand they stand with their constituents by supporting this legislation and rejecting industry-backed bills that would weaken protections.</p>
                                <p><a href="#signThePetition">Sign the petition and call on Congress to pass legislation to fully restore net neutrality!</a></p>
                                <p>Polls show 86% of Americans oppose the FCC's move to end net neutrality. Open internet protections are vital to free speech, small businesses, rural broadband, and communities that don’t otherwise have a voice in the mainstream media. The only ones who benefit from the repeal of net neutrality are Big Cable executives and the lobbyists they employ. There’s NO EXCUSE — every lawmaker must act to restore strong net neutrality by cosponsoring the Save the Internet Act and rejecting bills that do not fully restore the protections from the 2015 Open Internet Order.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
   ;
}

export default Main;