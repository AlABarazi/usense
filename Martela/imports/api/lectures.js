import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Lectures = new Mongo.Collection('lectures');
if (Meteor.isServer) {
  //Meteor.publish('links', () => {  you can't access to this.userId
  Meteor.publish('alllectures', function() {
    return Lectures.find({});
  });
  Meteor.publish('lecutrestoday', function() {
    return Rooms.find({"lectures.lecture_calender.day": moment().format('dddd')});
  });

  Meteor.methods({

    'lecture.update.vote' (category, item, impression) {

      // console.log("lecture.update.vote", category, item, impression);
      //const lecturedoc = {lectureName:lecture,lectureRate:undefined,subjectRate:undefined,updatedAt:moment().valueOf(),selectedAndShown:true}
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      if (category === "lecture" && impression === "happy") {

        if (Lectures.findOne({'lecturename': item})) {

          Lectures.update(
            {

            'lecturename': item
          }, {
            $inc: {
              lecture_satisfaction: +1,
              lecture_satisfaction_voters: +1
            }
          }
        );
          return
        }
      }
      if (category === "lecture" && impression === "sad") {

        if (Lectures.findOne({'lecturename': item})) {

          Lectures.update(
            {

            'lecturename': item
          }, {
            $inc: {
              lecture_satisfaction: -1,
              lecture_satisfaction_voters: -1
            }
          }
        );
          return
        }
      }
},
      // new SimpleSchema({
      //   _id: {
      //     type: String,
      //     min: 1}
      //    ,
      //    name: {
      //      type: String,
      //      optional: false
      //    }
      // }).validate({
      //   _id
      // });

      'lectures.removeall' () {
        if(!this.userId) {
          throw new Meteor.Error('not-authorized');
        }
        // console.log("something is hapening please :( ");
        Lectures.remove({});
      },
      'lectures.insert' (lecturename) {
        if(!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        return Lectures.insert({
          name: lecturename,
          userId: this.userId,
          updatedAt: moment().valueOf(),
          building: 'Otakari 1',
          temperature: 30,
          rh: 20,
          lectures: [
            'BIM1', 'BIM2'
          ],
          total_satisfaction: 40,
          total_satisfaction_voters: 50,
          lectures_satisfaction: 60,
          lectures_satisfaction_voters: 60,
          thermal_satisfaction: 80,
          avg_pref_temp: 35,
          avg_pref_temp_voters: 70,
          avg_pref_rh: 50,
          avg_pref_rh_voters: 50
        });
      },
      'lectures.remove' (_id) {
        if(!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
          _id: {
            type: String,
            min: 1
          }
        }).validate({_id});

        Lectures.remove({_id, userId: this.userId});
      },

      'lectures.update' (_id, updates) {
        if(!this.userId) {
          throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
          _id: {
            type: String,
            min: 1
          },
          name: {
            type: String,
            optional: false
          }
        }).validate({
          _id,
          ...updates
        });

        Lectures.update({
          _id,
          userId: this.userId
        }, {
          $set: {
            updatedAt: moment().valueOf(),
            ...updates
          }
        });
      }

    }); //end of methods
  } //end of server
