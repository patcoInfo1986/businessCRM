 (function () {
     'use strict';
     angular.module('app').controller('produitCtrl', produitCtrl);
     produitCtrl.$inject = ['$scope', '$location', '$http', '$cookieStore'];

     function produitCtrl($scope, $location, $http, $cookieStore) {
         $scope.onmevoit = true;

         $scope.listeProduit = function () {
          $http.get('/api/listeProduit').success(function (data) {
             $scope.produits = data;
         });
        };
        $scope.listeProduit();
		
		// Liste des categories
		
		$scope.listeCategorie = function () {
          $http.get('/api/listeCategorie').success(function (data) {
             $scope.categories = data;
         });
       };
       $scope.listeCategorie();
	   
	   		// Liste des TVA
		
		$scope.listeTVA = function () {
          $http.get('/api/listeTVA').success(function (data) {
             $scope.tvas = data;
         });
       };
       $scope.listeTVA();

         $scope.ajouterProduit = function () {
             $http.post('/api/ajouterProduit', $scope.produit).success(function (data) {});
             $location.path('/produit');
         };
         $scope.modifierProduit = function (indice) {
             $scope.tout = $scope.produits[indice];
             $scope.onmevoit = false;
         };
         $scope.sauvegarderModifProduit = function () {
             $http.post('/api/modifierProduit', $scope.tout).success(function (data) {});
			 $scope.listeProduit();
             $location.path('/produit');
             $scope.onmevoit = true;
         };
         $scope.annulerModifProduit = function () {
             $scope.onmevoit = true;
         };
          $scope.supprimerProduit = function (indice) {
             $http.get('/api/supprimerProduit/'+indice).success(function (data) {});
             
             $scope.listeProduit();
             $location.path('/produit');
             $scope.onmevoit = true;
         };
     }
 })();