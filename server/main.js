import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  PlayersList = new Mongo.Collection("players");

  PlayersList.insert({name:"david"});
  PlayersList.insert({name:"julien"});
  PlayersList.insert({name:"vincent"});
});
