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
    .state('resume', {
      parent: 'app',
      url:"/resume",
      template: "<my-resume></my-resume>",
    })
    .state('about', {
      parent: 'app',
      url:"/about",
      template: "<my-about></my-about>",
    })

  }

}());
