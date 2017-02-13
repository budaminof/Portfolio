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
