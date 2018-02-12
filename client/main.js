import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Handlebars } from 'meteor/handlebars';

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




Template.Proposer.onCreated(function(){
  this.creneau = new ReactiveVar(false);
  this.precis = new ReactiveVar(false);
  this.nbcreneau = new Array("Coucou","Salut");
  this.sizetab = new ReactiveVar(1);
});

Template.Proposer.helpers({
  creneau:function(){
    return Template.instance().creneau.get();
  },
  precis:function(){
    return Template.instance().precis.get();
  },
  nbcreneau:function(){
    return "{{>choixjour}}";
  }
});

Template.Proposer.events({
  'click .creneau': function(event, instance){
    instance.creneau.set(true);
    instance.precis.set(false);
    document.getElementById("choix1").checked = true;
    document.getElementById("choix2").checked = false;
  },
  'click .precis': function(event,instance){
    instance.creneau.set(false);
    instance.precis.set(true);
    document.getElementById("choix1").checked = false;
    document.getElementById("choix2").checked = true;
  },
});
