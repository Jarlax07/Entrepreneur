import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Accounts} from 'meteor/accounts-base';
import {Mongo} from 'meteor/mongo';
import './main.html';

Meteor.startup(function() {

  Session.setDefault("form", null);

});

Template.body.helpers({
  username: function() {
    return "Vous êtes connecté en tant que " + Meteor.user().username;
  }
});

Template.body.onCreated(function() {
  Meteor.subscribe('HelpMembersList');
  HelpMembersList = new Mongo.Collection('members');
});

Template.body.events({
  'click .logout': function(event, instance) {
    Meteor.logout((error) => {
      if (error) {
        console.log(error);
      }
    });
  }
})

Router.route('/', function() {
  this.render('Accueil');
});
Router.route('/Proposer');

//Check si user connecté et affiche la page de connexion ou de gestion en fonction
Router.route('/Gestion', function() {
  if (Meteor.userId()) {
    this.render('Gestion');
  } else {
    this.render("Connexion");
  }
});

// Check si la personne est connecté sinon lui demander de se connecter ou s'inscrire

//Require ne pas aller sur cette page si déja connecté
Router.route('/Inscription');

Router.route('/Connexion', function() {
  if (Meteor.userId()) {
    Router.go("/");
  } else {
    this.render('Connexion');
  }
});

Accounts.ui.config({passwordSignupFields: 'USERNAME_AND_EMAIL'});
