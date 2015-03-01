var app = angular.module("partsApp", []);

app.controller('ArticlesCtrl', function($scope, $http){

	$http.get('articles.json').then( function(response) {
		$scope.articles = response.data;
	});

/*
    $scope.articles = [
      { id: 1, name: "Pizza Vegetaria", price: 5 },
      { id: 2, name: "Pizza Salami",    price: 5.5 },
      { id: 3, name: "Pizza Thunfisch", price: 6 }
    ];
    */
});

app.controller('RiffCtrl', function($scope, $http) {
	$http.get("http://localhost:8085/api/compmsg").then(function(response) {
		$scope.riffs = response.data;
		console.log(response);
	});
});