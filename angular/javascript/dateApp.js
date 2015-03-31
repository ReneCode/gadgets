var dateApp = angular.module('dateApp', []);
dateApp.controller('DateCtrl', function($scope, $timeout, log) {
	$scope.now = 'Loading ...';
	log.debug('initializing...');

	var updateTime = function() {
		$timeout(function() {
			$scope.now = new Date();
			updateTime();
		}, 1000);
	};

	updateTime();
});



dateApp.filter('truncate', function() {
	return function(input, charCount) {
		var output = input;

		if (output.length > charCount) {
			output = output.substr(0, charCount) + '...';
		}
		return output;
	};
});

dateApp.provider('log', function() {
	// private methodes
	var prefix = '',
		suffix = '';

	var log = function(level, message) {
		console.log(prefix + '[' + level + ']' + message + suffix);
	}

	// public
	this.setPrefix = function(newPrefix) {
		prefix = newPrefix;
	};

	this.setSuffix = function(newSuffix) {
		suffix = newSuffix;
	};

	this.$get = function() {
		// public API
		return {
			error: function(message) {
				log('ERROR', message);
			},
			info: function(message) {
				log('INFO', message);
			},
			debug: function(message) {
				log('DEBUG', message);
			}
		};
	}
});

dateApp.config(function(logProvider) {
	logProvider.setPrefix('[dateApp]');
	logProvider.setSuffix('.');
});


