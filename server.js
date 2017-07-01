var express = require('express');
var app = express();
var mongojs = require('mongojs');
//mongodb://<dbuser>:<dbpassword>@ds139322.mlab.com:39322/projetofinal-dm104
//Banco criado no site mlab.com
var db = mongojs('mongodb://root:root@ds139322.mlab.com:39322/projetofinal-dm104?authMechanism=SCRAM-SHA-1', ['carroslist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/carroslist', function (req, res){
	db.carroslist.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/carroslist', function (req, res){
  db.carroslist.insert(req.body, function (err, doc){
    res.json(doc);
  });
});

app.delete('/carroslist/:id', function (req, res){
  var id = req.params.id;
  db.carroslist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
    res.json(doc);
  });
});

app.get('/carroslist/:id', function (req, res){
  var id = req.params.id;
  db.carroslist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
    res.json(doc);
  });
});

app.put('/carroslist/:id', function (req, res){
  var id = req.params.id;
  db.carroslist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {carro: req.body.carro, fabricante: req.body.fabricante, modelo: req.body.modelo, ano: req.body.ano}},
    new: true}, function (err, doc){
      res.json(doc);
  });
});

var server = app.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log("Aplicativo rodando na porta: ", port);
});