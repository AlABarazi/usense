import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const ProsCons = new Mongo.Collection('proscons');
if (Meteor.isServer){
//Meteor.publish('links', () => { // you can't access to this.userId
Meteor.publish('allproscons', function() {
return ProsCons.find({});
});
Meteor.methods({
  'proscons.insert'(room,type,content) {
    console.log(room,type,content);
    console.log(ProsCons.find({room:room}).fetch());
console.log(ProsCons.find({room,type,content}).fetch().length === 0);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if (ProsCons.find({room,type,content,users:this.userId}).fetch().length !== 0){
      return
    }
    if (ProsCons.find({room,type,content}).fetch().length === 0){
      return ProsCons.insert({
        room,type,content,
        updatedAt: moment().valueOf(),
        count:1,
        users:[this.userId]
      });
    }
else {
  console.log("update");
  return ProsCons.update({
    room,
    type,
    content
  }, {
    $push: {
      users: this.userId
    },
    $inc: {
      count: + 1
    }
  }
);

}
},
'proscons.delete'(room,type,content) {
  console.log(ProsCons.findOne({room,type,content,count: 1,users:this.userId}));
  if (!this.userId) {
    throw new Meteor.Error('not-authorized');
  }
  if (ProsCons.find({room,type,content,count: { $gt: 1 },users:this.userId}).fetch().length !==0){
    return ProsCons.update({
      room,
      type,
      content
    }, {
      $pull: {
        users: this.userId
      },
      $inc: {
        count: - 1
      }
    }
  );
  }
  if (ProsCons.find({room,type,content,count: 1,users:this.userId}).fetch().length !==0){
    return ProsCons.remove({room,type,content,count: 1,users:this.userId}
  );
  }
},
});
}
