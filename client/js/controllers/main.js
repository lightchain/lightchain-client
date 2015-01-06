"use strict";
var app = angular.module('light', ['ng', 'ngRoute', 'ui.bootstrap', 'angularSpinner', 'mongolabResourceHttp', 'ngResource']);
/*
app.config(function(WebSocketProvider){
    WebSocketProvider
      .prefix('')
      .uri('');
  });*/
  
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/dashboard.html', controller: 'AppCtrl'}).
      when('/wallet', {templateUrl: 'wallet.html', controller: 'WalletCtrl'}).
      when('/about', {templateUrl: 'about.html', controller: 'AppCtrl'}).
      otherwise({redirectTo: '/'
      });
  }]);



// a factory for MongoLabs API

//app.constant('MONGOLAB_CONFIG',{API_KEY:'_5sK-6UJIaR72iqjdI0lHAo7l90nA9yp', DB_NAME:'basicincome_co'});


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
    
    
    
    