 (function () {
     'use strict';
     angular.module('app').controller('prospectCtrl', prospectCtrl);
     prospectCtrl.$inject = ['$scope', '$location', '$http', '$cookieStore'];

     function prospectCtrl($scope, $location, $http, $cookieStore) {
         $scope.onmevoit = true;

         $scope.listeProspect = function () {
          $http.get('/api/listeProspect').success(function (data) {
             $scope.prospects = data;
         });
        };
        $scope.listeProspect();
		
		// Liste des groupes
		
		$scope.listeGroupe = function () {
          $http.get('/api/listeGroupe').success(function (data) {
             $scope.groupes = data;
         });
       };
       $scope.listeGroupe();

         $scope.ajouterProspect = function () {
             $http.post('/api/ajouterProspect', $scope.prospect).success(function (data) {});
             $location.path('/prospect');
         };
         $scope.modifierProspect = function (indice) {
             $scope.tout = $scope.prospects[indice];
             $scope.onmevoit = false;
         };
         $scope.sauvegarderModifProspect = function () {
             $http.post('/api/modifierProspect', $scope.tout).success(function (data) {});
			 $scope.listeProspect();
             $location.path('/prospect');
             $scope.onmevoit = true;
         };
         $scope.annulerModifProspect = function () {
             $scope.onmevoit = true;
         };
          $scope.supprimerProspect = function (indice) {
             $http.get('/api/supprimerProspect/'+indice).success(function (data) {});
             
             $scope.listeProspect();
             $location.path('/prospect');
             $scope.onmevoit = true;
         };
     }
 })();