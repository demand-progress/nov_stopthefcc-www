import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

 export default class Spinner extends Component {
    render() {
     return(
        <Loader type="Rings" color="red" height={80} width={80} />
     );
    }
 }