import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Tags = new Mongo.Collection('tags');
if (Meteor.isServer){
//Meteor.publish('links', () => { // you can't access to this.userId
Meteor.publish('alltags', function() {
return Tags.find({});
});
Meteor.methods({
  'tags.insert'(room,pitch,yaw,type,text,URL,absURL,category,icon,reply,status) {
    console.log(room,pitch,yaw,type,text,URL,absURL,category,icon,reply);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Tags.insert({
      room,
      pitch,
      yaw,
      type,
      text,
      URL,absURL,
      category,icon,reply,status,
      userId:this.userId,
      email:Meteor.user().emails[0].address,
      updatedAt: moment().format("MMM Do YY"),
      sulotion:""


    });
  },

  'tags.update' (doc) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (Meteor.user().emails[0].address == "alaabarazi@gmail.com" || this.userId == doc.userId) {
      // console.log("room", room, "already in");
      Tags.update({
        _id:doc._id
      }, {
        $set: {
          status:doc.status,sulotion:doc.sulotion,text:doc.text,
        }
      });
      return
    }

  },

});
}
