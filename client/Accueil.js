import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';


Template.Accueil.helpers({
  username : function(){
    return HelpMembersList.find();
  }
});


// Template.Accueil.onCreated = function(){
//     Meteor.subscribe('HelpMembersList');
//     HelpMembersList = new Mongo.Collection('members');
//
//   }

Template.Accueil.onRendered = function(){
  }
