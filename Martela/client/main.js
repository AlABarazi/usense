import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import {Rooms} from '../imports/api/rooms';
import {UserData} from '../imports/api/userdata';
import {Lectures} from '../imports/api/lectures';
import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';
import {CourseVotes} from '../imports/api/coursevotes';
//Meteor.subscribe('alllectures');

Meteor.subscribe('userdata');

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange(isAuthenticated, currentPagePrivacy);
});
// Tracker.autorun(() => {
//   Session.get('selectedLectures');
// });


// Tracker.autorun(() => {
//   const selectedRoomName = Session.get('selectedRoomName');
//   // Session.set('isNavOpen', false);
//
//   if (selectedRoomName) {
//     browserHistory.replace(`/dashboard/room/${selectedRoomName}`);
//   }
// });
Tracker.autorun(() => {
  let userselection = UserData.findOne({userId:Meteor.userId()}) && [1,...UserData.findOne({userId:Meteor.userId()}, {
                    sort: {
                      updatedAt: -1
                    }
                  }).rooms.map((item, elem)=> {


                    if(item.selectedAndShown){
                      return item.roomName
                    }
                  }).filter((item)=>{return item})]
  Session.set('selectedRooms', userselection || [1]);

});

Tracker.autorun(() => {
  let userselection = UserData.findOne({userId:Meteor.userId()}) && [1,...UserData.findOne({userId:Meteor.userId()}, {
                    sort: {
                      updatedAt: -1
                    }
                  }).lectures.map((item, elem)=> {

                    if(item.selectedAndShown){
                      return item.lectureName
                    }
                  }).filter((item)=>{return item})]
  Session.set('selectedLectures', userselection || [1]);

});

//put Lecture ratings in one list of doc
Tracker.autorun(() => {
  //find the lectures we have
      let lectures = Lectures.find({}).fetch().map((item) => {
        return item.lecturename
      });
      //generate list of docs
      let listLecturesDocs = lectures.map(
        (lecture, index) => {

      let happySubjectVotes = UserData.find({
        "lectures": {
          $elemMatch: {
            lectureName: lecture,
            subjectRate: "happy"
          }
        }
      }).fetch().length;

      let sadSubjectVotes = UserData.find({
        "lectures": {
          $elemMatch: {
            lectureName: lecture,
            subjectRate: "sad"
          }
        }
      }).fetch().length;
      let totalSubjectVote = sadSubjectVotes + happySubjectVotes

      let happyLectureVotes = UserData.find({
        "lectures": {
          $elemMatch: {
            lectureName: lecture,
            lectureRate: "happy"
          }
        }
      }).fetch().length;

      let sadLectureVotes = UserData.find({
        "lectures": {
          $elemMatch: {
            lectureName: lecture,
            lectureRate: "sad"
          }
        }
      }).fetch().length;

      let totalLectureVotes = happyLectureVotes + sadLectureVotes
      let percentageLectureHappy =100*happyLectureVotes/totalLectureVotes ;
      let percentageLectureSad = 100*sadLectureVotes/totalLectureVotes;
      let percentageSubjectHappy = 100*happySubjectVotes/totalSubjectVote;
      let percentageSubjectSad = 100*sadSubjectVotes/totalSubjectVote;
      return {subjectname: lecture, happySubjectVotes, sadSubjectVotes, happyLectureVotes, sadLectureVotes,
      totalLectureVotes,percentageLectureHappy,percentageLectureSad,percentageSubjectHappy,percentageSubjectSad}
    })

Session.set('LecturesVotes',listLecturesDocs);

});


    //Tracker.autorun(function () {// in this one this refer to function
    Tracker.autorun(()=> {// in this one this refer to parent this if available
      let clothNormalTotal = UserData.find({
        "answeredquestions": {
          $elemMatch: {
            questionName: "cloth",
            resultcategory: "normal"
          }
        }
      }).fetch().length;

      let clothNakedTotal = UserData.find({
        "answeredquestions": {
          $elemMatch: {
            questionName: "cloth",
            resultcategory: "naked"
          }
        }
      }).fetch().length;

      let clothDesertTotal = UserData.find({
        "answeredquestions": {
          $elemMatch: {
            questionName: "cloth",
            resultcategory: "desert"
          }
        }
      }).fetch().length;

      let totalClothVotes = clothNormalTotal + clothNakedTotal + clothDesertTotal
      let percentageNakedVote =Math.round(100*clothNakedTotal/totalClothVotes);
      let percentageNormalVote = Math.round(100*clothNormalTotal/totalClothVotes);
      let percentageDesertVote = Math.round(100*clothDesertTotal/totalClothVotes);

      let bmiThinTotal = UserData.find({
        "answeredquestions": {
          $elemMatch: {
            questionName: "bmi",
            resultcategory: "thin"
          }
        }
      }).fetch().length;

      let bmiHealthyTotal = UserData.find({
        "answeredquestions": {
          $elemMatch: {
            questionName: "bmi",
            resultcategory: "healthy"
          }
        }
      }).fetch().length;

      let bmiExtraTotal = UserData.find({
        "answeredquestions": {
          $elemMatch: {
            questionName: "bmi",
            resultcategory: "extra"
          }
        }
      }).fetch().length;
      let totalBMIVotes = bmiThinTotal + bmiHealthyTotal + bmiExtraTotal
      let percentageThinVote =Math.round(100*bmiThinTotal/totalBMIVotes)
      let percentageHealthVote = Math.round(100*bmiHealthyTotal/totalBMIVotes)
      let percentageExtraVote = Math.round(100*bmiExtraTotal/totalBMIVotes)
      let prevalence = {totalBMIVotes,thin:percentageThinVote,healthy:percentageHealthVote,extra:percentageExtraVote,
      totalClothVotes,naked:percentageNakedVote,normal:percentageNormalVote,desert:percentageDesertVote}
      Session.set('Prevalence',prevalence );


});


