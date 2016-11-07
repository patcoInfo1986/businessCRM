 (function () {
     'use strict';
     angular.module('app').controller('clientCtrl', clientCtrl);
     clientCtrl.$inject = ['$scope', '$location', '$http', '$cookieStore'];

     function clientCtrl($scope, $location, $http, $cookieStore) {
         $scope.onmevoit = true;

         $scope.listeClient = function () {
          $http.get('/api/listeClient').success(function (data) {
             $scope.personnes = data;
         });
        };
        $scope.listeClient();
		
		// Liste des groupes
		
		$scope.listeGroupe = function () {
          $http.get('/api/listeGroupe').success(function (data) {
             $scope.groupes = data;
         });
       };
       $scope.listeGroupe();

         $scope.ajouterClient = function () {
             $http.post('/api/ajouterClient', $scope.client).success(function (data) {});
             $location.path('/client');
         };
         $scope.modifierClient = function (indice) {
             $scope.tout = $scope.personnes[indice];
             $scope.onmevoit = false;
         };
         $scope.sauvegarderModif = function () {
             $http.post('/api/modifierClient', $scope.tout).success(function (data) {});
			 $scope.listeClient();
             $location.path('/client');
             $scope.onmevoit = true;
         };
         $scope.annulerModif = function () {
             $scope.onmevoit = true;
         };
          $scope.supprimerClient = function (indice) {
             $http.get('/api/supprimerClient/'+indice).success(function (data) {});
             
             $scope.listeClient();
             $location.path('/client');
             $scope.onmevoit = true;
         };
     }
 })();