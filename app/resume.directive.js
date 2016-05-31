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
