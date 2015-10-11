'use strict';

angular.module('myApp.loadData', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/load-data', {
    templateUrl: 'loadData/load-data.html',
    controller: 'LoadDataCtrl'
  });
}])

.controller('LoadDataCtrl', ['$scope', function($scope) {

$scope.readCsv = function() {
		var file = document.getElementById('file').files[0]
        Papa.parse(file, {
          header: true,
          worker: true,
          preview: 5,
          step: function(results) {
            console.log("Row:", results);
          }
        });
      };

$scope.getData = function() {
		var file = document.getElementById('file').files[0]
        Papa.parse(file, {
          header: true,
          //preview: 1,
          complete: function(results) {
			var metaData = []
			results.meta.fields.forEach(function(h) {
				metaData.push({'name': h, 'dataType': null})		
			});
			$scope.$apply(function(){
				$scope.metaData = metaData;
				$scope.data = results.data;
			});	            
          }
        });
      };

$scope.logisticRegression = function() {
getPoints();
var w = []
for(var i=0; i < $scope.points[0].x.length; i++) {
	w.push(Math.random());
}
/*
for i in range(10):
    gradient = points.map(
        lambda p: (1 / (1 + exp(-p.y*(w.dot(p.x)))) - 1) * p.y * p.x
    ).reduce(lambda a, b: a + b)
    w -= gradient
print "Final separating plane: %s" % w*/
var grad;
for(var i = 0; i < 10; i++) {
	grad = $scope.points.map(function(p) {
		return scalarMult(-p.y*(1 / (1 + Math.exp(-p.y*(dot(w, p.x)))) - 1), p.x)
	}).reduce(function(a,b) {return a + b;})	
	vectorSum(w, grad);
}

var score = function(x) {
	return Math.round(1/(1 + Math.exp(dot(w, x))));
}

var scores = []
$scope.points.forEach(function(p) {scores.push(score(p.x));})

console.log(scores);
}

var getPoints = function() {
	$scope.points = [];
	var y;
	$scope.data.forEach(function(row) {
		var entries = [];
		$scope.metaData.forEach(function(col) {
			if(col.dataType == 'number') {
				entries.push(parseFloat(row[col.name]));
			}

			if(col.dataType == 'target') {
				y = parseInt(row[col.name]);
			}
		});
		$scope.points.push({x: entries, y: y});		
	});
}

var scalarMult = function(a, x) {
	var result = []
	x.forEach(function(xi) {
		result.push(a*xi);
	})
	return result;
}

var vectorSum = function(w, g) {
	var result = [];
	for(var i= 0; i < w.length; i++) {
		result.push(w[i] + g[i]);
	}
}

function dot(w, x) {
	var sum = 0;
	for(var i = 0; i < w.length; i++) {
		sum += w[i]*x[i];
	}
	return sum;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
}]);