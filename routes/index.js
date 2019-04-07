var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var fs = require('fs');
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

router.post('/summary/getresult', function(req, res)
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  // send data to frontend
});

// ShowSummary
async function showSummary(req, res)
{
  var currentPath = path.join(__dirname, '../uploads');
  fs.readdir(currentPath, function(err, files)
  {
    var datafile;
    if(err) {console.log(err);}
    else
    {
      datafile = files[0];
    }
    
    // send file to model
    var userEmail = req.session.loginAccount;
    var spawn = require("child_process").spawn;
    var process = spawn('python', ['./testmodel.py', currentPath+'/'+datafile, req.session.loginAccount]);  //python3
    var fileName;
    process.stdout.on('data', function(data) {
        fileName = data.toString();
    });
    process.stdout.on('end', function() {
      // remove previous result json files
      fileLib.removePreviousFile(fileName.slice(0, -1), 'result_jsons');
      // delete current elasticsearch data and insert, search
      var filePath = path.join('../result_jsons', 'test.json'); //path.join('../', fileName).slice(0, -1);
      var resultFile = require(filePath);
    });
    process.stdin.end(); 
  });
}

module.exports = router;