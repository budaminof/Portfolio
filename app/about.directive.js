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

      controller.$inject = ["$log", "myProjects", "$state", "$window"]

      function controller ($log, myProjects, $state, $window) {
        var vm = this;
        var smallWindow = ($window.innerWidth < 960) ? true : false;

        vm.animateElementIn = function($el) {
          $el.removeClass('not-visible');
          if (smallWindow) $el.addClass('animated fadeIn');
          else $el.addClass('animated fadeInUp');
        };

        vm.animateElementInBottom = function($el) {
          $el.removeClass('not-visible');
          $el.addClass('animated fadeIn');
        };

        vm.animateElementOut = function($el) {
          $el.addClass('not-visible');
          $el.removeClass('animated fadeInUp fadeIn');
        };
      }
}());
