var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

  var refresh = function(){
  	$http.get("/carroslist").then(function (success){
	    	$scope.carroslist = success.data;
	    	$scope.carro = {};
	    },function (error){

	  });
  }

  refresh();

  $scope.addCarro = function(){
  	$http.post("/carroslist", $scope.carro).then(function (success){
	    	refresh();
	    },function (error){

	  });
  }

  $scope.removeCarro = function(id){
  	$http.delete('/carroslist/'+id).then(function (success){
	    	refresh();
	    },function (error){

	  });
  }

  $scope.editCarro = function(id){
	$http.get('/carroslist/'+id).then(function (success){
      $scope.carro = success.data;
      },function (error){

    });
  }

  $scope.updateCarro = function(){
	$http.put('/carroslist/'+ $scope.carro._id, $scope.carro).then(function (success){
      console.log(success.data);
      refresh();
      },function (error){
    });
  }

  $scope.clear = function(){
    $scope.carro = {};
  }
    
}]);