var http = require('http');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1'
    , user: 'root'
    , password: ''
    , database: 'facturation'
});
connection.connect();
var express = require('express');
var app = express();
app.use('/css', express.static(__dirname + '/apps/css'));
app.use('/fonts', express.static(__dirname + '/apps/fonts'));
app.use('/images', express.static(__dirname + '/apps/images'));
app.use('/libs', express.static(__dirname + '/apps/libs'));
app.use('/js', express.static(__dirname + '/apps/js'));
app.use('/pages', express.static(__dirname + '/apps/pages'));

//parser en JSON
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/apps/index.html');
});
app.get('/api/liste', function (req, res) {
    var etudiant = 'SELECT*FROM et';
    connection.query(etudiant, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
        }
    });
});
app.post('/api/login', function (req, res) {
    var users = req.body.users;
    var password = req.body.password;
    // insertion des elements dans la BDD
    var user = 'SELECT * FROM utilisateurs WHERE login_utilisateurs= "' + users + '" AND motdepasse_utilisateurs = "' + password + '" ';
    connection.query(user, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            
        }
    });
});
app.get('/api/listeClient', function (req, res) {
    // insertion des elements dans la BDD
    var listeClient = 'SELECT * FROM client WHERE type =1';
    connection.query(listeClient, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            
        }
    });
});

app.get('/api/listeGroupe', function (req, res) {
    // insertion des elements dans la BDD
    var listeGroupe = 'SELECT * FROM groupe_client ';
    connection.query(listeGroupe, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            
        }
    });
});

app.post('/api/ajouterClient', function (req, res) {
    var designation = req.body.designation;
    var telephone = req.body.telephone;
    var email = req.body.email;
	var type = req.body.type;
	var id_compagnie = 1;
	var id_groupe = req.body.id_groupe;
    // insertion des elements dans la BDD
    var ajoutClient = 'INSERT INTO client(id_compagnie,id_groupe,designation, telephone, email, type) VALUES ("' + id_compagnie + '","' + id_groupe+ '","' + designation + '","' + telephone + '","' + email + '","' + type + '")';
    connection.query(ajoutClient, function (err) {
        if (err) {
            res.send('table inexistante');
           
        }
    });
});


// Modification Client 
app.post('/api/modifierClient', function (req, res) {

	var id_mod = req.body.id_client;
    var designation = req.body.designation;
    var telephone = req.body.telephone;
    var email = req.body.email;
	var type = req.body.type;
	var id_compagnie = 1;
	var id_groupe = req.body.id_groupe;
	
    var modifClient = 'UPDATE client SET  id_compagnie="'+ id_compagnie +'",id_groupe="'+ id_groupe +'", telephone="'+ telephone +'",email="'+ email +'",type="'+ type +'" WHERE id_client ="'+ id_mod +'"';
    connection.query(modifClient, function (err) {
        if (err) {
            res.send('table inexistante');
           
        }
    });
});

//Suppression Client
app.get('/api/supprimerClient/:id', function (req, res) {
   var id_supp = req.params.id;
   var suppClient = 'DELETE FROM client WHERE id_client="'+ id_supp +'"';
   connection.query(suppClient, function (err) {
       if (err) {
            res.send('table inexistante');
           
        }
    });
});


// Affiher la liste des prospects

app.get('/api/listeProspect', function (req, res) {
    // insertion des elements dans la BDD
    var listeProspect = 'SELECT * FROM client WHERE type =0';
    connection.query(listeProspect, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            
        }
    });
});


// Ajouter un prospect

app.post('/api/ajouterProspect', function (req, res) {
    var designation = req.body.designation;
    var telephone = req.body.telephone;
    var email = req.body.email;
	var type = req.body.type;
	var id_compagnie = 1;
	var id_groupe = req.body.id_groupe;
    // insertion des elements dans la BDD
    var ajoutProspect = 'INSERT INTO client(id_compagnie,id_groupe,designation, telephone, email, type) VALUES ("' + id_compagnie + '","' + id_groupe+ '","' + designation + '","' + telephone + '","' + email + '","' + type + '")';
    connection.query(ajoutProspect, function (err) {
        if (err) {
            res.send('table inexistante');
           
        }
    });
});


