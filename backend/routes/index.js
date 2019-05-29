var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
var multer = require('multer');
var fs = require('fs');

var path = require('path');
var upload = multer({dest: 'uploads/'});
router.use(bodyParser.urlencoded({extended: false}));


// import libraries
var fileLib = require('../lib/fileHandling');
var esLib = require('../lib/elasticsearch');

// get result from model or url and search data
var resultFile;
var resultData;
var bIsURLSummary;

/** ElasticSearch test */
var client = new elasticsearch.Client({
  host: 'https://search-marketingai-r3lttgjomhivagmtod5fxknibm.ap-northeast-2.es.amazonaws.com',
  //log: 'trace'
});

/** Home Page */
router.get(['/', '/start'], function(req, res, next) {
  if(req.session.bIsLogined) // login already
  {
    //console.log('already logined');
    res.redirect('/userboard');
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
  req.session.save();
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Initialize bIsURLSummary
router.post('/before_summary', function(req, res) {
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  bIsURLSummary = req.body.bIsURLSummary;
  console.log(bIsURLSummary);
  res.redirect('/summary');
});

router.post('/summary', function(req, res, next) // POST summary page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  req.session.bIsSummaryDone = false;
  req.session.save();
  console.log('post summary page');
  // Show Summary
  showSummary(req, res, bIsURLSummary);
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
  
  res.send(req.session.loginAccount);
});

router.post('/fileupload', upload.single('file'), function(req, res, next)
{
  // get new file
  var data = req.file;
  res.send('');

  // remove previous file
  fileLib.removePreviousFile(data.filename, 'uploads');
});

// recieve result data from model
router.post('/summary/getresult', function(req, res)
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  // send data to frontend
  res.json({
    totalreviews: resultData['totalreviews'],
    ratings: resultData['ratings'],
    sentiment: resultData['sentimentSummary'],
    emotion: resultData['emotionSummary'],
    intent: resultData['intentSummary'],
    keywordCloud: resultData['keywordSummary'],
    sentKeyCloud: resultData['sentKeyCloud']
  });
});

// Url input
router.post('/upload_url', function(req, res)
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  console.log(req.body.body);

  req.session.uploadurl = req.body.body;
  req.session.bIsScraping = '0';
  console.log(req.session.uploadurl.substr(39, 11));
  req.session.save();
  ScrapeReviews(req.session.uploadurl.substr(39, 11), req);

  res.send('');
});

// Response for url scrape status
router.post('/upload_status', function(req, res)
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  res.send(req.session.bIsScraping);
});

// Response for summary status
router.post('/summary_status', function(req, res)
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  res.send(req.session.bIsSummaryDone);
});

/*
reviewsCrawler({
  page: 'https://www.amazon.com/product-reviews/B000068NVI/ref=cm_cr_arp_d_paging_btm_next_/1?ie=UTF8&reviewerType=all_reviews&pageNumber=1',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0',
  elements: {
    productTitie: '.product-title',
    reviewBlock: '.review',
    author: '.a-profile-name'
  }
}).then((result) => {
  console.log('done');
});
*/

// scrape review from url
function ScrapeReviews(asin, req) {
  var scrapefileName;
  req.session.bIsScraping = '1';
  req.session.save();
  var spawn = require("child_process").spawn;
  var process = spawn('python', ['./amazon_crawler.py', asin, req.session.loginAccount]);  //python3
  process.stdout.on('data', function(data) {
    scrapefileName = data.toString();
  });
  process.stdout.on('end', function() {
    fileLib.removePreviousFile(scrapefileName.slice(0, -2), 'scrape_result/'+req.session.loginAccount);
    console.log('url scraping has been finished!');
    req.session.bIsScraping = '2';
    req.session.save();
  });
}
//Scrape('B0781Z7Y3S');
/*
async function ScrapeReviews(asin, req, i) {
  await reviewsCrawler(asin, {
    page: 'https://www.amazon.com/product-reviews/'+asin+'/ref=cm_cr_arp_d_paging_btm_next_/'+i+'?ie=UTF8&reviewerType=all_reviews&pageNumber='+i,
    elements: {
      productTitie: '.product-title',
      reviewBlock: '.review',
      author: '.a-profile-name'
    }
  })
  .then((result) => {
    console.log(i);
    cur_scrape_page = i;
    var scrapeFilePath = path.join(__dirname, '../scrape/'+req.session.loginAccount+'-scraperesult.json');
    reviewstream = fs.createWriteStream(scrapeFilePath, {flags: 'a'});
    
    if(result.reviews.length > 0) {
      for(var index in result.reviews)
      {
        reviewstream.write(JSON.stringify(result.reviews[index]));
        //scrapeResult.push(result.reviews[index]);
      }
      ScrapeReviews(asin, req, i+1);
    }
    else {
      req.session.bIsScrapingDone = true;
      req.session.save();
    }
  })
  .catch((err) => {
    console.log(err);
  });
}
*/
// ShowSummary
async function showSummary(req, res, bIsURLSummary)
{
  var currentPath;
  if(!bIsURLSummary) {currentPath = path.join(__dirname, '../uploads');}
  else {currentPath = path.join(__dirname, '../scrape_result/'+req.session.loginAccount);}
  console.log(currentPath);
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
    var process = spawn('python', [path.join(__dirname, '../testmodel.py'), currentPath+'/'+datafile, req.session.loginAccount]);  //python3
    var fileName;
    process.stdout.on('data', function(data) {
        fileName = data.toString();
    });
    process.stdout.on('end', function() {
      // remove previous result json files
      //fileLib.removePreviousFile(fileName.slice(0, -1), 'result_jsons');
      // delete current elasticsearch data and insert, search
      var filePath = path.join('../result_jsons', 'resultJson_abcd@gmail.com_19-05-12-13-22-55.json'); //path.join('../', fileName).slice(0, -1);
      var resultFile = require(filePath);
      console.log('before deletion');
      client.deleteByQuery({
        index: 'entity',
        body: esLib.getDataQuery(userEmail)
      }, async function(delerr, delres) {
        console.log('deletion complete');
        await client.bulk({
          refresh: "wait_for",
          body: resultFile
        }, async function(err, bulkres, status)
        {
          console.log('insert complete');
          if(err) {console.log('resultFile put error!'), console.log(err);}
          else  
          {
           client.msearch({
             body: esLib.getSentKeyCloudQuery(userEmail)
            }, function(searcherr, searchres) {
              // send data to frontend
              resultData = esLib.createResultJson(searchres.responses[3]);
              resultData.push('sentKeyCloud');
              resultData['sentKeyCloud'] = [];
              var maxkeywordNumber = 5;
              for(var i = 0; i < 3; i++)
              {
                var count = 0;
                for(var i2 in searchres.responses[i].aggregations.keyWordCloud.buckets)
                {
                  if(i2 > maxkeywordNumber-1) {break;}  // Maximum
                  resultData['sentKeyCloud'].push(searchres.responses[i].aggregations.keyWordCloud.buckets[i2].key);
                  count++;
                }
                for(var i2 = 0; i2 < maxkeywordNumber-count; i2++) {resultData['sentKeyCloud'].push("");}
              }
              //console.log(resultData);
              //console.log(resultData['sentKeyCloud']);
              req.session.bIsSummaryDone = true;
              req.session.save();
              res.send('');
            });
          }
        });
      });
      
    });
    process.stdin.end(); 
  });
}

module.exports = router;