(function() {
  'use strict';

  var dependecies = [
    'ngAnimate',
    'ui.router',
    'angular-scroll-animate'
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

'use strict';
angular.module('angular-scroll-animate', []);// Source: src/angular-scroll-animate.js
/**
 * @ngdoc directive
 * @name angular-scroll-animate.directive:when-visible
 * @restrict A
 * @param {string} when-not-visible function to execute when element is scrolled into viewport
 * @param {string=} when-not-visible function to execute when element is scrolled out of viewport
 * @param {delayPercent=} percentage (of px) to delay animate when visible transition.
 * @param {bindScrollTo=} override default scroll event binding to another parent container.
 *
 * @description
 * Allows method hooks into the detection of when an element is scrolled into or out of view.
 *
 * @example
 * <example module="angular-scroll-animate">
 *   <file name="index.html">
 *     <div ng-controller="ExampleCtrl">
 *       <div class="car" when-visible="animateIn" when-not-visible="animateOut">Broom</div>
 *     </div>
 *   </file>
 *   <file name="controller.js">
 *   angular.module('example', []).controller('ExampleCtrl', function($scope) {
 *
 *     $scope.animateIn = function($el) {
 *       $el.removeClass('hidden');
 *       $el.addClass('fadeIn');
 *     };
 *
 *     $scope.animateOut = function($el) {
 *      $el.addClass('hidden');
 *       $el.removeClassClass('fadeIn');
 *     };
 *   });
 *
 *   </file>
 *   <file name="animations.css">
 *     .hidden { visibility: hidden; }
 *     .fadeIn { transition: all 300ms ease-in 2s; }
 *   </file>
 * </example>
 */
angular.module('angular-scroll-animate', []).directive('whenVisible', ['$document', '$window',
 function($document, $window) {

    var determineWhereElementIsInViewport =
      function($el, viewportHeight, whenVisibleFn, whenNotVisibleFn, delayPercent, scope) {

        var elementBounds = $el[0].getBoundingClientRect();

        var panelTop = elementBounds.top;
        var panelBottom = elementBounds.bottom;

        // pixel buffer until deciding to show the element
        var delayPx = delayPercent * elementBounds.height;

        var bottomVisible = (panelBottom - delayPx > 0) && (panelBottom < viewportHeight);
        var topVisible = (panelTop + delayPx <= viewportHeight) && (panelTop > 0);

        if ($el.data('hidden') && bottomVisible || topVisible) {
          whenVisibleFn($el, scope);
          $el.data('hidden', false);
        }

        // scrolled out from scrolling down or up
        else if (!($el.data('hidden')) && (panelBottom < 0 || panelTop > viewportHeight)) {
          whenNotVisibleFn($el, scope);
          $el.data('hidden', true);
        }
      };

    return {
      restrict: 'A',
      scope: {
        whenVisible: '&',
        whenNotVisible: '&?',
        delayPercent: '=?',
        bindScrollTo: '@?'
      },

      controller: ['$scope', function(scope) {
        if (!scope.whenVisible || !angular.isFunction(scope.whenVisible())) {
          throw new Error('Directive: angular-scroll-animate \'when-visible\' attribute must specify a function.');
        }

        if (scope.whenNotVisible && !angular.isFunction(scope.whenNotVisible())) {
          throw new Error('Directive: angular-scroll-animate \'when-not-visible\' attribute must specify a function.');
        }
        else if (!scope.whenNotVisible) {
          scope.whenNotVisible = function() {
            return angular.noop;
          };
        }

        if (scope.delayPercent) {

          var delayPercent = parseFloat(scope.delayPercent);

          if (!angular.isNumber(delayPercent) || (delayPercent < 0 || delayPercent > 1)) {
            throw new Error('Directive: angular-scroll-animate \'delay-percent\' attribute must be a decimal fraction between 0 and 1.');
          }
        }
    }],

      link: function(scope, el, attributes) {

        var delayPercent = attributes.delayPercent || 0.25; // lower = more eager to hide / show, higher = less eager
        var document = $document[0].documentElement;
        var checkPending = false;

        var updateVisibility = function() {
          determineWhereElementIsInViewport(el, document.clientHeight /* viewportHeight */ ,
            scope.whenVisible(), scope.whenNotVisible(), delayPercent, scope);

          checkPending = false;
        };

        var onScroll = function() {

          if (!checkPending) {
            checkPending = true;

            /* globals requestAnimationFrame */
            requestAnimationFrame(updateVisibility);
          }
        };

        var documentListenerEvents = 'scroll';

        /* allows overflow:auto on container element to animate for Safari browsers */
        if (attributes.bindScrollTo) {
          angular.element($document[0].querySelector(attributes.bindScrollTo)).on(documentListenerEvents, onScroll);
        }

        /* always bind to document scroll as well - works for overflow: auto on Chrome, Firefox browsers */
        $document.on(documentListenerEvents, onScroll);

        scope.$on('$destroy', function() {
          $document.off(documentListenerEvents, onScroll);
        });

        var $elWindow = angular.element($window);
        var windowListenerEvents = 'resize orientationchange';
        $elWindow.on(windowListenerEvents, onScroll);

        scope.$on('$destroy', function() {
          $elWindow.off(windowListenerEvents, onScroll);
        });

        // initialise
        el.data('hidden', true);
        scope.$evalAsync(onScroll);
      }
    };
 }]);

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

(function () {
  'use strict';

    angular.module('myApp')
      .factory('myProjects', projectsFactory);

      projectsFactory.$inject = ["$log"]

      function projectsFactory ($log) {
        var _projects = [
          {
            title: "How Twitter Feels",
            pathState: "howtwitterfeels",
            oneSentence: "Ask the Twitterverse how it feels about _____",
            description: "How do you determine in real time how people feel about a particular topic? You ask Twitter of course.",
            myExperience: "This Redux app uses live data from the Twitter API, and passes it through the IBM API for sentiment analysis. By using Sockets.io to connect to the global sentiment data the radar graph for simplistic visualisation of the Twitterspheres mood is actually live and moving.",
            images : [
              'images/twitter1.png',
              'images/twitter3.png',
            ],
            imageMobile: [
              'images/twitterMobile1.jpg',
              'images/twitterMobile2.jpg',
            ],
            codeBase: "https://github.com/budaminof/How-Twitter-Feels",
            siteUrl: "https://howtwitterfeels.herokuapp.com/",
            tech: [
              "React",
              "Redux",
              "Sockets.io",
              "Node.JS",
              "Webpack"
            ],
          },
          {
            title: "Pomodoro",
            pathState: "pomodoro",
            oneSentence: "Your personal productivity nag",
            description: "This productivity app is based on the Pomodoro Technique of breaking one’s work day into twenty five minute intervals punctuated with short, timed breaks. I built this app to “nag” me into the Pomodoro Technique to improve my productivity and health – it works!",
            myExperience: "Using Cordova I was able to access the accelerometer of the phone and make the phone vibrate until the user moves more than five meters – the international standard for daily sanity. This Pomodoro app tracks how many intervals a user completed and displays the previous seven days in graph format using Angular Charts.",
            images : [
              'images/steps-fullscreen.png',
            ],
            imageMobile: [
              'images/pomodoro1.png',
              'images/pomodoro2.png',
              'images/pomodoro3.png',
              'images/pomodoro4.png',
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
            oneSentence: "Crowd-powered surf wisdom",
            description: "A great surf day is all about having the right data. I selfishly built this app to lever some crowd wisdom to optimise for tides, winds, pollution, and beach access in my favorite surf towns.",
            myExperience: "This Single Page Application, allows users to login/register, vote on articles, post articles and leave comments. I built this app following the John Papa style guide, using component-based architecture and implementing the Revealing Module Pattern. I created the RESTful API server using Node.js and Express.",
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
            oneSentence: "Who understands what’s happening in this class?",
            description: "Grasp is a mobile app that allows students to anonymously communicate their lesson comprehension in real-time and visually communicates that aggregated information to the teacher to alert them when students are falling behind. The mobile app, built with Ionic, lets students change the status of their comprehension during a lecture, which updates a graph in the teacher’s view, using Sockets.io. The teacher also has the ability to review graphs from previous lectures.",
            myExperience: "My team at Galvanize developed this app in a five day sprint using Agile methodologies. We started everyday with a stand-up, went through iteration meetings and stayed focused on user-stories to help us stay on top of every issue.",
            access: "Access here: user2@example.com/password.",
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
            oneSentence: "Easy snack ordering for the dietarily challenged",
            description: "Gnosh is the app for people with dietary restrictions who want to order healthy snack baskets online. Users can assemble custom snack baskets based on tags related to major food allergies and diets du jour, login/register and save these baskets for future ordering.",
            myExperience: "My role in this group project was planning our database using entity relationship diagram and building SQL queries using Knex.",
            images : [
              "images/gnosh.png",
              "images/gnosh2.png",
              "images/gnosh3.png",
              "images/gnosh4.png",
              "images/gnosh5.png"
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
            oneSentence: "Search and listen to live music near you tonight",
            description: "WPT solves the timeless problem of determining not only what artists are playing,  but what do they sound like, is it sold out, how far is it from me now and how do I get there?",
            myExperience: "My debut app used Google Map API, Sound Cloud API, Javascript and jQuery.",
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
