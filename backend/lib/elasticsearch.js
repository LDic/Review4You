// Get a query that shows current ES data from certain userEmail
module.exports.getDataQuery = function(userEmail)
{
    return {
        query: {
            match: {
              userID: userEmail
            }
        }
    };
}

// Get a ES search query from certain userEmail and certain sentiment summary
module.exports.getSentKeyCloudQuery = function(userEmail)
{
    return [
      {},
      {query : {bool: {must: [{ match: { userID: userEmail } }, { match: { "summary.sentiment": "positive"} }]}}, size:0, aggs: {keyWordCloud: {terms: {field: "keyword", order: {_count: "desc"}}}}},
      {},
      {query : {bool: {must: [{ match: { userID: userEmail } }, { match: { "summary.sentiment": "neutral"} }]}}, size:0, aggs: {keyWordCloud: {terms: {field: "keyword", order: {_count: "desc"}}}}},
      {},
      {query : {bool: {must: [{ match: { userID: userEmail } }, { match: { "summary.sentiment": "negative"} }]}}, size:0, aggs: {keyWordCloud: {terms: {field: "keyword", order: {_count: "desc"}}}}},
      {},
      {
        query: {
            match: {
              userID: userEmail
            }
        },
        size: 0,
        aggregations: {
          ratingSummary: {
            avg: {
              field: 'ratings'
            }
          },
          sentimentSummary: {
              terms: {
              field: 'summary.sentiment',
              order: {_count: 'desc'}  // to get max data as [0]
              }
          },
          emotionSummary: {
              terms: {
              field: 'summary.emotion',
              order: {_count: 'desc'}  // to get max data as [0]
              }
          },
          intentSummary: {
              terms: {
              field: 'summary.intent',
              order: {_count: 'desc'}  // to get max data as [0]
              }
          },
          keywordSummary: {
              terms: {
              field: 'keyword',
              order: {_count: 'desc'}
              }
          }
        }
      }
    ];
}

// Create result json file to send to frontend
module.exports.createResultJson = function(searchres)
{
  var maxkeywordNumber = 10;
  var resultData = ['totalreviews'];
  resultData['totalreviews'] = searchres.hits.total;
  resultData.push('ratings');
  resultData['ratings'] = searchres.aggregations['ratingSummary'].value;
  var dataList = ['sentimentSummary', 'emotionSummary', 'intentSummary'];  // to get empty data
  dataList['sentimentSummary'] = ['positive', 'neutral', 'negative'];
  dataList['emotionSummary'] = ['happy', 'angry', 'interested', 'sad', 'disappointed', 'unsatisfied', 'satisfied'];
  dataList['intentSummary'] = ['spam', 'question', 'complaint', 'suggestion', 'compliment'];
  // create json file to send to frontend
  for(var i in searchres.aggregations)
  {
    resultData.push(i);
    if(i == 'keywordSummary')
    {
      resultData[i] = [];
      for(var i2 in searchres.aggregations[i].buckets)
      {
        if(i2 > maxkeywordNumber-1) {break;}  // Maximum
        resultData[i].push(searchres.aggregations[i].buckets[i2].key);
      }
    }
    else if(i != 'ratingSummary')
    {
      resultData[i] = '{';
      for(var i2 in searchres.aggregations[i].buckets)
      {
        var tempResult = searchres.aggregations[i].buckets;
        resultData[i] += '"'+tempResult[i2].key+'": '+ tempResult[i2].doc_count/resultData['totalreviews']+', ';
        dataList[i].splice(dataList[i].indexOf(tempResult[i2].key), 1);
      }
      // get empty data
      for(var listIndex in dataList[i])
      {
        resultData[i] += '"'+dataList[i][listIndex]+'": '+ 0 +', ';
      }
      resultData[i] = resultData[i].slice(0, -2);
      resultData[i] += '}';
      resultData[i] = JSON.parse(resultData[i]);
    }
  }
  return resultData;
}