import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Lectures} from '../api/lectures';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

Meteor.subscribe('alllectures');
class AddLecture extends Component {
  state = {
    options: []}

handleRemoveAll = (event,) => {
  this.props.call('lectures.removeall');
}

onSubmit = (event,) => {
event.preventDefault();
let lecturename = event.target.lecturename.value;
this.props.call('lectures.insert',lecturename)
//import moment from 'moment';

if(lecturename){
  event.target.lecturename.value="";
}

}

  render() {

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" ref="lecture" name="lecturename"  placeholder="lecture name"/>
          <button type="submit">Add lecture</button>
        </form>
        <button type="button" onClick={this.handleRemoveAll}>Remove All</button>
      </div>
    );
  }
}


export default createContainer(params => {

  return {
    //alllectures: Meteor.collection('alllectures').find({})

    call: Meteor.call
    //then inside component onClick={()=>{props.meteorCall('notes.insert')}}
  };
},AddLecture);
