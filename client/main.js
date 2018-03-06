import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import './main.html';

Meteor.startup(function(){

  Session.setDefault("form", null);
  //Session.setDefault("title", "wsh");

});


Template.body.onCreated(
  function(){
    Meteor.subscribe('HelpMembersList');
    HelpMembersList = new Mongo.Collection('members');
  }
);

Router.route('/', function () {
  this.render('Accueil');
});
Router.route('/Accueil');
Router.route('/Proposer');
Router.route('/Gestion');

// Checker si la personne est connecté sinon lui demander de se connecter ou s'inscrire
Router.route('/Connexion',function(){
  if(Meteor.userId()){
    this.render('Gestion');
  }else{
    this.render('Connexion');
  }
});
