 (function () {
     'use strict';
     angular.module('app').controller('proformaCtrl',  proformaCtrl);
     proformaCtrl.$inject = ['$scope', '$location', '$routeParams', '$http', '$cookieStore'];

     function  proformaCtrl($scope, $location,$routeParams, $http, $cookieStore) {
         $scope.onmevoit = true;
		 $scope.onmevoit2 = false;

         $scope.listeProforma = function () {
          $http.get('/api/listeProforma').success(function (data) {
             $scope.proformas = data;
         });
        };
        $scope.listeProforma();
		
	
	   
       
		// Liste des clients
		
		  $scope.listeClient = function () {
          $http.get('/api/listeClient').success(function (data) {
             $scope.clients = data;
         });
        };
        $scope.listeClient();
		
		// Liste des banques
		
		  $scope.listeBanques = function () {
          $http.get('/api/listeBanques').success(function (data) {
             $scope.banques = data;
         });
        };
        $scope.listeBanques();
		
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

        $scope.ajouterProforma = function () {
             $http.post('/api/ajouterProforma', $scope.proformaimput).success(function (data) {
				    var result = data;
	               // alert(result.insertId);
					 var insertId = result.insertId;
					 $location.path('/ligneproforma'+insertId);
				 });
	       //alert(result);
			   
            // $location.path('/ligneproforma:5');
			
        };
		 
		
         $scope.modifierProforma = function (indice) {
             $scope.tout = $scope.proformas[indice];
             $scope.onmevoit = false;
         };
         $scope.sauvegarderModifProforma = function () {
             $http.post('/api/modifierProforma', $scope.tout).success(function (data) {});
			 $scope.listeProforma();
             $location.path('/proforma');
             $scope.onmevoit = true;
         };
         $scope.annulerModifProforma = function () {
             $scope.onmevoit = true;
         };
          $scope.supprimerProforma = function (indice) {
             $http.get('/api/supprimerProforma/'+indice).success(function (data) {});
             
             $scope.listeProforma();
             $location.path('/proforma');
             $scope.onmevoit = true;
         };
		 
		 
		 $scope.ficheProforma = function(indice) {
  
             $location.path('/ligneproforma'+indice);
         };
		 
     }
 })();