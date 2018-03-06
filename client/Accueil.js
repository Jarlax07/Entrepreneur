import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';


Template.Accueil.helpers({
  username : function(){
    return HelpMembersList.find();
  },
  refresh : function(){
    //If user is connected and session variable are not empty.

    if(Meteor.userId() && Session.get('form')) {
      //FIXME

      data = Session.get('form');
      HelpMembersList.insert({
        title: data.title,
        description: data.description,
        keywords : data.keywords,
        coffee : data.coffee
      });

      Session.set('form',null);

    }
  }
});


// Template.Accueil.onCreated = function(){
//     Meteor.subscribe('HelpMembersList');
//     HelpMembersList = new Mongo.Collection('members');
//
//   }

Template.Accueil.onRendered = function(){
  }
