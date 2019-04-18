import React, { Component } from 'react'

export class ApplicantItem extends Component {

    onClickHire = (e) => {
        
    }

    render() {
        return (
            //<Link to={props.url}><h3>{props.fname} {props.lname}</h3></Link>
            <div className="input-group mb-3">
                {/* <Link to={props.ProfileURL}></Link> */}
                <div className="input-group-append">
                    <h4>{this.props.fname} {this.props.lname}</h4>
                    <button className="btn btn-danger" type="button" onClick={this.onClickHire(this.props.key)}>Hire!</button>
                </div>
            </div>
        )
    }
}

export default ApplicantItem
