colorPickerApp.controller('MainCtrl', function($scope) {
	$scope.handleColorChange = function(r,g,b,a) {
		console.log("handleColorChange", r, g, b, a);
	};
});