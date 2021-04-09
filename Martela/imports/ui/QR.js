import React, {Component} from 'react';
import QrReader from 'react-qr-reader';
import {browserHistory} from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
class Qr extends Component {
  state = {
    delay: 500,
    resolution:1000,
    result: 'No result'
  }

  handleScan(data) {
    if (data) {
      console.log(data);
      // this.setState({result: data});

      data = data.split("/").slice(-1).pop();

      Meteor.call("userdata.update.room", data,function (error, result) {
        if (error) {
          console.log(error);
        } else {
      browserHistory.push("/dashboard");
        }
      });


    }
  }
  handleError(err) {
    console.error(err)
  }
  render() {
    return (<div>
      <QrReader delay={this.state.delay} onError={this.handleError} onScan={this.handleScan} style={{
          width: '22rem',
        margin: "auto"
        }}/>
      {/* <p>{this.state.result}</p> */}
    </div>)
  }
}

export default withTracker(props => {
  return {
    meteorCall: Meteor.call,

  };
})(Qr);
