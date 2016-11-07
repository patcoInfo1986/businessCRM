(function(){
	'use strict';
	angular
	.module('app')
	.controller('catalogueCtrl',catalogueCtrl);

	catalogueCtrl.$inject = ['$scope','$location','$http','$cookieStore'];



	function catalogueCtrl($scope, $location, $http, $cookieStore){


		$http.get('/api/listeArticle')

		 .success(function(data){

		                $scope.articles = data;

		        });

        $scope.ajouterarticle = function(){

					$http.post('/api/ajouterArticle', $scope.catalogue)

		            .success(function(data){ 

		        });

		        $location.path('/catalogue');

				};
               }







})();