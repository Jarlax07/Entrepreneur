import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

Template.Proposer.onCreated(function(){
  this.creneau = new ReactiveVar(false);
  this.precis = new ReactiveVar(false);
  this.nbcreneau = new ReactiveVar(0);
});

Template.Proposer.helpers({
  creneau:function(){
    return Template.instance().creneau.get();
  },
  precis:function(){
    return Template.instance().precis.get();
  },
});

Template.Proposer.events({
  'click .creneau': function(event, instance){
    instance.creneau.set(true);
    instance.precis.set(false);
    instance.nbcreneau.set(1);
    document.getElementById("choix1").checked = true;
    document.getElementById("choix2").checked = false;
  },
  'click .precis': function(event,instance){
    instance.creneau.set(false);
    instance.precis.set(true);
    document.getElementById("choix1").checked = false;
    document.getElementById("choix2").checked = true;
  },
  'click .add':function(event,instance){
    instance.nbcreneau.set(instance.nbcreneau.get()+1);
    var field = "<br>Le <select name='creneau"+instance.nbcreneau.get()+"' size='1'><option>Lundi</option><option>Mardi</option><option>Mercredi</option><option>Jeudi</option><option>Vendredi</option><option>Samedi</option><option>Dimanche</option></select> de <input type='time' name='starthour'> à <input type='time' name='endhour'>";
    instance.find("#newcreneau").innerHTML += field;
  },
  'click .submit':function(event,instance){
    Session.set("template_name","Coordonnees");
  }
});

Template.precisedatechoice.helpers({
  today:function(){
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();

    if(dd<10) {
      dd = '0'+dd
    }

    if(mm<10) {
      mm = '0'+mm
    }

    return yyyy + '-' + mm + '-' + dd;
  }
});
