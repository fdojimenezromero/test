  angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('menu.home', {
    url: '/home/:userId',
    views: {
      'side-menu21': {
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.newCrash', {
    url: '/newCrash',
    views: {
      'side-menu21': {
        templateUrl: 'js/newCrash/newCrash.html',
        controller: 'newCrashCtrl'
      }
    }
  })

  .state('menu.listCrash', {
    url: '/list',
    views: {
      'side-menu21': {
        templateUrl: 'js/listCrash/listCrash.html',
        controller: 'listCrashCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'js/menu/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'js/login/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/login')



});
