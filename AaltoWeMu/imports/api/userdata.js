import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';
import {Lectures} from '../api/lectures';

export const UserData = new Mongo.Collection('userdata');
if (Meteor.isServer) {
  //Meteor.publish('links', () => {  you can't access to this.userId
  //This is dangerous and not correct. You are making all the info about  all userSelections
  //avialable to everyone else it must be fixed
  Meteor.publish('userdata', function() {
    return UserData.find({});
  });

const finduserbadge = (points)=>{
  const badges = {3:"hatched",10:"chick"};
  const badgeskeys = Object.keys(badges);
  if (badgeskeys.indexOf(points) ){
    return badges[points]
  }


}

Meteor.methods({

    'userdata.insert' (userid) {

      if (Meteor.isClient && !this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      if (UserData.findOne({userId: this.userId})) {
        // console.log("usernotinserted");
        return
      }
      // console.log("userinserted");
      // console.log("this.userid", this.userId, userid);
      return UserData.insert({userId: userid, lectures: [], rooms: [], answeredquestions: [], points: 0, badge:"unhatched",show:true});
    },
    'userdata.update.environment' (roomName,category,userinput,sensorreading) {

      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      new SimpleSchema({
        userinput: {
          type: Number,
          min: 0,
        max:1000}
      }).validate({
        userinput
      });
      if (UserData.findOne({userId: this.userId})) {
        category === "av-t"?
        UserData.update({
          userId: this.userId,
          rooms: {
            $elemMatch: {
              roomName
            }
          }
        }, {
          $set: {
            "rooms.$.T_wish": parseFloat(userinput),
            "rooms.$.T_sensor": parseFloat(sensorreading),
            "rooms.$.T_wish_at": moment().valueOf(),

            // Rh_wish:undefined,
            // Rh_wish_at:undefined,
            // Rh_sensor:undefined,
            // Light_wish:undefined,
            // Light_sensor:undefined,
            // Light_wish_at:undefined
          }
        })
        :category === "av-rh"?
        UserData.update({
          userId: this.userId,
          rooms: {
            $elemMatch: {
              roomName
            }
          }
        }, {
          $set: {
            "rooms.$.Rh_wish": parseFloat(userinput),
            "rooms.$.Rh_sensor": parseFloat(sensorreading),
            "rooms.$.Rh_wish_at": moment().valueOf(),

            // Light_wish:undefined,
            // Light_sensor:undefined,
            // Light_wish_at:undefined
          }
        })
        :category === "av-light"?
        UserData.update({
          userId: this.userId,
          rooms: {
            $elemMatch: {
              roomName
            }
          }
        }, {
          $set: {
            "rooms.$.Light_wish": parseFloat(userinput),
            "rooms.$.Light_sensor": parseFloat(sensorreading),
            "rooms.$.Light_wish_at": moment().valueOf(),

            // Light_wish:undefined,
            // Light_sensor:undefined,
            // Light_wish_at:undefined
          }
        }):null
        return;
      }

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
    },




    'userdata.update.room' (room) {
      const roomdoc = {
        roomName: room,
        roomRate: undefined,
        thermalRate: undefined,
        updatedAt: moment().valueOf(),
        selectedAndShown: true,
        T_wish:undefined,
        "av-t":undefined,
        T_wish_at:undefined,
        Rh_wish:undefined,
        Rh_wish_at:undefined,
        "av-rh":undefined,
        Light_wish:undefined,
        "av-light":undefined,
        Light_wish_at:undefined

      }
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      if (UserData.findOne({userId: this.userId, 'rooms.roomName': room})) {
        // console.log("room", room, "already in");
        UserData.update({
          userId: this.userId,
          rooms: {
            $elemMatch: {
              roomName: room,
              selectedAndShown: false
            }
          }
        }, {
          $set: {
            "rooms.$.selectedAndShown": true
          }
        });
        return
      }



      UserData.update({
        userId: this.userId
      }, {
        $push: {
          rooms: {
            $each: [roomdoc]
          }
        }
      });
    },
    'userdata.update.lecture' (lecture) {
      const lecturedoc = {
        lectureName: lecture,
        lectureRate: undefined,
        subjectRate: undefined,
        updatedAt: moment().valueOf(),
        selectedAndShown: true
      }
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      if (UserData.findOne({userId: this.userId, 'lectures.lectureName': lecture})) {
        // console.log("lecture", lecture, "already in");
        UserData.update({
          userId: this.userId,
          lectures: {
            $elemMatch: {
              lectureName: lecture,
              selectedAndShown: false
            }
          }
        }, {
          $set: {
            "lectures.$.selectedAndShown": true
          }
        });
        return
      }

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

      UserData.update({
        userId: this.userId
      }, {
        $push: {
          lectures: {
            $each: [lecturedoc]
          }
        }
      });
    },
    'userdata.update.vote' (category, item, impression) {
      // console.log("'userdata.update.vote'", category, item, impression);
      //const lecturedoc = {lectureName:lecture,lectureRate:undefined,subjectRate:undefined,updatedAt:moment().valueOf(),selectedAndShown:true}
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      if (category === "lecture") {
        if (UserData.findOne({userId: this.userId, 'lectures.lectureName': item})) {
          // console.log("lecture", item, "already in");
          UserData.update({
            userId: this.userId,
            lectures: {
              $elemMatch: {
                lectureName: item
              }
            }
          }, {
            $set: {
              "lectures.$.lectureRate": impression
            }
          });

          return
        }
      }
      if (category === "subject") {
        if (UserData.findOne({userId: this.userId, 'lectures.lectureName': item})) {
          // console.log("lecture", item, "already in");
          UserData.update({
            userId: this.userId,
            lectures: {
              $elemMatch: {
                lectureName: item
              }
            }
          }, {
            $set: {
              "lectures.$.subjectRate": impression
            }
          });

          return
        }
      }
      if (category === "room") {
        if (UserData.findOne({userId: this.userId, 'rooms.roomName': item})) {
          // console.log("lecture", item, "already in");
          UserData.update({
            userId: this.userId,
            rooms: {
              $elemMatch: {
                roomName: item
              }
            }
          }, {
            $set: {
              "rooms.$.roomRate": impression
            }
          });

          return
        }
      }
      if (category === "thermal") {
        if (UserData.findOne({userId: this.userId, 'rooms.roomName': item})) {
          // console.log("lecture", item, "already in");
          UserData.update({
            userId: this.userId,
            rooms: {
              $elemMatch: {
                roomName: item
              }
            }
          }, {
            $set: {
              "rooms.$.thermalRate": impression,

            }
          });

          return
        }
      }

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
    },

    'userdata.update.cloth' (questionName,resultcategory) {
      const interactiondoc = {
        questionName,
        resultcategory,
        updatedAt: moment().valueOf()
      }
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      if (UserData.findOne({userId: this.userId, 'answeredquestions.questionName': questionName})) {
        // console.log("question", questionName, "already in");
        UserData.update({
          userId: this.userId,
          answeredquestions: {
            $elemMatch: {
              questionName
            }
          }
        }, {
          $set: {
            "answeredquestions.$.resultcategory": resultcategory

          }
        });
        return
      }

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

      UserData.update({
        userId: this.userId
      }, {
        $push: {
          answeredquestions: {
            $each: [interactiondoc]
          }
        }
      });
      UserData.update({
        userId: this.userId
      }, {
        $inc: {
          points:+1
        }
      });

      const newbadge=finduserbadge(UserData.findOne({userId: this.userId}).points)
      if(newbadge){

        UserData.update({
          userId: this.userId
        }, {
          $set: {
            badge:newbadge,
            show:true
          }

        });
      }

    },


    'userdata.update.bmi' (questionName,resultcategory,bmi,age,weight,height) {
      const interactiondoc = {
        questionName,
        resultcategory,
        updatedAt: moment().valueOf()
      }
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      if (UserData.findOne({userId: this.userId, 'answeredquestions.questionName': questionName})) {
        // console.log("question", questionName, "already in");
        UserData.update({
          userId: this.userId,
          answeredquestions: {
            $elemMatch: {
              questionName
            }
          }
        }, {
          $set: {
            "answeredquestions.$.resultcategory": resultcategory,
            age,weight,height,bmi
          }
        });
        return
      }

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

      UserData.update({
        userId: this.userId
      }, {
        $push: {
          answeredquestions: {
            $each: [interactiondoc]
          }
        }
      });
      UserData.update({
        userId: this.userId
      }, {
        $inc: {
          points:+1
        },$set:{
          age,weight,height,bmi
        }
      });


      const newbadge=finduserbadge(UserData.findOne({userId: this.userId}).points)
      if(newbadge){

        UserData.update({
          userId: this.userId
        }, {
          $set: {
            badge:newbadge,
            show:true
          }

        });
      }
    },

    'userdata.scene.off' () {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      // new SimpleSchema({
      //   _id: {
      //     type: String,
      //     min: 1
      //   }
      // }).validate({ _id });

      //   UserData.update({ userId: this.userId },
      //     { $pull: { lectures:  { lectureName: lecture} } },
      // { multi: true }
      //   );

      UserData.update({
        userId: this.userId,
      }, {
        $set: {
          show:false
        }
      });
    },
    'userdata.addpoint' () {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      // new SimpleSchema({
      //   _id: {
      //     type: String,
      //     min: 1
      //   }
      // }).validate({ _id });

      //   UserData.update({ userId: this.userId },
      //     { $pull: { lectures:  { lectureName: lecture} } },
      // { multi: true }
      //   );

      UserData.update({
        userId: this.userId,
      }, {
        $inc: {
          points:+1
        }
      });
      const newbadge=finduserbadge(UserData.findOne({userId: this.userId}).points)
      if(newbadge){

        UserData.update({
          userId: this.userId
        }, {
          $set: {
            badge:newbadge,
            show:true
          }

        });
      }
    },

    'userdata.remove.lecture' (lecture) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      // new SimpleSchema({
      //   _id: {
      //     type: String,
      //     min: 1
      //   }
      // }).validate({ _id });

      //   UserData.update({ userId: this.userId },
      //     { $pull: { lectures:  { lectureName: lecture} } },
      // { multi: true }
      //   );

      UserData.update({
        userId: this.userId,
        lectures: {
          $elemMatch: {
            lectureName: lecture,
            selectedAndShown: true
          }
        }
      }, {
        $set: {
          "lectures.$.selectedAndShown": false
        }
      });
    },
    'userdata.remove.room' (room) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      // new SimpleSchema({
      //   _id: {
      //     type: String,
      //     min: 1
      //   }
      // }).validate({ _id });

      //   UserData.update({ userId: this.userId },
      //     { $pull: { lectures:  { lectureName: lecture} } },
      // { multi: true }
      //   );
      UserData.update({
        userId: this.userId,
        rooms: {
          $elemMatch: {
            roomName: room,
            selectedAndShown: true
          }
        }
      }, {
        $set: {
          "rooms.$.selectedAndShown": false
        }
      });
    }
  });

}
