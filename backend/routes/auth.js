var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');

router.use(bodyParser.urlencoded({extended: false}));

/** redirect to login */
router.get('/', function(req, res, next) {
  res.redirect('/auth/login');
});

/** Login Page */
router.get('/login', function(req, res, next) // GET login page
{
  // Access control
  if(req.session.bIsLogined)
  {
    res.redirect('/dashboard');
    return false;
  }
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
  console.log('login page');
});

router.post('/login-firebase', function(req, res, next)
{
  req.session.bIsLogined = true;
  req.session.loginAccount = req.body.email;
  req.session.save();
  res.json({authToken: req.sessionID});
});

/** Logout page */
router.post('/logout', function(req, res)
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  delete req.session.bIsLogined;
  delete req.session.loginAccount;
  req.session.save(function() {
    res.redirect('/');
  });
});

/** Register Page */
router.get('/signup', function(req, res, next)  // GET register page
{
  // Access control
  if(req.session.bIsLogined)
  {
    res.redirect('/userboard');
    return false;
  }
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
  console.log('register page');
  //res.render('register');
});

module.exports = router;