'use strict';

angular.module('myApp.loadData', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/load-data', {
    templateUrl: 'loadData/load-data.html',
    controller: 'LoadDataCtrl'
  });
}])

.controller('LoadDataCtrl', [function() {

}]);