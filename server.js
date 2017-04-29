var express    = require('express');
var cors       = require('cors');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://thorntja:jake2u@ds062059.mlab.com:62059/kanban');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;

var router = express.Router();
router.use(cors());

var Card = require('./app/models/card');

// sends all cards in mongodb
router.get('/', function(req, res) {
  Card.find(function(err, cards) {
    if (err)
      res.send(err);

    res.json(cards);
  });
});

// sends card count
router.get('/number', function(req, res){
  Card.count(function(err, number){
    if(err)
      res.send(err);

    res.json(number);
  });
});

//saves card sent by client to mongodb and sends back id
router.post('/', function(req, res){
  var card = new Card();
  card.id = req.body.id;
  card.title = req.body.title;
  card.description = req.body.description;
  card.status = req.body.status;
  card.date = req.body.date;

  card.save(function(err) {
    if(err)
      res.send(err);

    res.json({ok: 1, id: card.id});
  })
});

//removes card from db
router.delete('/', function(req, res) {
  Card.remove({
    id: req.body.id
  }, function(err, cards) {
      if (err)
        res.send(err);

      res.json({ ok: 1 });
  });
});

//update card status
router.put('/', function(req, res){
  Card.findOne({'id': req.body.id}, function(err, card) {
    if (err)
      res.send(err);

    card.status = req.body.status;

    card.save(function(err) {
      if(err)
        res.send(err);

      res.json({ok: 1});
    });
  });
});


// all routes will be prefixed with /cards
app.use('/cards', router);

app.listen(port);
console.log('Magic happens on port ' + port);
