import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Accounts} from 'meteor/accounts-base';

Template.Connexion.onCreated(function() {
  this.verify_mail = new ReactiveVar(false);
  this.verify_pseudo = new ReactiveVar(false);
  this.errormsg = new ReactiveVar(null);
});

Template.Connexion.helpers({
  verify_mail: function() {
    return Template.instance().verify_mail.get();
  }
});

Template.Connexion.events({
  'submit': function(event, instance) {
    Meteor.loginWithPassword(document.getElementById("pseudo").value, document.getElementById("psw").value, (error) => {
      if (error) {
        instance.errormsg.set(error.reason);
      }
    })
    console.log(instance.errormsg.get());
    if (instance.errormsg.get() == "Incorrect password") {
      instance.find("#error").innerHTML = null;
      instance.find("#error").innerHTML += "Le mot de passe est incorrect<br>";
    }

    return false;
  }
});
