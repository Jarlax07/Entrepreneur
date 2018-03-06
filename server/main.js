import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  HelpMembersList = new Mongo.Collection("members");

  Meteor.publish('HelpMembersList', function(){
    var currentUserId = this.userId;
    return HelpMembersList.find();
  });

});
