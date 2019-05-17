
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Allowing CORS
app.use(cors());

const port = process.env.PORT || 5002;

//parsing responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    socketPath: '/var/run/mysqld/mysqld.sock', //   only on Linux systems 
    port: 3306,
    database: 'nodemysql_test'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected.')
})

// Tout les créneaux
app.get('/api/getAllCreneaux', (req, res) => {
    db.query('SELECT c.id_creneau as id, c.tDeb as start, c.tFin as end, m.id_ue as resourceId, m.nom as title, m.couleur as bgColor from creneau c join matiere m on c.id_mat=m.id_mat;', (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Tout les profs
app.get('/api/getAllProfs', (req, res) => {
    db.query('SELECT id_prof as value, nom as label from prof', (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Toutes les salles
app.get('/api/getAllSalles', (req, res) => {
    db.query('SELECT id_salle as value, label as label from salle', (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Noms Formations (pour Select)
app.get('/api/getFormations', (req, res) => {
    db.query('SELECT nom as value, label, id_form as id FROM formation', (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Tout les groupes (pour l'id du groupe crée)
app.get('/api/getAllGroupes', (req, res) => {
    db.query('SELECT id_grpe FROM groupe', (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Noms Groupes (pour Select)
app.get('/api/getGroupe/:id_form', (req, res) => {
    if (!req.params.id_form) res.sendStatus(400);
    var groupe = mysql.format('SELECT num_grpe as label, id_grpe as value FROM groupe WHERE id_promo = ?', [req.params.id_form]);
    db.query(groupe, (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Modules pour une même formation
app.get('/api/getModules/:id_form', (req, res) => {
    if (!req.params.id_form) res.sendStatus(400);
    var requete = mysql.format('SELECT id_uemod as id, nom as name FROM uemodule where classif="ue" and id_form = ?', [req.params.id_form]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Toutes les matieres
app.get('/api/getAllMatieres/:id_formation', (req, res) => {
    if (!req.params.id_formation) res.sendStatus(400);
    var requete = mysql.format("SELECT m.id_mat as value, m.nom as label, m.id_ue, m.couleur from matiere m join uemodule u on m.id_ue=u.id_uemod where u.id_form=?", [req.params.id_formation]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   ) 
    })
})

// Tout les groupes (pour l'id du groupe crée)
app.get('/api/getAllModules', (req, res) => {
    db.query('SELECT id_uemod as value, nom as label FROM uemodule WHERE classif = "ue"', (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Tout les créneaux d'un groupe
app.post('/api/getCreneaux', (req, res) => {
    if (!req.body.id_grpe) res.sendStatus(400);
    var requete = mysql.format('SELECT c.id_creneau as id, c.tDeb as start, c.tFin as end, m.id_ue as resourceId, m.nom as title, m.couleur as bgColor, m.id_mat, c.id_prof from creneau c join matiere m on c.id_mat=m.id_mat where c.id_grpe = ?', [req.body.id_grpe]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Chercher le nom d'un prof
app.post('/api/getProf', (req, res) => {
    if (!req.body.id_prof) res.sendStatus(400);
    var requete = mysql.format('SELECT genre, nom, prenom from prof where id_prof = ?', [req.body.id_prof]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// Chercher des infos sur une matière
app.post('/api/getMatiereInfos', (req, res) => {
    if (!req.body.id_mat) res.sendStatus(400);
    var requete = mysql.format('SELECT themes, typeEns from matiere where id_mat = ?', [req.body.id_mat]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

app.get('/api/getNbH/:id_mat', (req, res) => {
    if (!req.params.id_mat) res.sendStatus(400);
    var requete = mysql.format('SELECT * FROM matperiod where id_mat=?', [req.params.id_mat]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) ))
    })
})

// Récupère les périodes
app.get('/api/getPeriodes/:idFormation', (req, res) => {
    if (!req.params.idFormation) res.sendStatus(400);
    var requete = mysql.format('SELECT * FROM edtperiod where id_promo=?', [req.params.idFormation]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result[0]) res.sendStatus(404);
        else res.send( JSON.parse( JSON.stringify(result) )   )
    })
})

// change la matière et/ou la période associée au nombre d'heures
app.put('/api/modifyNbH', (req, res) => {
    console.log(req.body);
    if (!req.body.new_id_mat || !req.body.new_id_period || !req.body.old_id_mat || !req.body.old_id_period) res.sendStatus(400);
    var requete = mysql.format('UPDATE matperiod MODIFY SET id_mat=?, id_period=? WHERE id_mat=? and id_period=?', [req.body.new_id_mat, req.body.new_id_period, req.body.old_id_mat, req.body.old_id_period]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result.affectedRows) res.sendStatus(404);
        else res.send( JSON.stringify("Successfully modified nbH for matiere with id " + req.body.new_id_mat) )
    })
})

// change la valeur du NbH
app.post('/api/createNbHvalue', (req, res) => {
    if (!req.body.id_period || !req.body.id_mat || !req.body.nbH) res.sendStatus(400);
    var requete = mysql.format('INSERT INTO matperiod VALUES (?, ?, ?)', [req.body.id_mat, req.body.id_period, req.body.nbH]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result.affectedRows) res.sendStatus(404);
        else res.status(201).send( JSON.stringify("Successfully created nbH for matiere with id " + req.body.id_mat) )
    })
})

// change la valeur du NbH
app.patch('/api/editNbHvalue', (req, res) => {
    if (!req.body.id_period || !req.body.id_mat || !req.body.nbH) res.sendStatus(400);
    var requete = mysql.format('UPDATE matperiod MODIFY SET nbH = ? WHERE id_period=? and id_mat=?', [req.body.nbH, req.body.id_period, req.body.id_mat]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result.affectedRows) res.sendStatus(404);
        else res.send( JSON.stringify("Successfully edited nbH for matiere with id " + req.body.id_mat) )
    })
})

// change la valeur du NbH
app.delete('/api/deleteNbHvalue/:id_mat/:id_period', (req, res) => {
    if (!req.params.id_period || !req.params.id_mat) res.sendStatus(400);
    var requete = mysql.format('DELETE FROM matperiod WHERE id_period=? and id_mat=?', [req.params.id_period, req.params.id_mat]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result.affectedRows) res.sendStatus(404);
        else res.sendStatus(204);
    })
})

// utilisé pour le swap dans le drag and drop
app.put('/api/modifyNbHbyNbH', (req, res) => {
    if (!req.body.new_id_mat || !req.body.new_id_period || !req.body.nbH) res.sendStatus(400);
    var requete = mysql.format('update matperiod set id_mat=?, id_period=? where nbH=?;', [req.body.new_id_mat, req.body.new_id_period, req.body.nbH]);
    db.query(requete, (err, result, fields) => {
        if (err) throw err;
        if (!result.affectedRows) res.sendStatus(404);
        else res.send( JSON.stringify("Successfully modified nbH for matiere with id " + req.body.new_id_mat) )
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));