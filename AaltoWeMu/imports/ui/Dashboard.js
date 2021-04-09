import React from 'react';
import CardsContainer from './CardsContainer';
import PrivateHeader from './PrivateHeader';
import InfoBar from './InfoBar';
import FlatButtonMenu from './FlatButtonMenu';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import VoteCard from './VoteCard';
import Avatar from 'material-ui/Avatar';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import ModalTemplateSensor from './ModalTemplateSensor';
import {Contents} from '../api/contents';
import {UserData} from '../api/userdata';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import ThirdPartyPlayCanvas from './ThirdPartyPlayCanvas';
import Raindeer from './Raindeer';
// import ThirdPartySimpleChat from './ThirdPartySimpleChat';
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 5,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  demo: {
    marginTop: 5,
    // background: theme.palette.background.paper,
    background: theme.palette.primary[50],
    //background: theme.palette.primary["A100"],
    //  background:"#E1F5FE",
  },
  image:{
    width:"75%",
    height:"75%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class AutoGrid extends React.Component {
  state = {
    left: false,
    showmodal:false
  };
  HideModal = ()=>{

    this.setState(() => ({ showmodal: false }));
    this.props.meteorCall('userdata.scene.off');
  }
  ShowModal = ()=>{
    this.setState(() => ({ showmodal: true }));
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.userdata && (this.props.userdata.show != this.state.showmodal) && this.setState(() => ({ showmodal: this.props.userdata.show }));
    }
  render() {
    const {classes} = this.props;

    return (

      <div className={classes.root} onClick={this.state.left
        ? this.toggleDrawer('left', false)
        : undefined}>
        {Session.get('currentPagePrivacy')==="auth" && <PrivateHeader/>}
        {Session.get('currentPagePrivacy')==="auth" && <InfoBar/>}
        {Session.get('currentPagePrivacy')==="auth" && <FlatButtonMenu/>}
      <Grid container >

        <Grid key={3} container>
          <Grid item xs={12}>
            <CardsContainer contents = {this.props.contents} userdata ={this.props.userdata} Session={this.props.Session}/>
          </Grid>
        </Grid>
        <Raindeer points={this.props.userdata && this.props.userdata.points} hundredpoints={10}/>


        <Grid key={1} item xs={12}>
          <div className={classes.root}>
            <div className={classes.demo}>

              <List dense={false}>
                {

                  this.props.userdata && this.props.userdata.lectures.filter((item) => {
                    return item.selectedAndShown
                  }).map((lecturedoc, index) => {
                    return (
                      <div  key={lecturedoc.lectureName} >
                        <VoteCard  ratetype="happysad" title={`Course:${lecturedoc.lectureName}`} type="nottotal" category="lecture" item ={lecturedoc.lectureName} rate={lecturedoc.lectureRate}/>
                        <VoteCard   ratetype="likedislike" title={`Subject:${lecturedoc.lectureName}`} type="nottotal" category="subject" item ={lecturedoc.lectureName} rate={lecturedoc.subjectRate}/>
                      </div>


                  )
                  })



                }
                {

                  this.props.userdata && this.props.userdata.rooms.filter((item) => {
                    return item.selectedAndShown
                  }).map((roomdoc, index) => {
                    return (
                      <div  key={roomdoc.roomName}  >
                        <VoteCard   ratetype="happysad" title={`Room Environment:${roomdoc.roomName}`} type="nottotal" category="room" item ={roomdoc.roomName} rate={roomdoc.roomRate}/>
                        <VoteCard  ratetype="happysad" title={`Thermal Comfort:${roomdoc.roomName}`} type="nottotal" category="thermal" item ={roomdoc.roomName} rate={roomdoc.thermalRate}/>

                      </div>


                  )
                  })



                }

              </List>
              <br/>
              <br/>
            </div>
          </div>

      </Grid>
      {/* <Grid key={10} item xs={12}>
        <Paper className={classes.paper}>xs</Paper>
      </Grid> */}

      <Grid item xs={12}>
        <ModalTemplateSensor HideModal={this.HideModal}  showmodal = {this.state.showmodal} title={this.props.userdata && this.props.userdata.badge}>
    {this.props.userdata && this.props.userdata.points === 0 && <div>
      <img className={classes.image}        src="unhatched.gif" alt="" />
      <br/>
    <Typography type="caption" gutterBottom align="left">
    Don't touch!
     It is you alive inside this egg and about to hatch. Oneday you will walk to us and get your prize.
    <br/>Add the rooms that you visit  and your courses by clicking on "+", the pink circle. <br/>
    See what kind of creature you are compared with others around you.
    Watch yourself growing after you hatch as you know more about yourself, your learning and your environment.
    <br/>
    <br/>
    To be continued....
    </Typography>
    </div>}
    {this.props.userdata && (this.props.userdata.points >= 3 && this.props.userdata.points <10) &&
      <div>
        <img className={classes.image}        src="hatching.gif" alt="" />
        <br/>
      <Typography type="caption" gutterBottom align="left">
      Wait don't close this window! Something important is about to happen!

      </Typography>
      </div>
       }
    {this.props.userdata && (this.props.userdata.points >=10) &&

    <div>
      <img className={classes.image}        src="chick.gif" alt="" />
      <br/>
    <Typography type="caption" gutterBottom align="left">
    You decided to leave your egg. Come meet us at room 168 and claim your prize.
    <br/>
    We wish to continoue the story and your opinion matter. In future, you will have more interactive content and games to play.
    This the end of a chapter but not the end of the story. If you like it, help it stay alive and give your feedback.
    <br/>
    You never know you may become a flying pokemone.
    <br/>
    We ❤ Aalto! and A ❤ is you!

    </Typography>
    </div>
  }

          </ModalTemplateSensor>
      </Grid>

          </Grid>
          {/* <ThirdPartySimpleChat/> */}

  </div>);
  }
}

AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default createContainer(params => {
  Meteor.subscribe('userdata');
  Meteor.subscribe('allcontents');

  return {
    //allrooms: Meteor.collection('allrooms').find({})
    contents: Contents.findOne({}) && Contents.find({}).fetch(),
    userdata: UserData.findOne({userId: Meteor.userId()}) && UserData.findOne({userId: Meteor.userId()}),
    meteorCall: Meteor.call,
    Session,
    //name of the imported collection for example Notes
    //Notes is imported by import {Notes} from '../api/notes';
    // Session,
    // notes: Notes.find().fetch().map((note)=>{
    //       return {
    //         ...note,
    //         selected: note._id === selectedNoteId
    //       };
    //     }),
    //
    // then inside component onClick={()=>{props.meteorCall('notes.insert')}}
  };
}, withStyles(styles)(AutoGrid));
// export default () => {
//   return (
//     <div>
//       <PrivateHeader title="Dashboard"/>
//       <div className="page-content">
//         Dashboard page content.
//       </div>
//     </div>
//   );
// };
