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
  "click .gestion":function(event,instance){
    Session.set("template_name","Gestion")
  },
  "click .accueil":function(event,instance){
    Session.set("template_name","Accueil");
  },
});


Router.route('/', function () {
  this.render('Accueil');
});
Router.route('/Accueil');
Router.route('/Proposer');
Router.route('/Gestion');

// Checker si la personne est connecté sinon lui demander de se connecter ou s'inscrire
Router.route('/Connexion');
