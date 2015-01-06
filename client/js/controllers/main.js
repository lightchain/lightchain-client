"use strict";
var app = angular.module('light', ['ng', 'ngRoute', 'ui.bootstrap','angular-websocket', 'mongolabResourceHttp', 'ngResource']);

app.config(function(WebSocketProvider){
    WebSocketProvider
      .prefix('')
      .uri('wss://localhost:8080/:443');
  });
  
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/login.html', controller: 'AppCtrl'}).
      when('/wallet', {templateUrl: 'views/dashboard.html', controller: 'AppCtrl'}).
      when('/about', {templateUrl: 'about.html', controller: 'AppCtrl'}).
      otherwise({redirectTo: '/'
      });
  }]);



// a factory for MongoLabs API

app.constant('MONGOLAB_CONFIG',{API_KEY:'61NBcxBNiYmYAh3FihmJaX4WDa03425W', DB_NAME:'lightchain'});


app.controller('AppCtrl', ['$scope', '$network', '$vaultClient',
    function ($scope, $network, $vaultClient) {
   
      setTimeout(function() {
    var el = document.getElementById("first");
    angular.element(el).triggerHandler("click");
    },0);


  $scope.logout = function(){
    window.location.assign("/");
  }
      


    }]);
    
    
    
    