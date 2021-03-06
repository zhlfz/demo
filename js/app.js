// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        })
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive

            .state('demo', {
                url: '/demo',
                templateUrl: 'templates/demo.html',
                controller: 'DemoCtrl'
            })

            .state('list', {
                url: "/list",
                templateUrl: "templates/list.html",
                controller: 'ListCtrl'
            })

            .state('news', {
                url: '/news',
                templateUrl: 'templates/news.html',
                controller: 'NewsCtrl'
            })
            .state('newsDetail', {
                url: '/newsDetail/:id',
                templateUrl: 'templates/newsDetail.html',
                controller: 'NewsDetailCtrl'
            })
            .state('actionSheet', {
                url: '/actionSheet',
                templateUrl: 'templates/actionSheet.html',
                controller: 'ActionSheetCtrl'
            })
            .state('img', {
                url: '/img/{url:[\S\s]*?}',
                templateUrl: 'templates/img.html',
                controller: 'ImgCtrl'
            })
            .state('form', {
                url: '/form',
                templateUrl: 'templates/form.html',
                controller: 'FormCtrl'
            })
            .state('card', {
                url: '/card',
                templateUrl: 'templates/card.html',
                controller: 'CardCtrl'
            })
            .state('tab', {
                url: '/tab',
                templateUrl: 'templates/tab.html',
                controller: 'TabCtrl'
            })
            .state('nav', {
                url: '/nav',
                templateUrl: 'templates/navigation.html',
                controller: 'NavCtrl'
            })

        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/demo');

    });