Tracker.autorun(() => {
  //find the lectures we have
      let rooms = Rooms.find({}).fetch().map((item) => {
        return item.roomname
      });
      //generate list of docs
      let listRoomsDocs = rooms.map(
        (room, index) => {

      let happyRoomsVote = UserData.find({
        "rooms": {
          $elemMatch: {
            roomName: room,
            roomRate: "happy"
          }
        }
      }).fetch().length;

      let sadRoomsVote = UserData.find({
        "rooms": {
          $elemMatch: {
            roomName: room,
            roomRate: "sad"
          }
        }
      }).fetch().length;

      let happyThermalVote = UserData.find({
        "rooms": {
          $elemMatch: {
            roomName: room,
            thermalRate: "happy"
          }
        }
      }).fetch().length;

      let sadThermalVote = UserData.find({
        "rooms": {
          $elemMatch: {
            roomName: room,
            thermalRate: "sad"
          }
        }
      }).fetch().length;

      let totalRoomVotes = sadRoomsVote + happyRoomsVote
      let percentageRoomHappy =100*happyRoomsVote/totalRoomVotes ;
      let percentageRoomSad = 100*sadRoomsVote/totalRoomVotes;

      let totalthermalVotes = sadThermalVote + happyThermalVote
      let percentageThermalHappy =100*happyThermalVote/totalthermalVotes ;
      let percentageThermalSad = 100*sadThermalVote/totalthermalVotes;
      return {roomname: room,happyRoomsVote,sadRoomsVote, totalRoomVotes,percentageRoomHappy,percentageRoomSad,
      sadThermalVote,totalthermalVotes,happyThermalVote,percentageThermalHappy,percentageThermalSad}
    })

Session.set('RoomsVotes',listRoomsDocs);

});

Tracker.autorun(() => {
  let rooms = Rooms.find({}).fetch().map((item) => {
    return item.roomname
  });

  //generate list of docs
  let listThermalWishDocs = rooms.map(
    (room, index) => {
  let temperatureRoomsVoteArr = UserData.find(
    { "rooms.roomName": room, "rooms.T_wish": { $gt: 0 } }
).fetch();
let temperatureRoomsVoteLen = temperatureRoomsVoteArr.length;

let lightRoomsVoteArr = UserData.find(
  { "rooms.roomName": room, "rooms.Light_wish": { $gt: 0 } }
).fetch();
let lightRoomsVoteLen = lightRoomsVoteArr.length;


let rhRoomsVoteArr = UserData.find(
{ "rooms.roomName": room, "rooms.Rh_wish": { $gt: 0 } }
).fetch();
let rhRoomsVoteLen = rhRoomsVoteArr.length;

let temperatureRoomsVoteSum = 0;
let rhRoomsVoteSum = 0;
let lightRoomsVoteSum = 0;

temperatureRoomsVoteArr.forEach((item , index, array) => {
  let userroominfo = item.rooms.find((doc)=>{
    return doc.roomName === room});

    temperatureRoomsVoteSum = temperatureRoomsVoteSum + userroominfo["T_wish"];

});
let temperatureRoomsVoteAvg = Math.round(temperatureRoomsVoteSum/temperatureRoomsVoteLen);
lightRoomsVoteArr.forEach((item , index, array) => {
  let userroominfo = item.rooms.find((doc)=>{
    return doc.roomName === room});

      lightRoomsVoteSum =lightRoomsVoteSum + userroominfo["Light_wish"];

});
let lightRoomsVoteAvg = Math.round(lightRoomsVoteSum/lightRoomsVoteLen)


rhRoomsVoteArr.forEach((item , index, array) => {
  let userroominfo = item.rooms.find((doc)=>{
    return doc.roomName === room});

      rhRoomsVoteSum =rhRoomsVoteSum +  userroominfo["Rh_wish"];

});
let rhRoomsVoteAvg = Math.round(rhRoomsVoteSum/rhRoomsVoteLen);
return {room,temperatureRoomsVoteAvg,lightRoomsVoteAvg,rhRoomsVoteAvg,rhRoomsVoteLen,lightRoomsVoteLen,temperatureRoomsVoteLen}

// console.log("temperatureRoomsVoteLen",temperatureRoomsVoteLen,"temperatureRoomsVoteSum",
// temperatureRoomsVoteSum,"temperatureRoomsVoteAvg",temperatureRoomsVoteAvg,"lightRoomsVoteArr",
// lightRoomsVoteArr,"lightRoomsVoteLen",lightRoomsVoteLen,"rhRoomsVoteArr",rhRoomsVoteArr,"rhRoomsVoteLen",rhRoomsVoteLen);
})
// console.log(listThermalWishDocs);
Session.set('RoomsThermalVotes',listThermalWishDocs);

});

Meteor.startup(() => {
  Session.set('RoomsThermalVotes',[])
  Session.set('newNews',false)
  Session.set('selectedLectures',[]);
  Session.set('selectedRooms',[]);
  Session.set('LecturesVotes',[]);
  Session.set('Prevalence',[]);
  Session.set('listRoomsDocs',[]);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById('app'));
});
