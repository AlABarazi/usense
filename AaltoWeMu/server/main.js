import {Meteor} from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import '../imports/api/users';
import '../imports/api/lectures';
import '../imports/api/upload';
import '../imports/api/userdata';
import {Rooms} from '../imports/api/rooms';
import {Lectures} from '../imports/api/lectures';
import {Sensors} from '../imports/api/sensors';
import {UserData} from '../imports/api/userdata';
import {Contents} from '../imports/api/contents';

// import the function that validate users. The function will be called to check that
// there is correct email foramt provided inside users.js there is no export or export defaults
// we need to just execute the function directly.

import {HTTP} from 'meteor/http';

//
import '../imports/startup/simple-schema-configuration.js';
import moment from 'moment';

const fetchSensorData = (roomdoc) => {
  console.log("Fetching Sensors Data");
  var sensors = [];
  if (HTTP.get(roomdoc["apiaddress"]).data) {
  //   [
  // {
  //   "Data": "16.75,16.95,24.26,24.28,149.17,150.00,400,400,,,481,772,,,-0.68,-0.67,52,54,99678.48,99681.21",
  //   "Date": "2018-03-22 19:39:20"
  // }]
    sensors = HTTP.get(roomdoc["apiaddress"]).data[0];
    console.log("roomname",roomdoc["roomname"]);


  //sensors.length = 1;

    readingsarr = sensors['Data'].split(',');

      //update(changethistoid,{$set:{:},$inc:{:}})//simplified
      // console.log("writing new sensors data");
      // var enteryID = "";
      // enteryID = Sensors.insert({
      //   onclouddate: moment(item['Date'], "YYYY-MM-DD hh:mm:ss").valueOf(),
      //   date: moment().valueOf()
      // });
      //import moment from 'moment';
      readingsarr.forEach(function(item, index, array) {
        var obj = {};
        // console.log(array);
        obj['av-rh'] = array[0];
        obj['max-rh'] = array[1];
        obj['av-t'] = array[2];
        obj['max-t'] = array[3];
        obj['av-light'] = array[4];
        obj['max-light'] = array[5];
        obj['av-co2'] = array[6];
        obj['max-co2'] = array[7];
        obj['av-tvoc'] = array[8];
        obj['max-tvoc'] = array[9];
        obj['av-nox'] = array[10];
        obj['max-nox'] = array[11];
        obj['av-radon'] = array[12];
        obj['max-radon'] = array[13];
        obj['av-diff-p'] = array[14];
        obj['max-diff-p'] = array[15];
        obj['av-sound'] = array[16];
        obj['max-sound'] = array[17];
        obj['av-bar-p'] = array[18];
        obj['max-bar-p'] = array[19];
        //Sensors.insert({})
        //console.log(obj);
        // Sensors.update(enteryID, {
        //   $set: {
        //     ...obj
        //   }
        // }) //$inc google mongoDB update operators
        Rooms.update({
          roomname: roomdoc['roomname']
        }, {
          $set: {
            ...obj,
            onclouddate: moment(item['Date'], "YYYY-MM-DD hh:mm:ss").valueOf(),
            date: moment().valueOf()
          }
        }) //$inc google mongoDB update operators
        //update(changethistoid,{$set:{:},$inc:{:}})//simplified
        //update(changethistoid,{$set:{:},$inc:{:}})//simplified
        //import moment from 'moment';
        //your iterator
      });


}
};

const fetchRoomData = () => {
  //console.log(Rooms.find({}).fetch());
  var rooms = [];
  rooms = JSON.parse(Assets.getText("rooms.json"));
  rooms.forEach((item, index, array) => {
    Rooms.insert({
      ...item
    });
  });
};
const fetchLecturesData = () => {
  //console.log(Lectures.find({}).fetch());
  var lectures = [];
  lectures = JSON.parse(Assets.getText("lectures.json"));
  lectures.forEach((item, index, array) => {
    Lectures.insert({
      ...item
    });
  });
};
const fetchContentsData = () => {
  //console.log(Lectures.find({}).fetch());
  var contents = [];
  contents = JSON.parse(Assets.getText("contents.json"));
  contents.forEach((item, index, array) => {
    Contents.insert({
      ...item
    });
  });
};
Meteor.startup(() => {

  Rooms.remove({});
  Sensors.remove({});
  Lectures.remove({});
  Contents.remove({});

  fetchLecturesData();
  fetchRoomData();
  fetchContentsData();
  Meteor.setTimeout(() => {
    try {


        Rooms.find({}).fetch().forEach(function(item, index, array) {
            fetchSensorData(item)

          // console.log(item);

        });

        // console.log(item);
        Meteor.setInterval(() => {
          Rooms.find({}).fetch().forEach(function(item, index, array) {

            fetchSensorData(item)

          });

        }, 600000);

    } catch (e) {
      // console.log(e);
    } finally {}
  }, 60000)


});
