import React from 'react';
import Form from './Form.jsx';
import Markdown from 'react-markdown';

const Main = (props) =>  {
    return (
    <div id="app">
        <div className="unit">
            <div className="hero" id="bftn-action-form">
                <div>
                    <div id="signThePetition">
                        <Form subHeader={props.subHeader} header={ props.header } main={props.main}/>
                    </div>
                </div>
                <div className="unit" >
                <div id="congress">
                    <Markdown source= {props.congressLanguage} />
                </div>
                <hr/>
                    <div style={{color: 'white'}}>
                    <Markdown source= {props.main} />
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Main;