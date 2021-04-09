import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const CourseVotes = new Mongo.Collection('coursevotes');
if (Meteor.isServer){
//Meteor.publish('links', () => { // you can't access to this.userId
Meteor.publish('alllecturesvotes', function() {
return CourseVotes.find({});
});
Meteor.methods({

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
  //   CourseVotes.remove({ _id, userId: this.userId });
  // },

  'coursevote.upsert'(lecturename, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // new SimpleSchema({
    //   _id: {
    //     type: String,
    //     min: 1
    //   },
    //   name: {
    //     type: String,
    //     optional: false
    //   }
    // }).validate({
    //   _id,
    //   ...updates
    // });

    CourseVotes.update({
      lecturename,

    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    },
    {
    upsert: true,
  });
  }
});

}
