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

      controller.$inject = ["$log"]

      function controller ($log) {
        var vm = this;

      }
}());

(function () {
  'use strict';

    angular.module('myApp')
      .directive('myApp', layoutDirective);

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

      controller.$inject = ["$log"]

      function controller ($log) {
        var vm = this;

      }
}());

(function () {
  'use strict';

    angular.module('myApp')
      .directive('myResume', resumeDirective);

      function resumeDirective() {
        return {
          restrict: 'E',
          scope: {},
          templateUrl: '/partials/resume.html',
          controller: controller,
          controllerAs: 'vm'
        }
      }

      controller.$inject = ["$log"]

      function controller ($log) {
        var vm = this;

      }
}());
