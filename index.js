var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var path = require('path');
var upload = multer({dest: 'uploads/'});
router.use(bodyParser.urlencoded({extended: false}));

// import libraries
var fileLib = require('../lib/fileHandling');

/** Home Page */
router.get(['/', '/start'], function(req, res, next) {
  if(req.session.bIsLogined) // login already
  {
    res.redirect('/dashboard');
  }
  else
  {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  }
});

router.get('/userboard', function(req, res, next)
{
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  console.log(req.session);
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

/** Search & Result Page */
router.get('/summary', function(req, res, next)  // GET summary page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  console.log('summary page');
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/summary', function(req, res, next) // POST summary page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  console.log('post summary page');
  // Show Summary
});

router.get('/search', function(req, res, next)  // GET search page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Send username data to frontend
router.post('/search', function(req, res, next)
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
});

router.post('/fileupload', upload.single('file'), function(req, res, next)
{
  // get new file
  var data = req.file;
  res.send('');

  // remove previous file
  fileLib.removePreviousFile(data.filename, 'uploads');
});

module.exports = router;