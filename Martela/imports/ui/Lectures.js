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
import {Lectures} from '../api/lectures';
import {createContainer} from 'meteor/react-meteor-data';
import {UserData} from '../api/userdata';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import PrivateHeader from './PrivateHeader';
import InfoBar from './InfoBar';
import FlatButtonMenu from './FlatButtonMenu';



const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Lecture extends React.Component {
  state = {
    userselectedlectures: [],
    userpositiveCourses:[],
    userpositiveSubjects:[],
    usernegativeCourses:[],
    usernegativeSubjects:[],

  };

  handleChangeBodyState = (param) => {
    this.setState(() => ({body: param}));
  }
  // componentDidMount() {
  //   this.props.userselectedlectures && this.setState({userselectedlectures: this.props.userselectedlectures})
  // }
  // componentWillReceiveProps(nextProps) {
  //   nextProps.userselectedlectures && this.setState({userselectedlectures: nextProps.userselectedlectures})
  // }
  // handlePositiveVotesSubject(lectureName){
  //   console.log(lectureName);
  //   const lectureVoteDoc = this.props.Session.get('LecturesVotes').find((doc)=>{
  //     return doc.subjectname === lectureName})
  //     console.log( "lectureVoteDochappySubjectVotes",100*(lectureVoteDoc.happySubjectVotes/(lectureVoteDoc.happySubjectVotes+lectureVoteDoc.sadSubjectVotes)) );
  //     // {subjectname: lecture, happySubjectVotes, sadSubjectVotes, happyLectureVotes, sadLectureVotes}
  //
  //     return 100*(lectureVoteDoc.happySubjectVotes/(lectureVoteDoc.happySubjectVotes+lectureVoteDoc.sadSubjectVotes))
  // }
  // handleNegativeVotesSubject(lectureName){
  //   console.log(lectureName);
  //   const lectureVoteDoc = this.props.Session.get('LecturesVotes').find((doc)=>{
  //     return doc.subjectname === lectureName})
  //     console.log( "sadSubjectVotes",100*(lectureVoteDoc.sadSubjectVotes/(lectureVoteDoc.happySubjectVotes+lectureVoteDoc.sadSubjectVotes)));
  //     // {subjectname: lecture, happySubjectVotes, sadSubjectVotes, happyLectureVotes, sadLectureVotes}
  //     return 100*(lectureVoteDoc.sadSubjectVotes/(lectureVoteDoc.happySubjectVotes+lectureVoteDoc.sadSubjectVotes))
  // }
  // handlePositiveVotesCourse(lectureName){
  //   console.log(lectureName);
  //   const lectureVoteDoc = this.props.Session.get('LecturesVotes').find((doc)=>{
  //     return doc.subjectname === lectureName})
  //     console.log( "happyLecture",100*(lectureVoteDoc.happyLectureVotes/(lectureVoteDoc.sadLectureVotes+lectureVoteDoc.happyLectureVotes)) );
  //     // {subjectname: lecture, happySubjectVotes, sadSubjectVotes, happyLectureVotes, sadLectureVotes}
  //     return 100*(lectureVoteDoc.happyLectureVotes/(lectureVoteDoc.sadLectureVotes+lectureVoteDoc.happyLectureVotes))
  // }
  // handleNegativeVotesCourse(lectureName){
  //   console.log(lectureName);
  //   const lectureVoteDoc = this.props.Session.get('LecturesVotes').find((doc)=>{
  //     return doc.subjectname === lectureName})
  //     console.log( "lectureVoteDocsadLectureVotes",100*(lectureVoteDoc.sadLectureVotes/(lectureVoteDoc.happyLectureVotes+lectureVoteDoc.sadLectureVotes)));
  //     // {subjectname: lecture, happySubjectVotes, sadSubjectVotes, happyLectureVotes, sadLectureVotes}
  //     return 100*(lectureVoteDoc.sadLectureVotes/(lectureVoteDoc.happyLectureVotes+lectureVoteDoc.sadLectureVotes))
  // }
  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.root}>
        {Session.get('currentPagePrivacy')==="auth" && <PrivateHeader/>}
        {Session.get('currentPagePrivacy')==="auth" && <InfoBar/>}
        {Session.get('currentPagePrivacy')==="auth" && <FlatButtonMenu/>}
      {
        this.props.userselectedlectures  && this.props.userselectedlectures.lectures.filter((item)=>{return item.selectedAndShown}).map(


          (lecturedoc, index) => {

          return (

            <HappeningItem key = {lecturedoc.lectureName} happening={{summary: lecturedoc.lectureName}}>

            {/* {this.state.lecturevotebars.map((option, index) => (<VoteBar key={index} ratetype={option.ratetype} title={option.title} type={option.type}/>))} */}
<Grid container className={classes.root}>
  <Grid  xs={12} item>
                  <VoteBar ratetype="likedislike" title="Subject" type="nottotal" category="subject"
                     item={lecturedoc.lectureName }  rate={lecturedoc.subjectRate} positiveVote={this.props.lecturevotes && this.props.lecturevotes.find((doc)=>{
                       return doc.subjectname === lecturedoc.lectureName}).percentageSubjectHappy}



                    negativeVote={ this.props.lecturevotes &&  this.props.lecturevotes.find((doc)=>{
                      return doc.subjectname === lecturedoc.lectureName}).percentageSubjectSad}/>
                    {/* negativeVote={this.handleNegativeVotesSubject(lecturedoc.lectureName)} */}
  </Grid>

{/* negativeVote={this.handleNegativeVotesSubject(lecturedoc.lectureName)} */}


<Grid xs={12} item>
                {/* <VoteBar ratetype="happysad" title="Course" type="nottotal" category="lecture"
                  item ={lecture.lecturename} rate={this.props.userpositiveCourses  && this.props.userpositiveCourses.indexOf(lecture.lecturename) >=0?"happy":
                  this.props.usernegativeCourses
                  && this.props.usernegativeCourses.indexOf(lecture.lecturename) >=0?"sad":"notRated" }/> */}
                  <VoteBar  ratetype="happysad" title="Course" type="nottotal" category="lecture"
                    item ={lecturedoc.lectureName} rate={lecturedoc.lectureRate} positiveVote={this.props.lecturevotes &&  this.props.lecturevotes.find((doc)=>{
                      return doc.subjectname === lecturedoc.lectureName}).percentageLectureHappy}
                   negativeVote={this.props.lecturevotes &&  this.props.lecturevotes.find((doc)=>{
                     return doc.subjectname === lecturedoc.lectureName}).percentageLectureSad} />
                     <br/>
                     <br/>
              </Grid>


</Grid>

          </HappeningItem>

        )//end of map
        }


      )
      }

    </Grid>

  )
  }
}

Lecture.propTypes = {
  classes: PropTypes.object.isRequired
};

export default createContainer(params => {
  Meteor.subscribe('userdata');
  Meteor.subscribe('alllectures');


  // let userSelection = [];
  // UserData.findOne({userId:Meteor.userId()}) && UserData.findOne({userId:Meteor.userId()}).lectures.forEach(function(item , index, array) {
  //   if(item.selectedAndShown == true){
  //     userSelection.push(item.lectureName);
  //   }
  // });

  return {
   userselectedlectures:  UserData.findOne({userId:Meteor.userId()}),
   meteorCall: Meteor.call,
   lecturevotes:Session.get('LecturesVotes'),

 }
}, withStyles(styles)(Lecture))
