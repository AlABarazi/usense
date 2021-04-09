import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Contents = new Mongo.Collection('contents');
if (Meteor.isServer){
//Meteor.publish('links', () => { // you can't access to this.userId
Meteor.publish('allcontents', function() {
return Contents.find({});
});
}
Meteor.methods({
  // 'rooms.insert'(roomname) {
  //   if (!this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   return Rooms.insert({
  //     name:roomname,
  //     userId: this.userId,
  //     updatedAt: moment().valueOf(),
  //     building:'Otakari 1',
  //     temperature:30,
  //   });
  // },
  // 'rooms.remove'(_id) {
  //   if (!this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   new SimpleSchema({
  //     _id: {
  //       type: String,
  //       min: 1
  //     }
  //   }).validate({ _id });
  //
  //   Rooms.remove({ _id, userId: this.userId });
  // },
  //
  // 'rooms.update'(_id, updates) {
  //   if (!this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   new SimpleSchema({
  //     _id: {
  //       type: String,
  //       min: 1
  //     },
  //     name: {
  //       type: String,
  //       optional: false
  //     }
  //   }).validate({
  //     _id,
  //     ...updates
  //   });
  //
  //   Rooms.update({
  //     _id,
  //     userId: this.userId
  //   }, {
  //     $set: {
  //       updatedAt: moment().valueOf(),
  //       ...updates
  //     }
  //   });
  // }
});
