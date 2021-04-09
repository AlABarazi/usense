import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import {UserData} from './userdata'
Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });

  return true;
});
Accounts.onCreateUser(function(options, user) {
  // console.log('Meteor.userId()',Meteor.userId(),'Meteor.user()',Meteor.user(),'user._id',user._id);
  Meteor.call('userdata.insert',user._id);
  return user;
});
