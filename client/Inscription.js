import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';

Template.Inscription.onCreated(function(){
  this.mail_available = new ReactiveVar(false);
  this.pseudo_available = new ReactiveVar(false);
});

Template.Inscription.helpers({
});

Template.Inscription.events({
  'submit':function(event,instance){
    Meteor.call('isEmailInSystem',{email : document.getElementById("email").value},(error,result) => {instance.mail_available.set(result);});
    Meteor.call('isUserInSystem',{user : document.getElementById("pseudo").value},(error,result) => {instance.pseudo_available.set(result);});

    //Cas ou le pseudo et le mail sont disponible et qu'un nouvel utilisateur peut etre créer
    if(instance.mail_available.get() && instance.pseudo_available.get()){
      //Ajouter check forme password si voulu

        Accounts.createUser({username:document.getElementById("pseudo").value, email:document.getElementById("email").value, password:document.getElementById("psw").value});
        instance.find("#divform").innerHTML = null;
        instance.find("#divform").innerHTML += "Un email vous a été envoyé pour confirmer votre inscription.";
        // Envoyer mail

    //Cas ou le pseudo et le mail sont déjà utilisé
    }else if(!instance.mail_available.get() && !instance.pseudo_available.get()){
      Meteor.call('UserEmailCorrect',{email : document.getElementById("email").value, username : document.getElementById("pseudo").value},(error,result)=>{
        //Cas ou le pseudo correspond bien à l'email
        if(result){
          // Gestion de mauvais mot de passe a add
          Meteor.loginWithPassword(document.getElementById("pseudo").value,document.getElementById("psw").value,(error)=>{
            if(!error){
              instance.find("#error").innerHTML = null;
              instance.find("#divform").innerHTML = null;
              instance.find("#divform").innerHTML += "Votre proposition d'aide a bien été enregistré.<br> <a href='/'>Retourner sur la page d'accueil</a>";
            }else{
              //A géré les autres erreurs
              document.getElementById("psw").value = "";
                instance.find("#error").innerHTML = null;
                instance.find("#error").innerHTML += "Mot de passe incorrect.<br>";

            }});

        // Cas ou le pseudo ne correspond pas a l'email
        }else{
          instance.find("#error").innerHTML = null;
          instance.find("#error").innerHTML += "Le pseudo et l'email ne correspondent pas.<br>";
          document.getElementById("psw").value = "";
        }
        })
    //Cas ou rien ne va
    }else{
      instance.find("#error").innerHTML = null;
      instance.find("#error").innerHTML += "Le pseudo, l'email ou le mot de passe sont incorrect ou déjà utilisé.<br>";

    }

    // TODO AJOUT FONCTION D AJOUT DANS LA COLLECTION

    //Empeche la redirection
    return false;
  }
});
