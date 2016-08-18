(function() {
  'use strict';

  var dependecies = [
    'ngAnimate',
    'ui.router',
  ]

  angular.module('myApp', dependecies)
  .config(setUpRoutes)


  setUpRoutes.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider'
  ];

  function setUpRoutes($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('app', {
      abstract: true,
      template: "<my-layout></my-layout>",
    })
    .state('portfolio', {
      parent: 'app',
      url:"/",
      template: "<my-portfolio></my-portfolio>",
    })
    .state('project', {
      parent: 'app',
      url:"/projects/:name",
      template: "<my-project></my-project>",
    })
    .state('about', {
      parent: 'app',
      url:"/about",
      template: "<my-about></my-about>",
    })

  }

}());

  (function () {
  'use strict';

    angular.module('myApp')
      .directive('myAbout', aboutDirective);

      function aboutDirective() {
        return {
          restrict: 'E',
          scope: {},
          templateUrl: '/partials/about.html',
          controller: controller,
          controllerAs: 'vm'
        }
      }

      controller.$inject = ["$log", "myProjects", "$state"]

      function controller ($log, myProjects, $state) {
        

      }
}());

(function () {
  'use strict';

  angular.module('myApp')
  .directive('myLayout', layoutDirective);

  function layoutDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/partials/layout.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ["$log"]

  function controller ($log) {
    var vm = this;
    vm.showNav = false;
    vm.toggleMenu = toggleMenu;

    function toggleMenu () {
      return vm.showNav = !vm.showNav;
    }

  }

}());

  (function () {
  'use strict';

    angular.module('myApp')
      .directive('myPortfolio', portfolioDirective);

      function portfolioDirective() {
        return {
          restrict: 'E',
          scope: {},
          templateUrl: '/partials/portfolio.html',
          controller: controller,
          controllerAs: 'vm'
        }
      }

      controller.$inject = ["$log", "myProjects", "$state"]

      function controller ($log, myProjects, $state) {
        var vm = this;
        vm.projects = myProjects.projects;

      }
}());

  (function () {
  'use strict';

    angular.module('myApp')
      .directive('myProject', projectDirective);

      function projectDirective() {
        return {
          restrict: 'E',
          scope: {},
          templateUrl: '/partials/project.html',
          controller: controller,
          controllerAs: 'vm'
        }
      }

      controller.$inject = ["$log", "myProjects", "$state"]

      function controller ($log, myProjects, $state) {
        var vm = this;
        vm.show = true;
        vm.project = myProjects.getProject($state.params.name);
        if(vm.project.pathState == "pomodoro") {
          vm.show = false;
        }
      }
}());

(function () {
  'use strict';

    angular.module('myApp')
      .factory('myProjects', projectsFactory);

      projectsFactory.$inject = ["$log"]

      function projectsFactory ($log) {
        var _projects = [
          {
            title: "Pomodoro",
            pathState: "pomodoro",
            oneSentence: "Time management Ionic app, accessing the phone using Cordova",
            description: "This app is based on the time management pomodoro method developed by Francesco Cirillo in the late 1980s. During my time at Galvanize I found myself working on tasks without taking any breaks for hours. I was introduced to the pomodoro method by one of my teachers, but I knew I needed something extra to force me to leave my chair.",
            myExperience: "Using Cordova I was able to access the accelerometer of the phone, and make the phone vibrate until the user move and step around the room. The Pomodoro app keeps track of how many pomodoros have you accomplished and display the last week in a graph- using Angular Charts.",
            images : [
              'images/steps-fullscreen.png',
            ],
            imageMobile: [
              'images/pomodoro1.png',
              'images/pomodoro2.png',
              'images/pomodoro3.png',
              // 'images/pomodoro4.png',
              'images/pomodoro5.png',
              'images/pomodoro6.png',
            ],
            codeBase: "https://github.com/budaminof/pomodoro-v4",
            // siteUrl: "https://budaminof.com/projects/pomodoro",
            tech: [
              "Ionic",
              "Cordova",
              "AngularJS",
              "Node.JS",
              "Knex.JS"
            ],
          },
          {
            title: "HangTen",
            pathState: "hangten",
            oneSentence: "Surf Spots, single-page application",
            description: "Angular- Why did we learn jQuery?! This single-page application, allows users to login/signup, vote on articles, post articles and leave comments. We build this app following John Papa style guide, using component-based architecture and implementing the Revealing Module Pattern. I created RESTful API server using Node.js and Express.",
            myExperience: "This project started its life as a great two weeks of pair programming, which became my favorite approach to coding.",
            images : [
              "images/hangten.png",
              "images/hangten3.png",
              "images/hangten2.png",
            ],
            imageMobile: [
              "images/hangtenMobile.png"
            ],
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
            title: "Grasp",
            pathState: "grasp",
            oneSentence: "Do you undestand what is happening in this class?",
            description: "This is an app for students and teachers. Grasp gives teachers a live visualization of the overall level of student understanding, and gives the students the ability to anonymously communicate their level of understanding with the teacher in real-time. With this real-time data teachers can gauge exactly where in the lecture students struggle. The mobile app, build with Ionic, lets students change the status of their comprehension during a lecture, which updates a graph in the teacher’s view, using Sockets.io. The teacher also has the ability to review graphs from previous lectures. If you want to login and look around, user name: 'user2@example.com', password: 'password'.",
            myExperience: "We developed this app over one week using Agile methodologies adapted to fit with our shortened time frame. Starting our day with stand-up, going through iteration meetings and staying focus on user-stories helped us stay on top of every issue, while each pair worked on a different part of the app.",
            images : [
              "images/grasp.png",
              "images/grasp2.png",
              "images/grasp5.png",
              "images/grasp3.png",
              "images/grasp4.png",
            ],
            imageMobile: [
              "images/graspMobile1.png",
              "images/graspMobile2.png",
              "images/graspMobile3.png",
              "images/graspMobile4.png",
            ],
            codeBase: "https://github.com/budaminof/panic-button",
            siteUrl: "https://grasp-app.firebaseapp.com",
            tech: [
              "AngularJS",
              "Ionic",
              "Sockets.io",
              "Google Charts",
              "JSON Web Token",
              "Hypermedia API",
              "PostgreSQL",
              "Express",
            ]
          },
          {
            title: "Gnosh",
            pathState: "gnosh",
            oneSentence: "Express application, Order food baskets",
            description: "This was my first group project, we built this app in 5 days and I was responsible for the back end. I used Passport for OAuth and authentication. I planned our database using entity relationship diagram and built SQL queries using Knex.",
            images : [
              "images/gnosh.png",
              "images/gnosh2.png",
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
            oneSentence: "Front End application, Search for live music",
            description: "This app solves a few problems that happen when you want to see live music. Usually, you will have at least 3 tabs open: one or more for a list of events, one with a music sample so you can decide if are you really going to listen to this band  for an hour, and another tab for directions. In this app, you can do all of this dance on one page. I think that this is pretty good for a first project.",
            images : [
              "images/playing.png",
              "images/playing2.png",
            ],
            imageMobile: [
              "images/playingMobile.png"
              ],
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
