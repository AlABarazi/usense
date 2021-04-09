import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Sensors = new Mongo.Collection('sensors');
if (Meteor.isServer){
//Meteor.publish('links', () => { // you can't access to this.userId
Meteor.publish('allsensors', function() {
return Sensors.find({});
});

Meteor.methods({
  'sensors.removeall'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // console.log("something is hapening please :( ");
    Sensors.remove({});
  },
  'sensors.insert'(sensorname) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Sensors.insert({
      name:sensorname,
      userId: this.userId,
      updatedAt: moment().valueOf(),
      building:'Otakari 1',
      temperature:30,
      rh:20,
      lectures:['BIM1','BIM2'],
      total_satisfaction:40,
      total_satisfaction_voters:50,
      lectures_satisfaction:60,
      lectures_satisfaction_voters:60,
      thermal_satisfaction:80,
      avg_pref_temp:35,
      avg_pref_temp_voters:70,
      avg_pref_rh:50,
      avg_pref_rh_voters:50,
    });
  },
  'sensors.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Sensors.remove({ _id, userId: this.userId });
  },

  'sensors.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      roomname: {
        type: String,
        optional: false
      }
    }).validate({
      _id,
      ...updates
    });

    Sensors.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});
}
