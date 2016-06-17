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
        vm.project = myProjects.getProject($state.params.name);

      }
}());

(function () {
  'use strict';

    angular.module('myApp')
      .factory('myProjects', projectsFactory);

      projectsFactory.$inject = ["$log"]

      function projectsFactory ($log) {
        let _projects = [
          {
            title: "Grasp",
            pathState: "grasp",
            oneSentence: "Do you undestand what is happening in this class?",
            description: "This is an app for students and teachers. Grasp gives teachers a live visualization of the overall level of student understanding, and gives the students the ability to anonymously communicate their level of understanding with the teacher in real-time. With this real-time data teachers can gauge exactly where in the lecture students struggle. The mobile app, build with Ionic, lets students change the status of their comprehension during a lecture, which updates a graph in the teacher’s view, using Sockets.io. The teacher also has the ability to review graphs from previous lectures. ",
            myExperience: "We developed this app over one week using Agile methodologies adapted to fit with our shortened time frame. Starting our day with stand-up, going through iteration meetings and staying focus on user-stories helped us stay on top of every issue, while each pair worked on a different part of the app.",
            images : [
              // "http://i.imgur.com/K13azQF.png",
              // // "http://i.imgur.com/tHk4xoJ.png",
              // "http://i.imgur.com/yysRk1E.png",
              // "http://i.imgur.com/c2z0Fou.png",
              // "http://i.imgur.com/E9vc0sL.png",
              "images/grasp.png",
              "images/grasp2.png",
              "images/grasp3.png",
              "images/grasp4.png",
            ],
            imageMobile: [
              "http://i.imgur.com/FpEeXLf.png",
              "http://i.imgur.com/T26qw7I.png",
              "http://i.imgur.com/Fnb93iX.png",
              "http://i.imgur.com/mSWp0Pm.png",
            ],
            codeBase: "https://github.com/budaminof/panic-button",
            siteUrl: "https://grasp-app.firebaseapp.com",
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
              // "http://i.imgur.com/zKewK0r.png",
              // "http://i.imgur.com/E5aGsVL.png",
              // "http://i.imgur.com/scpKxKw.png",
              "images/hangten.png",
              "images/hangten3.png",
              "images/hangten2.png",
            ],
            imageMobile: [
              "http://i.imgur.com/sr64Dr4.png"
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
            title: "Gnosh",
            pathState: "gnosh",
            oneSentence: "Order food baskets online",
            description: "Food basket delivered to your door. This app allows users to create their food basket and have them delivered to their homes. This was the first time I worked on a team. We used table relationship diagram to start, and learned how to adjust and pivote as needed. We learned that working until 2am is awesome- but not sustainable. I worked mainly on OAuth, database calls using Knex.",
            images : [
              // "http://i.imgur.com/qq8UBKW.png",
              // "http://i.imgur.com/1H4m3SX.png",
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
            oneSentence: "Search for live music you near you",
            description: "My first project. If I could only do everything that I wanted in those 4 days. This app solves a few problems when you try to decide where to go see live music tonight. Usually- you will have at least 3 tabs open: one or more for list on events, one to listen to music sample so you can decide if are you really going to listen to this for an hour and a half, and another tab for direction (if its a nice band but 40min drive and 25min looking for parking that is a-no-go for me). In this app- you can do all of this dance on one page. I think that this is pretty good for a first project.",
            images : [
              // "http://i.imgur.com/O0JrCFZ.png",
              // "http://i.imgur.com/tALngG4.png",
              "images/playing.png",
              "images/playing2.png",
            ],
            imageMobile: ["http://i.imgur.com/dbSWOkJ.png"],
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
