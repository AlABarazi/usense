 import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import React from 'react';
import CardsContainer from './CardsContainer'
import PrivateHeader from './PrivateHeader';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import VoteCard from './VoteCard';
import InfoBar from './InfoBar';
import Avatar from 'material-ui/Avatar';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import ModalTemplate from './ModalTemplate';
import FlatButtonMenu from './FlatButtonMenu';
import VoteBar from './VoteBar';
import RoomsList from './RoomsList';
import LecturesList from './LecturesList';
import Dashboard from './Dashboard';
import SensorCardContainer from './SensorsCardContainer';
import HappeningContainer from './HappeningContainer';
import RenJsComponent from './RenJsComponent';
import Room from './Room';
import Lectures from "./Lectures";
import moment from 'moment';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class AutoGrid extends React.Component {
  state = {
    body: "dashboard",
    left: false,
    showmodal: true,
    options: [
      {
        'categoryIcon': 'lecture',
        'description': 'Lecture: Mathmatics',
        'ratetype': 'happysad'
      }, {
        'categoryIcon': 'course',
        'description': 'Subject: Mathmatics',
        'ratetype': 'lovehate'
      }, {
        'categoryIcon': 'thermal',
        'description': 'Thermal Feeling Now: room U504 lecture BIM1',
        'ratetype': 'happysad'
      }, {
        'categoryIcon': 'room',
        'description': 'Room U504',
        'ratetype': 'lovehate'
      }, {
        'categoryIcon': 'feel',
        'description': 'General Feeling Now: room U504 lecture BIM1 ',
        'ratetype': 'happysad'
      }
    ]

  };
  HideModal = () => {

    this.setState(() => ({showmodal: false}));
  }
  ShowModal = () => {
    this.setState(() => ({showmodal: true}));
  }
  handleSelectAppBody = (classes) => {
    if (this.state.body === "dashboard") {
      return (<Dashboard options={this.state.options}/>)
    } else if (this.state.body === "rooms") {
      return (<div>
        <Room sensors={this.state.sensors} happenings={this.state.happenings} roomvotebars={this.state.roomvotebars}/>
      </div>)
    } else if (this.state.body === "lectures") {
      return (<div>
        <Lectures lecturevotebars={this.state.lecturevotebars}/>
      </div>)
    }
     else if (this.state.body === "happenings") {
      return (<div>
        <HappeningContainer happenings={this.state.happenings}/>
      </div>)
    }
    else if (this.state.body === 'All Rooms') {
        return (<div>
          <RoomsList/>
        </div>)

   }
   else if (this.state.body === 'All Lectures') {
    return (<div>
      <LecturesList/>
    </div>)
  }
  else if (Session.get('selectedPage').pagetype === 'room') {
   return (<div>
     <Room/>
   </div>)
 }
  else if (this.state.body === 'Send Feedback') {
   return (<div>
     <p>Later</p>
   </div>)
 }
 else if (this.state.body === 'Beta') {
  return (<div>
    <RenJsComponent/>
  </div>)
}
  }

  handleChangeBodyState = (param) => {
    this.setState(() => ({body: param}));
  }
  render() {
    const {classes} = this.props;

    return (
    <div className={classes.root} onClick={this.state.left
      ? this.toggleDrawer('left', false)
      : undefined}>


    <Grid container>
      <Grid xs={12} item>
        {this.handleSelectAppBody(classes)}
      </Grid>
      <Grid xs={12} item style={{height:20}}>
      </Grid>
      <Grid item xs={12} style={{
          height: 30
        }}>
         {/* <ModalTemplate HideModal={this.HideModal} ModalContent = {this.props.children} showmodal = {this.state.showmodal}/> */}
      </Grid>
    </Grid>

  </div>
    )}}

AutoGrid.propTypes = {classes: PropTypes.object.isRequired};

export default createContainer(params => {
  return {
    Session,
  };
},withStyles(styles)(AutoGrid))
