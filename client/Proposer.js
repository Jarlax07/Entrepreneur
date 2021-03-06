import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

Template.Proposer.onCreated(function() {
  this.creneau = new ReactiveVar(false);
  this.precis = new ReactiveVar(false);
  this.nbcreneau = new ReactiveVar(0);
});

Template.Proposer.helpers({
  creneau: function() {
    return Template.instance().creneau.get();
  },
  precis: function() {
    return Template.instance().precis.get();
  },
  submit_button: function() {
    if (Meteor.userId()) {
      return "Poster mon aide";
    } else {
      return "Valider";
    }
  }
});

Template.Proposer.events({
  // display the choice of time windows
  'click .creneau': function(event, instance) {
    instance.creneau.set(true);
    instance.precis.set(false);
    instance.nbcreneau.set(1);
    document.getElementById("choix1").checked = true;
    document.getElementById("choix2").checked = false;
  },
  // display the choice of an exact date and hour
  'click .precis': function(event, instance) {
    instance.creneau.set(false);
    instance.precis.set(true);
    document.getElementById("choix1").checked = false;
    document.getElementById("choix2").checked = true;
  },
  // add a time window
  'click .add': function(event, instance) {
    instance.nbcreneau.set(instance.nbcreneau.get() + 1);
    var field = "<br>Le <select name='creneau" + instance.nbcreneau.get() + "' size='1'><option>Lundi</option><option>Mardi</option><option>Mercredi</option><option>Jeudi</option><option>Vendredi</option><option>Samedi</option><option>Dimanche</option></select> de <input type='time' name='starthour'> à <input type='time' name='endhour'>";
    instance.find("#newcreneau").innerHTML += field;
  },
  'submit': function(event, instance) {

    // event.preventDefault();
    if (Meteor.userId()) {
      //TODO rajouter les autres champs
      HelpMembersList.insert({title: event.target.title.value, description: event.target.description.value, keywords: event.target.keywords.value, coffee: event.target.coffee.value, status: "envoyé"});

      instance.find("#divform").innerHTML = null;
      instance.find("#divform").innerHTML += "Votre proposition d'aide a bien été enregistré.<br> <a href='/'>Retourner sur la page d'accueil</a>";
    } else {
      var TitleVar = event.target.title.value;
      var DescriptionVar = event.target.description.value;
      var KeywordsVar = event.target.keywords.value;
      var CoffeeVar = event.target.coffee.value;
      //Session.set('title',TitleVar);
      //console.log(Session.get('title'));
      Session.set('form', {
        title: TitleVar,
        description: DescriptionVar,
        keywords: KeywordsVar,
        coffee: CoffeeVar
      });
      Router.go("/Inscription");
    }

    //Empeche la redirection
    return false;
  }
});

Template.precisedatechoice.helpers({
  // return today's date
  today: function() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    return yyyy + '-' + mm + '-' + dd;
  }

});
