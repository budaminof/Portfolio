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

      controller.$inject = ["$log", "myProjects", "$state"];

      function controller ($log, myProjects, $state) {
        var vm = this;
        vm.projects = myProjects.projects;

        vm.animateElementIn = function($el) {
          $el.removeClass('not-visible');
          $el.addClass('animated fadeIn');
        };

        vm.animateElementOut = function($el) {
          $el.addClass('not-visible');
          $el.removeClass('animated fadeIn');
        };
      }
}());
