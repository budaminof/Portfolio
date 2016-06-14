(function () {
  'use strict';

    angular.module('myApp')
      .factory('myProjects', projectsFactory);

      projectsFactory.$inject = ["$log"]

      function projectsFactory ($log) {
        let _projects = [
          {
            title: "Panic Button",
            pathState: "panicbutton",
            oneSentence: "Do you undestand what is happening in this class?",
            description: "This app give the teacher a live visualization of the overall undestanding of the students in the class. After being a student at Galvanize we noticed a pattern when students will not speak up in class, and there for the teacher will not know that there is a need to go over some part of the materials. We realized that the problem is in the emberessment of thinking that you are the only one who doesn't undestand. Another problem is- that the teacher might have no idea where in the lecture did he loose his students. The mobile app- build with Ionic, give the students the ability to change thier status of undestanding while is class- and updates the graph of the teacher view, using Sockets.io in real-time. The teacher also have the ability to go back at previouse lecture and see the graph from the lectures. Working on this project was a great oppotunity to work with a great team and pair with different people every day.",
            images : [
              "http://i.imgur.com/zKewK0r.png",
              "http://i.imgur.com/E5aGsVL.png",
              "http://i.imgur.com/scpKxKw.png",
            ],
            imageMobile: "http://i.imgur.com/sr64Dr4.png",
            codeBase: "https://github.com/budaminof/HangTen",
            siteUrl: "https://hangten.herokuapp.com/",
            tech: [
              "AngularJS",
              "Ionic",
              "Sockets.io",
              "Google Charts",
              "JSON Web Token",
              "Hyper Media API",
              "PostgreSQL",
              "Express",
            ]
          },
          {
            title: "HangTen",
            pathState: "hangten",
            oneSentence: "Good photo. Bad crash",
            description: "Angular- Why did we learn jQuery. This AngularJS app, allows users to login/signup, post articles, comments and vote. This was a great processs of learning costume directives and services in Angular, ui-router, JWT, and just how everything comes together. This code went through a lot of refactoring. This project was part of 3 weeks of pair-programming with a great partner, there is nothing more effeciant than 2 brains working together.",
            images : [
              "http://i.imgur.com/zKewK0r.png",
              "http://i.imgur.com/E5aGsVL.png",
              "http://i.imgur.com/scpKxKw.png",
            ],
            imageMobile: "http://i.imgur.com/sr64Dr4.png",
            codeBase: "https://github.com/budaminof/HangTen",
            siteUrl: "https://hangten.herokuapp.com/",
            tech: [
              "AngularJS",
              "JSON Web Token",
              "PostgreSQL",
              "Express",
              "JavaScript"
            ]
          },
          {
            title: "Gnosh",
            pathState: "gnosh",
            oneSentence: "Order food baskets online",
            description: "",
            images : [
              "http://i.imgur.com/qq8UBKW.png",
              "http://i.imgur.com/1H4m3SX.png",
            ],
            codeBase: "https://github.com/budaminof/snack_Basket",
            siteUrl: "https://gnosh.herokuapp.com/",
            tech: [
              "OAuth",
              "PostgreSQL",
              "Knex.Js",
              "Express",
              "JavaScript",
              "jQuery",
              "SendGrid API",
              "Stripe API",
            ]
          },
          {
            title: "Who is Playing Tonight",
            pathState: "whosiplayingtonight",
            oneSentence: "Search for live music you near you",
            description: "My first project.The app allows users to look for live music events, listen to music samples through Sound Cloud and get direction using Google Maps.",
            images : [
              "http://i.imgur.com/O0JrCFZ.png",
              "http://i.imgur.com/tALngG4.png"
            ],
            imageMobile: "http://i.imgur.com/dbSWOkJ.png",
            codeBase: "https://github.com/budaminof/WhoIsPlayingTonight",
            siteUrl: "https://whoisplayingtonight.firebaseapp.com/",
            tech: [
              "Google Maps API",
              "Sound Cloud API",
              "Bandsintown API",
              "JavaScript",
              "jQuery",
            ]
          },


        ]

        return {
          projects: _projects,
          getProject: getProject,
        }

        function getProject (pathState) {
          for (var i = 0; i < _projects.length; i++) {
            if (_projects[i].pathState == pathState) return _projects[i];
          }
        }

      }


}());
