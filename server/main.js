import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup

});

Meteor.methods({
  //Verifie si le mail passé en paramètre est déjà utilisé
  //Retourne faux si le mail passé en paramètre est déjà utilisé et vrai sinon
  isEmailInSystem:function(data) {
    if(!data.email){
      throw new Meteor.Error('invalid data');
    }
      if(Accounts.findUserByEmail(data.email)){
        return false;
      }else{
        return true;
      }
    },
    //Verifie si le pseudo passé en paramètre est déjà utilisé
    //Retourne faux si le pseudo passé en paramètre est déjà utilisé et vrai sinon
    isUserInSystem:function(data) {
      if(!data.user){
        throw new Meteor.Error('invalid data');
      }
      if(Accounts.findUserByUsername(data.user)){
        return false;
      }else{
        return true;
      }
    },
    //Retourne vrai si le mail passé en paramètre correspond a le pseudo passé en param
    UserEmailCorrect:function(data){
      return Accounts.findUserByEmail(data.email).username==data.username;
    }
});
