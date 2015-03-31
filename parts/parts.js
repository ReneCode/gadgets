var app = angular.module("partsApp", ['ngAnimate', 'ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', { templateUrl: 'articles.html'})
		.when('/about', { template: 'Über unsere Pizzeria'})
		.otherwise({redirectTo:'/'});
});

// new service: Cart  (warenkorb)
// a service is a singleton !!
app.factory('Cart', function() {
	var items = [];
	return {
		getItems: function() {
			return items;
		},
		addArticle: function(article) {
			items.push(article);
		},
		sum: function() {
			return items.reduce(function(total, article) {
				return total + article.price;
			}, 0);
		}
	}
});

app.controller('CartCtrl', function($scope, Cart) {
	$scope.cart = Cart;
});

app.controller('ArticlesCtrl', function($scope, $http, Cart){

	$http.get('articles.json').then( function(response) {
		$scope.cart = Cart;
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

app.directive('price', function() {
	return {
		restrict: 'E',
		scope: {
			value: '='
		},
		template: '<span ng-show="value == 0">kostenlos</span>' +
				'<span ng-show="value > 0">{{value | currency}}</span>'
	}
});

