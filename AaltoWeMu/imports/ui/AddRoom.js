import React,{Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Rooms} from '../api/rooms';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

Meteor.subscribe('allrooms');
class AddRoom extends Component {
  state = {
    options: []}

handleRemoveAll = (event,) => {
  this.props.call('rooms.removeall');
}

onSubmit = (event,) => {
event.preventDefault();
let roomname = event.target.roomname.value;
this.props.call('rooms.insert',roomname)
//import moment from 'moment';

if(roomname){
  event.target.roomname.value="";
}

}

  render() {

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" ref="room" name="roomname"  placeholder="room name"/>
          <button type="submit">Add room</button>
        </form>
        <button type="button" onClick={this.handleRemoveAll}>Remove All</button>
      </div>
    );
  }
}


export default createContainer(params => {

  return {
    //allrooms: Meteor.collection('allrooms').find({})

    call: Meteor.call
    //then inside component onClick={()=>{props.meteorCall('notes.insert')}}
  };
},AddRoom);