// Modification Prospect
app.post('/api/modifierProspect', function (req, res) {

	var id_mod = req.body.id_client;
    var designation = req.body.designation;
    var telephone = req.body.telephone;
    var email = req.body.email;
	var type = req.body.type;
	var id_compagnie = 1;
	var id_groupe = req.body.id_groupe;
	
    var modifProspect = 'UPDATE client SET  id_compagnie="'+ id_compagnie +'",id_groupe="'+ id_groupe +'", telephone="'+ telephone +'",email="'+ email +'",type="'+ type +'" WHERE id_client ="'+ id_mod +'"';
    connection.query(modifProspect, function (err) {
        if (err) {
            res.send('table inexistante');
           
        }
    });
});

//Suppression un prospect
app.get('/api/supprimerProspect/:id', function (req, res) {
   var id_supp = req.params.id;
   var suppProspect = 'DELETE FROM client WHERE id_client="'+ id_supp +'"';
   connection.query(suppProspect, function (err) {
       if (err) {
            res.send('table inexistante');
           
        }
    });
});

// Gestion des produits et Services 

app.get('/api/listeProduit', function (req, res) {
    // insertion des elements dans la BDD
    var listeProduit = 'SELECT * FROM article';
    connection.query(listeProduit, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            
        }
    });
});

app.get('/api/listeCategorie', function (req, res) {
    // insertion des elements dans la BDD
    var listeCategorie = 'SELECT * FROM categorie ';
    connection.query(listeCategorie, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            
        }
    });
});

app.post('/api/ajouterProduit', function (req, res) {
		
	var id_compagnie = 1;
    var prix_unitaire = req.body.prix_unitaire;
    var libelle = req.body.libelle;
    var id_categorie = req.body.id_categorie;
	var id_tva = req.body.id_tva;
	var code_syscoa = req.body.code_syscoa;

    // ajouterProduit des elements dans la BDD
    var ajouterProduit = 'INSERT INTO article (id_compagnie,prix_unitaire,libelle, id_categorie, id_tva, code_syscoa) VALUES ("' + id_compagnie + '","' + prix_unitaire+ '","' + libelle + '","' + id_categorie + '","' + id_tva + '","' + code_syscoa + '")';
	
    connection.query(ajouterProduit, function (err) {
        if (err) {
            res.send('table inexistante');
           
        }
    });
});


// Modification Client 
app.post('/api/modifierProduit', function (req, res) {

	var id_article = req.body.id_article;
    var libelle = req.body.libelle;
    var id_categorie = req.body.id_categorie;
	var prix_unitaire = req.body.prix_unitaire;
	var id_tva = req.body.id_tva;
	var code_syscoa = req.body.code_syscoa;
	
    var modifierProduit = 'UPDATE article SET  id_categorie="'+ id_categorie +'", prix_unitaire="'+ prix_unitaire +'" , libelle="'+ libelle +'", id_tva="'+ id_tva +'",code_syscoa="'+ code_syscoa +'" WHERE id_article ="'+ id_article +'"';
	
    connection.query(modifierProduit, function (err) {
        if (err) {
            res.send('table inexistante');
            console.log('err');
        }
    });
});

//Suppression Client
app.get('/api/supprimerProduit/:id', function (req, res) {
   var id_supp = req.params.id;
   var supprimerProduit = 'DELETE FROM article WHERE id_article="'+ id_supp +'"';
   connection.query(supprimerProduit, function (err) {
       if (err) {
            res.send('table inexistante');
           
        }
    });
});



app.get('/api/listeTVA', function (req, res) {
    // insertion des elements dans la BDD
    var listeTVA = 'SELECT * FROM tva';
    connection.query(listeTVA, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            
        }
    });
});


app.listen(7070);