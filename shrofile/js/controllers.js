var app= angular.module('myApp',[]);
app.controller('MyController', function($scope,$http){
	$http.get('js/searchbook.json').success(function(data){
		$scope.books = data;
	});
});