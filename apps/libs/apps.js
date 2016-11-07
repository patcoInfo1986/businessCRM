var app = angular.module('app', ['ngRoute','ngCookies']);// Dépendances du "module"
 
//le routing
app.config(['$routeProvider', function($routeProvider) { 
    
        
        // Système de routage
        $routeProvider
        .when('/', {
           
            templateUrl: 'pages/dashboard/tpl/dashboard.html',
            controller: 'dashboardCtrl'

        })
        .when('/client', {
            templateUrl: 'pages/client/tpl/index.html',
            controller: 'clientCtrl'
        })
        .when('/ajouterclient', {
            templateUrl: 'pages/client/tpl/ajouterclient.html',
            controller: 'clientCtrl'
        })


		.when('/prospect', {
            templateUrl: 'pages/prospect/tpl/index.html',
            controller: 'prospectCtrl'
        })
		
        .when('/ajouterprospect', {
            templateUrl: 'pages/prospect/tpl/ajouterclient.html',
            controller: 'prospectCtrl'
        })
		
		.when('/groupeClient', {
            templateUrl: 'pages/groupe_client/tpl/index.html',
            controller: 'groupeClientCtrl'
        })
		
        .when('/ajoutergroupeClient', {
            templateUrl: 'pages/groupe_client/tpl/ajoutergroupe_client.html',
            controller: 'groupeClientCtrl'
        })
		
		
		
		.when('/produit', {
            templateUrl: 'pages/produit/tpl/index.html',
            controller: 'produitCtrl'
        })
		
        .when('/ajouterproduit', {
            templateUrl: 'pages/produit/tpl/ajouterproduit.html',
            controller: 'produitCtrl'
        })
		
		.when('/categorieProduit', {
            templateUrl: 'pages/categorie_produit/tpl/index.html',
            controller: 'categorieproduitCtrl'
        })
		
        .when('/ajoutergroupeClient', {
            templateUrl: 'pages/groupe_client/tpl/ajoutergroupe_client.html',
            controller: 'groupeClientCtrl'
        })
		
		
				
        .when('/proforma', {
            templateUrl: 'pages/proforma/tpl/index.html',
            controller: 'proformaCtrl'
        })
        .when('/ajouterproforma', {
            templateUrl: 'pages/proforma/tpl/ajouterproforma.html',
            controller: 'proformaCtrl'
        })
		.when('/ligneproforma:id_proforma', {
            templateUrl: 'pages/proforma/tpl/proforma.html',
            controller: 'ligneproformaCtrl'
        })
        .when('/catalogue', {
            templateUrl: 'pages/catalogue/tpl/index.html',
            controller: 'catalogueCtrl'
        })
        .when('/ajouterarticle', {
            templateUrl: 'pages/catalogue/tpl/ajouterarticle.html',
            controller: 'catalogueCtrl'
        })
        .when('/stats', {
            templateUrl: 'pages/stats/tpl/index.html',
            controller: 'statsCtrl'
        })
        
        .when('/conf', {
            templateUrl: 'pages/conf/tpl/index.html',
            controller: 'confCtrl'
        })
        .when('/ajouteruser', {
            templateUrl: 'pages/conf/tpl/ajouteruser.html',
            controller: 'confCtrl'
        })

        .otherwise({
        	redirectTo:'/'
        });
    }
]);

//var appCtrollers = angular.module('appCtrollers', []);

//definition des controllers




app.controller('contactCtrl',function($scope){
	$scope.message="i'm building the world";
	$scope.msg= "bonne chance!";

});

app.controller('loginCtrl', function($scope,$location, $http,$cookieStore){
    
     //$cookieStore.put('loginNb', 0);
         $scope.login=true;
         $scope.success=true;
         $scope.danger=true;

         var loginNb = $cookieStore.get('loginNb');


    if(loginNb==1){

     
    $scope.login=false;
    $scope.board=true;  
    }
     $scope.connecter=function(){

           $http.post('/api/login',$scope.sign)

            .success(function(data){

            $scope.loginStore=data;
            //ookies.loginNb = $scope.loginStore.length;
            $cookieStore.put('loginNb', $scope.loginStore.length);
            $cookieStore.put('nom',$scope.loginStore[0].nom);
var loginNb = $cookieStore.get('loginNb');
 $scope.loginNom = $cookieStore.get('nom');


            if(loginNb==1){
                $scope.login=false;
                $scope.board=true;
                $scope.nom=loginNom;
               // $location.path('/');
               $scope.success=false;

            }else{
                $scope.danger=false;
            }


          
            });
        };


$scope.deconnexion = function(){
    $cookieStore.remove('loginNb');
    $scope.login=true;
  $scope.board=false;
           $scope.success=true;
         $scope.danger=true;
}    

// Langue 

$scope.customer = "Liste des Clients";
$scope.opportunity = "Liste des Prospects";
$scope.group = "Liste des Groupes";
$scope.product = "Liste des Produits";
$scope.category = "Liste des Catégories";
$scope.addProduct = "Ajouter un Produit";
$scope.customer = "Commercial";	
$scope.proforma = "Pro forma";	
$scope.invoice = "Facture";	
$scope.billing = "Facturation";	
$scope.add = "Ajouter";
$scope.edit = "Modifier";
$scope.cancel = "Supprimer";
$scope.save = "Enregistrer";

});

   
    
