import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';

Meteor.startup(function(){
    Session.setDefault("template_name", "Accueil");
});

Template.body.helpers({
  template_name : function(){
    return  Session.get("template_name")
  }
});


Template.body.events({
  "click .proposer": function(event, instance){
     Session.set("template_name","Proposer");
  },
  "click .gestion":function(event,instance){
    Session.set("template_name","Gestion")
  },
  "click .accueil":function(event,instance){
    Session.set("template_name","Accueil");
  },
});
