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
         template: "<my-app></my-app>",
      })
      .state('portfolio', {
        parent:'app',
        url:"/",
        templateUrl: "<my-portfolio></my-portfolio>",
     })
      .state('resume', {
        parent:'app',
        url:"/resume",
        templateUrl: "<my-resume></my-resume>",
     })
      .state('about', {
        parent:'app',
        url:"/about",
        templateUrl: "<my-about></my-about>",
     })

      }

}());
