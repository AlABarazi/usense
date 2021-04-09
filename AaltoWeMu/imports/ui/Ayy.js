import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import Iframe from 'react-iframe';
import HappeningItem from './HappeningItem';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import Cloth from './Cloth';
import ThirdPartyPlayCanvas from '../ui/ThirdPartyPlayCanvas';
import ThirdPartyX3DOM from '../ui/ThirdPartyX3DOM';
// import ThirdPartyPhaser from '../ui/ThirdPartyPhaser';
// import ThirdPartyPhaserThree from '../ui/ThirdPartyPhaserThree';
// import ThirdPartyWoofjs from '../ui/ThirdPartyWoofjs';

import BMIBOX from '../ui/BMIBOX';
import PrivateHeader from './PrivateHeader';
import InfoBar from './InfoBar';
import FlatButtonMenu from './FlatButtonMenu';
import {UserData} from '../api/userdata';
// import RenJsComp from '../ui/RenJsComponent';
const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class AYY extends Component {
  state = {
    options: []
  }

  handleDeleteOptions = () => {
    this.setState(() => ({options: []}));
  };
whatever= ()=>{
  // console.log("kjhkhkjh",this.props.userdata && this.props.userdata.indexOf("cloth"));
}
  render() {
    const {classes} = this.props;
    const p = "h1";
    return (
      <Grid container className={classes.root}>
        {Session.get('currentPagePrivacy')==="auth" && <PrivateHeader/>}
        {Session.get('currentPagePrivacy')==="auth" && <InfoBar/>}
        {Session.get('currentPagePrivacy')==="auth" && <FlatButtonMenu/>}

      <HappeningItem  styleprops={this.props.userdata && this.props.userdata.indexOf("cloth") === -1 }      key="Find out what is your Aalto cloth specie" happening={{
          summary: "Find out what is your Aalto cloth specie"
        }}>
        <Cloth/>
      </HappeningItem>

      {
        this.whatever()
      }
      <HappeningItem key="Something about health" styleprops={this.props.userdata && this.props.userdata.indexOf("bmi") === -1 }  happening={{
          summary: "Something about health"
        }}>
        <BMIBOX/>
      </HappeningItem>

      {/* <HappeningItem key="AYY" happening={{
          summary: "AYY"
        }}>
        <Grid container className={classes.root}>
          <Grid xs={12} item></Grid>

          <Grid xs={12} item>


            <Iframe url="AYY.html" width="100%" height="14000px" display="initial"
        position="relative"  allowFullScreen/>

          </Grid>

        </Grid>

      </HappeningItem> */}

      {/* <HappeningItem key="Future Development Using Games Engines" happening={{
          summary: "Future Development Using Games Engines"
        }}>
        <ThirdPartyPlayCanvas/>

      </HappeningItem> */}



      {/* <HappeningItem key="Swoop" happening={{
          summary: "Swoop"
        }}>

          <Iframe url="https://playcanv.as/p/JtL2iqIH/" width="100%" height="25rem" display="initial"
      position="relative"  allowFullScreen/>


      </HappeningItem> */}




      <HappeningItem key="Flappy Bird" happening={{
          summary: "Flappy Bird"
        }}>
        <Iframe url="https://playcanv.as/p/ihQ8d6JR/" width="100%" height="25rem" display="initial"
    position="relative"  allowFullScreen/>


      </HappeningItem>



      {/* <HappeningItem key="Future Development Using Games ThirdPartyX3DOM" happening={{
          summary: "Future Development Using Games ThirdPartyX3DOM"
        }}>
        <ThirdPartyX3DOM/>

      </HappeningItem> */}
      {/* <HappeningItem key="Future Development Using Games Woofjs" happening={{
          summary: "Future Development Using Games Woofjs"
        }}>
        <ThirdPartyWoofjs/>

      </HappeningItem> */}

      {/* <HappeningItem key="Possible Future Development Using Phaser" happening={{
          summary: "Possible Future Development Using Phaser"
        }}>
        <ThirdPartyPhaser/>
      </HappeningItem>

      <HappeningItem key="Possible Future Development Using Phaser3" happening={{
          summary: "Possible Future Development Using Phaser3"
        }}>
        <ThirdPartyPhaserThree/>
      </HappeningItem> */}
      {/* <HappeningItem key="Possible Future Development Using Renjs" happening={{
          summary: "Possible Future Development Using Renjs"
        }}>
        <RenJsComp/>
      </HappeningItem> */}


<br/>
<br/>

    </Grid>);
  }
}



export default createContainer(params => {
  Meteor.subscribe('userdata');
  //Meteor.subscribe('somename');
  return {
    userdata:UserData.findOne({userId:Meteor.userId()}) && UserData.findOne({userId:Meteor.userId()}).answeredquestions.map((contentdoc, elem) => {
      return contentdoc.questionName;
    }),
    //somename: Meteor.collection('somename').find({}),
    //meteorCall: Meteor.call,
    //notes: Notes.find({}).fetch(),
    //name of the imported collection for example Notes
    //Notes is imported by import {Notes} from '../api/notes'
    //loginWithPassword: Meteor.loginWithPassword,
    //       notes: Notes.find({}, {
    //   sort: {
    //     updatedAt: -1
    //   }
    // }).fetch().map((note) => {
    //   return {
    //     ...note,
    //     selected: note._id === selectedNoteId
    //   };
    // }),
    //  handleLogout: () => Accounts.logout(),
    //  handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    //isNavOpen: Session.get('isNavOpen'),
    //createUser: Accounts.createUser,

  };
}, withStyles(styles)(AYY))
