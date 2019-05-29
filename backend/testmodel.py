import pandas as pd
import numpy as np
import sys
import random
import string
import json
import datetime
import os
load_path = "json2csv_test.csv"
save_path = ""

data = pd.read_csv(sys.argv[1])
#data = pd.read_csv(load_path)

emailList = ['@gmail.com', '@naver.com', '@yahoo.com', '@nate.com', '@daum.net', '@cau.ac.kr']
productSite = ['samsung', 'apple', 'hp', 'asus', 'acer', 'msi']
sourceSite = ['amazon', 'ebay']
urlList = ['https://www.amazon.com/product-reviews/', 'https://www.ebay.com']
sentimentList = [[0.0, 0.0, 0.0, 1.0, 1.0], [0.0, 0.0, 1.0, 0.0, 0.0], [1.0, 1.0, 0.0, 0.0, 0.0]]   #[0]: positive / [1]: neutral / [2]: negative


userEmail = sys.argv[2]    # the email of user who search the data
#userEmail = 'hi'
resultData = np.empty((0))
idCount = 1

#columns: reviewerName, reviewTime, asin, overall, reviewText, summary

for i in range(0, len(data.index)):
    reviewID = str(data.ix[i]['reviewerName'])
    productID = str(data.ix[i]['asin'])
    sourceID = sourceSite[0]
    url = urlList[0]+productID
    title = str(data.ix[i]['summary'])
    content = str(data.ix[i]['reviewText'])
    keyword = random.choices(content.split(), k=5)
    sentiment = {
        "positive": sentimentList[0][int(data.ix[i]['overall'])-1],
        "negative": sentimentList[1][int(data.ix[i]['overall'])-1],
        "neutral": sentimentList[2][int(data.ix[i]['overall'])-1]
    }
    intent = {
        "spam": random.uniform(0, 1.0),
        "question": random.uniform(0, 1.0),
        "complaint": random.uniform(0, 1.0),
        "suggestion": random.uniform(0, 1.0),
        "compliment": random.uniform(0, 1.0)
    }
    emotion = {
        "happy": random.uniform(0, 1.0),
        "angry": random.uniform(0, 1.0),
        "sad": random.uniform(0, 1.0),
        "hate": random.uniform(0, 1.0),
        "unsatisfied": random.uniform(0, 1.0),
        "satisfied": random.uniform(0, 1.0)
    }

    result = {
        "userID": userEmail,
        "reviewID": reviewID,
        "productID": productID,
        "sourceID": sourceID,
        "date": data.ix[i]['reviewTime'],
        "url": url,
        "title": title,
        "content": content,
        "ratings": float(data.ix[i]['overall']),
        "sentiment": sentiment,
        "intent": intent,
        "emotion": emotion,
        "keyword": keyword,
        "summary":
            {
                "sentiment": max(sentiment, key=sentiment.get),
                "intent": max(intent, key=intent.get),
                "emotion": max(emotion, key=emotion.get)
            }
    }
    tempid = userEmail + '-' + str(idCount)
    bulkHead = {
        "index": {
            "_index": "entity",
            "_type": "review",
            "_id": tempid
        }
    }
    idCount += 1
    resultData = np.append(resultData, bulkHead)
    resultData = np.append(resultData, result)
sys.stdout.flush()
resultData = resultData.tolist()
resultJson = json.dumps(resultData)
resultName = 'resultJson_'+userEmail+'_'+str(datetime.datetime.now().strftime("%y-%m-%d-%H-%M-%S"))+'.json'
resultPath = os.path.join(os.getcwd(), 'result_jsons', resultName)
f = open(resultPath, 'w')
f.write(resultJson)
f.close()
print(resultName)