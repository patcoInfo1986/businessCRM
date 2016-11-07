 (function () {
     'use strict';
     angular.module('app').controller('groupeClientCtrl', groupeClientCtrl);
     groupeClientCtrl.$inject = ['$scope', '$location', '$http', '$cookieStore'];

     function groupeClientCtrl($scope, $location, $http, $cookieStore) {
         $scope.onmevoit = true;

         $scope.listeGroupeClient = function () {
          $http.get('/api/listeGroupeClient').success(function (data) {
             $scope.groupeClients = data;
         });
        };
        $scope.listeGroupeClient();
		
		// Liste des groupes
		
		$scope.listeGroupe = function () {
          $http.get('/api/listeGroupe').success(function (data) {
             $scope.groupes = data;
         });
       };
       $scope.listeGroupe();

         $scope.ajouterGroupeClient = function () {
             $http.post('/api/ajouterGroupeClient', $scope.groupeClient).success(function (data) {});
             $location.path('/groupeClient');
         };
         $scope.modifierGroupeClient = function (indice) {
             $scope.tout = $scope.groupeClients[indice];
             $scope.onmevoit = false;
         };
         $scope.sauvegarderModifGroupeClient = function () {
             $http.post('/api/modifierGroupeClient', $scope.tout).success(function (data) {});
			 $scope.listeGroupeClient();
             $location.path('/groupeClient');
             $scope.onmevoit = true;
         };
         $scope.annulerModifGroupeClient = function () {
             $scope.onmevoit = true;
         };
          $scope.supprimerGroupeClient = function (indice) {
             $http.get('/api/supprimerGroupeClient/'+indice).success(function (data) {});
             
             $scope.listeGroupeClient();
             $location.path('/groupeClient');
             $scope.onmevoit = true;
         };
     }
 })();