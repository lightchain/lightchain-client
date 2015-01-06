"use strict";

app.service('$vaultClient', ['$rootScope', function($scope)
{
  this.vaultClient = new ripple.VaultClient();
}]);