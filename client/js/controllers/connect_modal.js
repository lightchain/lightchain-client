"use strict";
app.controller('connect_modalCtrl',
function ($scope, $modal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'connect_modal.html',
      controller: 'Instance',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

app.controller('Instance', function ($scope, $modalInstance, items, $MongoDB) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $MongoDB.remove

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
    $MongoDB.create()
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});