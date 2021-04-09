import React from 'react';
import CardsContainer from './CardsContainer'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import VoteCard from './VoteCard';
import Avatar from 'material-ui/Avatar';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import ModalTemplate from './ModalTemplate';
import VoteBar from './VoteBar';
import Dashboard from './Dashboard';
import SensorCardContainer from './SensorsCardContainer';
import HappeningItem from './HappeningItem';
import RenJsComponent from './RenJsComponent';
import {Rooms} from '../api/rooms';
import {createContainer} from 'meteor/react-meteor-data';
import {Lectures} from '../api/lectures';
import {UserData} from '../api/userdata';
import PrivateHeader from './PrivateHeader';
import InfoBar from './InfoBar';
import FlatButtonMenu from './FlatButtonMenu';


const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Room extends React.Component {
  state = {

  };

  // handleChangeBodyState = (param) => {
  //   this.setState(() => ({body: param}));
  // }

// componentDidMount() {
//   this.props.allrooms && this.setState({allrooms:this.props.allrooms})
// }
// componentWillReceiveProps(nextProps) {
//   nextProps.allrooms && this.setState({allrooms:nextProps.allrooms})
// }

  render() {
    const {classes} = this.props;
    return (



<Grid container className = {
  classes.root
} >


{Session.get('currentPagePrivacy')==="auth" && <PrivateHeader/>}
{Session.get('currentPagePrivacy')==="auth" && <InfoBar/>}
{Session.get('currentPagePrivacy')==="auth" && <FlatButtonMenu/>}
{

  this.props.userselectedrooms  && this.props.userselectedrooms.rooms.filter((item)=>{return item.selectedAndShown}).map((room, index) => {

     // if(this.props.Session.get('selectedRooms').indexOf(room.roomname) !== -1){

      return (
        <HappeningItem key={room.roomName} happening={{summary:room.roomName}}>
        <div>
      <Grid xs={12} item>

             <VoteBar ratetype="happysad" title="Indoor Environment" type="nottotal" category="room"
                item={room.roomName }  rate={room.roomRate} positiveVote={this.props.roomvotes && this.props.roomvotes.find((doc)=>{
                  return doc.roomname === room.roomName}).percentageRoomHappy}
               negativeVote={ this.props.roomvotes && this.props.roomvotes.find((doc)=>{
                 return doc.roomname === room.roomName}).percentageRoomSad}/>

      </Grid>
<Grid xs={12} item>
  <VoteBar ratetype="happysad" title="Thermal Comfort" type="nottotal" category="thermal"
     item={room.roomName }  rate={room.thermalRate} positiveVote={this.props.roomvotes && this.props.roomvotes.find((doc)=>{
       return doc.roomname === room.roomName}).percentageThermalHappy}
    negativeVote={ this.props.roomvotes && this.props.roomvotes.find((doc)=>{
      return doc.roomname === room.roomName}).percentageThermalSad}/>
</Grid>



      <Grid xs={12} item>

        <SensorCardContainer    room={Rooms.findOne({roomname: room.roomName})}
          T_wish = {room["T_wish"]
          }
          T_avg = {

            this.props.Session.get('RoomsThermalVotes') &&  this.props.Session.get('RoomsThermalVotes').find((doc)=>{
                return doc.room === room.roomName})["temperatureRoomsVoteAvg"]
          }
          Light_wish = {
            room["Light_wish"]
          }
          Light_avg = {

          this.props.Session.get('RoomsThermalVotes') &&  this.props.Session.get('RoomsThermalVotes').find((doc)=>{
              return doc.room === room.roomName})["lightRoomsVoteAvg"]
          }
          Rh_wish = {
            room["Rh_wish"]
          }
          Rh_avg = {
            this.props.Session.get('RoomsThermalVotes') &&  this.props.Session.get('RoomsThermalVotes').find((doc)=>{
                return doc.room === room.roomName})["rhRoomsVoteAvg"]
          }



        />

      </Grid>
    </div>
  
</HappeningItem>
  )
    // }



}
)
}
<br/>
<br/>

</Grid>




    )}}

Room.propTypes = {classes: PropTypes.object.isRequired};

export default createContainer(params => {
  Meteor.subscribe('allrooms');
  Meteor.subscribe('userdata');
  return {
    alllectures: Lectures.find({}).fetch(),
    allrooms:Rooms.find({}).fetch(),
    //rooms: Meteor.collection('rooms').find({})
    //name of the imported collection for example Notes
    //Notes is imported by import {Notes} from '../api/notes';
    Session,
    meteorCall: Meteor.call,
    roomvotes:Session.get('RoomsVotes'),
    userselectedrooms:UserData.findOne({userId:Meteor.userId()}),
    //then inside component onClick={()=>{props.meteorCall('notes.insert')}}
  };
},withStyles(styles)(Room))


{/* <HappeningContainer happenings={[
      {
        type: 'fromus',
        summary: "how much cloths indoor needed",
        contentfile: <Paper> Here where the fun start. Customized content. It could be anything. Game, questions, videos, comic, novel, art...anything but prefereply max one minute</Paper> ,
        action1: 'skip',
        action2: 'ok'
      },      {
              type: 'fromus',
              summary: "how much cloths indoor needed",
              contentfile: 'BMI.js',
            }
    ]}/> */}
