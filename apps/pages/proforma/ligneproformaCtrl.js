 (function () {
     'use strict';
     angular.module('app').controller('ligneproformaCtrl',  ligneproformaCtrl);
     ligneproformaCtrl.$inject = ['$scope', '$location', '$routeParams', '$http', '$cookieStore'];

     function  ligneproformaCtrl($scope, $location, $routeParams, $http, $cookieStore) {
             
			//$scope.id_proforma = $routeParams.id_proforma;
			var insertId = $routeParams.id_proforma;
			
			 
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
		
	 $scope.listeProduit = function () {
          $http.get('/api/listeProduit').success(function (data) {
             $scope.produits = data;
         });
        };
        $scope.listeProduit();
	   
	   		// Liste des TVA
		
		 $scope.listeTVA = function () {
             $http.get('/api/listeTVA').success(function (data) {
              $scope.tvas = data;
             });
        };
        $scope.listeTVA();
		
		$scope.ligneProforma = function () {
             $http.get('/api/ligneProforma').success(function (data) {	  
			  
			  	if (data!='err'){
		           $scope.listeproformas = data;		
			       $scope.total_ht = 0;
				   $scope.tva  =0;
   			       for (var i = 0; i < $scope.listeproformas.length; i++) {
     		            $scope.total_ht += ($scope.listeproformas[i].prix_unitaire * $scope.listeproformas[i].qte_art);
						
						  $scope.tva += (($scope.listeproformas[i].prix_unitaire * $scope.listeproformas[i].qte_art)*($scope.listeproformas[i].pourcentage)/100);
                   };
	           }
	          var total_ht = $scope.total_ht;
			  var tva =$scope.tva;
	
             });
        };
        $scope.ligneProforma();
			
			$scope.choixProforma = function (indice) {
				
             $http.get('/api/choixProforma/'+indice).success(function (data) {
				// var choixProforma = data;
				 $scope.id_proforma = data[0].id_facture;	
				 $scope.date = data[0].date;				 
				 $scope.reference = data[0].reference;
				 $scope.id_client = data[0].id_client;
				 $scope.lib_facture = data[0].lib_facture;
				 $scope.montantht = data[0].montantht;
				 $scope.taxes = data[0].taxes;
				 $scope.designation = data[0].designation;
				 $scope.remise = data[0].remise;
				 
				 
				 });
       
            };
			
			$scope.choixProforma(insertId);
	
	
	   $scope.ajouterLigneProforma = function (indice) {
             $http.post('/api/ajouterLigneProforma/'+indice, $scope.tout).success(function (data) {
				   
					
				 });
				 $scope.ligneProforma();
			 $location.path('/ligneproforma'+indice);
       };
	   
	   $scope.supprimerLigneproforma = function (indice) {
             $http.get('/api/supprimerLigneproforma/'+indice).success(function (data) {});            
             $scope.ligneProforma();
			 $scope.Calcttc();
             $location.path('/ligneproforma'+insertId);
         };
		 
		
		
		   $scope.Calcttc = function () {
             $http.get('/api/ligneProforma').success(function (data) {	  
			  
			  	if (data!='err'){
		           $scope.listeproformas = data;		
			       $scope.total_ht = 0;
				   $scope.tva  =0;
   			       for (var i = 0; i < $scope.listeproformas.length; i++) {
     		            $scope.total_ht += ($scope.listeproformas[i].prix_unitaire * $scope.listeproformas[i].qte_art);
						
						  $scope.tva += (($scope.listeproformas[i].prix_unitaire * $scope.listeproformas[i].qte_art)*($scope.listeproformas[i].pourcentage)/100);
                   };
	           }
	  $scope.ttc   = ($scope.total_ht + $scope.tva)-((($scope.total_ht + $scope.tva)*$scope.remise)/100)   ; 
	
             });
			    
			           //  $scope.ttc = (total_ht + tva)-(((total_ht + tva)*$scope.remise)/100)   ; 

        };
		
		
		
		
		
	      $scope.Calcttc();  
		 
	    $scope.RabaisChange = function (indice) {
              $http.post('/api/modifierFactureRabais/'+insertId+'/'+$scope.remise, $scope.facture).success(function (data) {});          
              $scope.ligneProforma();
              $scope.ttc = ($scope.total_ht + $scope.tva)-((($scope.total_ht + $scope.tva)*$scope.remise)/100);          
        };

	    $scope.validerFacture = function () {
            $location.path('/proforma');          
        };
	  
	  	
     }
 })();