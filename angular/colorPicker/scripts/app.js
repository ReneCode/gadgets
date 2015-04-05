var colorPickerApp = angular.module('colorPickerApp', []);

colorPickerApp.directive('colorPicker', function() {
	return {
		/*
			true	eigener scope
			{}      isolieter scope
		*/
		scope: {
				/*
				init werte:   in html als init-r="255" nutzen
				*/

			r: '@initR',
			g: '@initG',
			b: '@initB',
			a: '@initA',
				/*
					=   2-way binding zu variable aus parent scope
					@   unidirektionale bindung zu variable aus parent scope
					&   referenziert function von parent scope
				*/
			onChange: '&' 
		},

		/*
			templateUrl  filename   oder
			template 	 direkter html code (max eine zeile)

		*/
		templateUrl: 'templates/colorPickerTemplate.html',

		/* 
			E   HTML-element
			A   HTML-Attribute
			C   CSS-klasse
			M   HTML Kommentar
		*/
		restrict: 'E',
		link: function(scope, element, attrs) {
			var COLORS = ['r', 'g', 'b', 'a'];
			COLORS.forEach(function(value) {
				scope.$watch(value, function(newValue, oldValue) {
					if (newValue !== oldValue) {
						if (angular.isFunction(scope.onChange)) {
							scope.onChange(generateColorChangeObject());
						}
					}
				});
			});

			var generateColorChangeObject = function() {
				var obj = {};
				COLORS.forEach(function(value) {
					obj[value] = scope[value];
				});
				return obj;
			}
			/*
			console.log("it's me, colorPicker!");
			scope.onChange();
			*/
		}
	};
});