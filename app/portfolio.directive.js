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
