angular.module('sourceData').controller('sourceDataController', ['$scope', function($scope){
  $scope.data = "My data";

  $scope.list = [{display: "One", value: 1}, {display: "Two", value: 2}];

  $scope.getListSize = function() {
    return $scope.list.length;
  }

  $scope.addItem = function() {
    $scope.list.push({display:$scope.formDisplay, value:$scope.formValue});
    $scope.formDisplay = '';
    $scope.formValue = '';
  };
}]);