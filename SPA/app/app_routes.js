"use strict"

angular.module('myApp', ['ui.router', 'ngMap', 'ui.bootstrap', 'ngStorage'])
.constant('myConfig', {
        'baseUrl': 'http://localhost:3000/api/v1/',
        'APIKEY': 'JC62T86KLI4TVYV7WBA8UBM0NBU8CN'
    })
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('all', {
            url: '/',
            templateUrl: 'app/components/home/home.html',
            resolve: {
                event: function(HomeFactory){
                    return HomeFactory.getEvents();
                },
                tags: function(TagFactory){
                    return TagFactory.getTags();
                }
            },
            controller: 'HomeController',
            authenticate: false
        })
        .state('tag', {
            url: '/tag/:id',
            templateUrl: 'app/components/home/home.html',
            resolve: {
                tag: function(TagFactory, $stateParams, $q){
                    return TagFactory.getOneTag($stateParams.id)
                },
                tags: function(TagFactory, $stateParams){
                    return TagFactory.getTags();
                },
                tagEvents: function(TagFactory, $stateParams){
                    return TagFactory.getEventsOnTag($stateParams.id);
                }
            },
            controller: 'TagDetailController',
            authenticate: false
        })
        .state('search',{
            url: '/events/:query',
            templateUrl: 'app/components/home/home.html',
            resolve: {
                tags: function(TagFactory, $stateParams){
                    return TagFactory.getTags();
                },
                events: function(HomeFactory, $stateParams){
                    return HomeFactory.getEventsBySearch($stateParams.query);
                }
            },
            controller: 'EventQuery',
            authenticate: false
        })
        .state('add',{
            url: '/add_pub/',
            templateUrl: 'app/components/create/add_pub.html',
            resolve: {
                tags: function(TagFactory){
                    return TagFactory.getTags();
                }
            },
            controller: 'createPubController',
            authenticate: true
        })
        .state('handle', {
            url: '/handle_pubs/',
            templateUrl: 'app/components/handle_pubs/handle_pubs.html',
            resolve: {
                events: function(HomeFactory){
                    return HomeFactory.getEventsByCreator();
                }
            },
            controller: 'handlePubController',
            authenticate: true
        })
        .state('edit', {
            url: '/edit_pub/:id',
            templateUrl: 'app/components/edit_pub/edit_pubs.html',
            resolve: {
                oneEvent: function(HomeFactory, $stateParams){
                    return HomeFactory.getEventOnId($stateParams.id);
                },
                tags: function(TagFactory){
                    return TagFactory.getTags();
                }
            },
            controller: 'editPubController',
            authenticate: true
        })
        .state('login', {
            url: '/login/',
            templateUrl: 'app/components/login/login.html',
            controller: 'loginController',
            authenticate: false
        })
        .state('logout', {
            url: '/',
            controller: 'logoutController',
            authenticate: false
        })
}])
.run(function($rootScope, $location, $state, LoginFactory){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !LoginFactory.getAuthentication()) {
        $state.transitionTo("all");
        event.preventDefault();
    }
    });

    $rootScope.isLoggedIn = false;
});
