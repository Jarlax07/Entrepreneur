import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  FakeList = new Mongo.Collection('FakeList');
  // This line won't complete until the insert is done
  FakeList.insert(
  {
    "1" : [
    {"Name" :
        "Julien"},
    {"LastName" :
        "Courtial"},
    {"Title" :
        "Conseils meteor"},
    {"Description" :
        "Je vous propose des conseils sur le Framework meteor pour apprendre à faire des sites web"}
    ],
    "2" : [
    {"Name" :
        "Vincent"},
    {"LastName" :
        "Aubert"},
    {"Title" :
        "Cours Piano"},
    {"Description" :
        "Je vous propose des cours de piano pour apprendre la base du solfège et pouvoir jouer. Débutants uniquement."}
    ]
  });

  // So this line will return something
  const search = FakeList.findOne({"Name": "Julien"});
  // Look ma, no callbacks!
  console.log(2);
  console.log(todo);
});
