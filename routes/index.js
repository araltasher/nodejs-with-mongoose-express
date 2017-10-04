var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }
}, { collection: 'user-data' });

var userData = mongoose.model('userData', userDataSchema);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/get-data', function (req, res, next) {
  userData.find()
    .then(function(doc){
      res.render('index', {items:doc});
    });
});

router.post('/insert', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new userData(item);
  data.save();
  

  res.redirect('/');
});

router.post('/update', function (req, res, next) {
  var id = req.body.id;

  userData.findById(id, function(err, doc){
    if (err){
      console.error('error, no entry found');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.content;
    doc.save();
  })
  res.redirect('/');
});


router.post('/delete', function (req, res, next) {
  var id = req.body.id;
  userData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;