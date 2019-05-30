import nltk
import pandas as pd
import numpy as np
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.stem.porter import PorterStemmer
from joblib import load
from fastai import *
from fastai.text import *
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)
import time
import os
import sys
import datetime

"""
    CUDA 10.0
    Pytorch 1.1.0
    fastai 1.0.52
    python 3.7.1
    이 외에도 깔아줘야 할 애들 명령어
    pip install typing
    pip install fastprogress
    pip install dataclasses
    pip install nvidia-ml-py3
"""

startTime = time.clock()
spam_clf = load("Spam-filter")
emotion_classifier = [load_learner("", "rating 1-2 classifier"), load_learner("", "rating 3 classifier"), load_learner("", "rating 4-5 classifier")]
intent_classifier = [load_learner("", "intent classifier rating 1-2"), load_learner("", "intent classifier rating 3"), load_learner("", "intent classifier rating 4-5")]
def list_make_func(dataframe):
    result = []
    for i in range(dataframe.shape[0]):
        result.append(dataframe.values[i][0])  
    return result

def preprocessing(df, spam_word):
    df['content'] = df['content'].str.strip()
    df['content'] = df['content'].str.lower()

    stop_words = stopwords.words('english')
    # tokenization 
    tokenizer = RegexpTokenizer(r'\w+')
    tokenized_doc = df['content'].apply(lambda x: tokenizer.tokenize(x))
    tokenized_doc = pd.concat((df['rating'], tokenized_doc), axis = 1)
    # remove stop-words 
    lem = WordNetLemmatizer()
    porter = PorterStemmer()
    tokenized_doc['content'] = tokenized_doc['content'].apply(lambda x: [item for item in x if item not in stop_words])
    tokenized_doc['content'] = tokenized_doc['content'].apply(lambda x: [lem.lemmatize(item) for item in x])
    tokenized_doc['content'] = tokenized_doc['content'].apply(lambda x: [porter.stem(item) for item in x])
    tokenized_doc = tokenized_doc.dropna()
    tokenized_doc = tokenized_doc.reset_index()
    tokenized_doc = tokenized_doc.drop('index', axis = 1)
    
    detokenized_doc = [] 
    for i in range(tokenized_doc.shape[0]): 
        t = ' '.join(tokenized_doc['content'][i])
        detokenized_doc.append(t)
    result = pd.DataFrame(detokenized_doc)
    result = pd.concat((tokenized_doc['rating'], result), axis=1)
    result.columns = ['rating', 'content']
    
    arr1 = np.zeros((tokenized_doc.shape[0], len(spam_word))).astype(int)
    k=0
    for i in tokenized_doc['content']:
        for j in i:
            if j in spam_word:
                arr1[k][spam_word.index(j)] = arr1[k][spam_word.index(j)] + 1
        k = k + 1
    
    return result, arr1
  
path = sys.argv[1]#"scrapeResult_abcd@gmail.com_19-05-27-23-39-38.csv"
data = pd.read_csv(path)
data = data.rename(columns = {'overall':'rating', 'reviewText':'content'})
spam_word = pd.read_csv('spamword.csv')
preprocessed_data, arr = preprocessing(data, list_make_func(spam_word))

spam_index = np.where(spam_clf.predict(arr) == 'spam')[0].tolist()

spam_review = preprocessed_data.loc[spam_index]
#print(spam_review)
preprocessed_data = preprocessed_data.loc[~preprocessed_data.index.isin(spam_index)]

#preprocessed_data = preprocessed_data.reset_index()
#preprocessed_data = preprocessed_data.drop('index', axis = 1)

emotion_list = []
intent_list = []
productID_list = []
date_list = []
reviewID_list = []
title_list = []

for i in range(preprocessed_data.shape[0]):
    cur_index = preprocessed_data.index[i]
    if preprocessed_data['rating'][cur_index] <3:
        emotion_list.append(emotion_classifier[0].predict(preprocessed_data['content'][cur_index])[0])
        intent_list.append(intent_classifier[0].predict(preprocessed_data['content'][cur_index])[0])
    elif preprocessed_data['rating'][cur_index] ==3:
        emotion_list.append(emotion_classifier[1].predict(preprocessed_data['content'][cur_index])[0])
        intent_list.append(intent_classifier[1].predict(preprocessed_data['content'][cur_index])[0])
    else:
        emotion_list.append(emotion_classifier[2].predict(preprocessed_data['content'][cur_index])[0])
        intent_list.append(intent_classifier[2].predict(preprocessed_data['content'][cur_index])[0])
    productID_list.append(data['asin'][cur_index])
    date_list.append(data['reviewTime'][cur_index])
    reviewID_list.append(data['reviewerName'][cur_index])
    title_list.append(data['summary'][cur_index])

for i in range(spam_review.shape[0]):
    cur_index = spam_review.index[i]
    if spam_review['rating'][cur_index] <3:
        emotion_list.append(emotion_classifier[0].predict(spam_review['content'][cur_index])[0])
    elif spam_review['rating'][cur_index] ==3:
        emotion_list.append(emotion_classifier[1].predict(spam_review['content'][cur_index])[0])
    else:
        emotion_list.append(emotion_classifier[2].predict(spam_review['content'][cur_index])[0])
    intent_list.append('spam')
    productID_list.append(data['asin'][cur_index])
    date_list.append(data['reviewTime'][cur_index])
    reviewID_list.append(data['reviewerName'][cur_index])
    title_list.append(data['summary'][cur_index])

edf = pd.DataFrame(emotion_list)
idf = pd.DataFrame(intent_list)
productID_df = pd.DataFrame(productID_list)
date_df = pd.DataFrame(date_list)
reviewID_df = pd.DataFrame(reviewID_list)
title_df = pd.DataFrame(title_list)

preprocessed_data = preprocessed_data.reset_index()
preprocessed_data = preprocessed_data.drop('index', axis = 1)

result = pd.concat((productID_df, reviewID_df, title_df, date_df, preprocessed_data, edf,idf), axis =1)
result.columns = ['asin', 'reviewerName', 'summary', 'reviewTime', 'overall', 'reviewText', 'emotion', 'intent']
for i in range(spam_review.shape[0]):
    result.set_value(preprocessed_data.shape[0]+i, 'overall', spam_review['rating'][spam_review.index[i]])
    result.set_value(preprocessed_data.shape[0]+i, 'reviewText', spam_review['content'][spam_review.index[i]])
result.to_csv("model_result.csv")
#print(result)


### save as json
data = result
sourceSite = ['amazon', 'ebay']
urlList = ['https://www.amazon.com/product-reviews/', 'https://www.ebay.com']
sentimentList = [[0.0, 0.0, 0.0, 1.0, 1.0], [0.0, 0.0, 1.0, 0.0, 0.0], [1.0, 1.0, 0.0, 0.0, 0.0]]   #[0]: positive / [1]: neutral / [2]: negative


userEmail = sys.argv[2]    # the email of user who search the data
#userEmail = 'abcd@gmail.com'
resultData = np.empty((0))
idCount = 1


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
        "negative": sentimentList[2][int(data.ix[i]['overall'])-1],
        "neutral": sentimentList[1][int(data.ix[i]['overall'])-1]
    }
    intent = {
        "spam": float('spam'==str(data.ix[i]['intent'])),
        "question": float('question'==str(data.ix[i]['intent'])),
        "complaint": float('complaint'==str(data.ix[i]['intent'])),
        "suggestion": float('suggestion'==str(data.ix[i]['intent'])),
        "compliment": float('compliment'==str(data.ix[i]['intent']))
    }
    emotion = {
        "happy": float('happy'==str(data.ix[i]['emotion'])),
        "angry": float('angry'==str(data.ix[i]['emotion'])),
        "sad": float('sad'==str(data.ix[i]['emotion'])),
        "hate": float('hate'==str(data.ix[i]['emotion'])),
        "unsatisfied": float('unsatisfied'==str(data.ix[i]['emotion'])),
        "satisfied": float('satisfied'==str(data.ix[i]['emotion']))
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
resultPath = os.path.join(os.getcwd(), '../result_jsons', resultName)
f = open(resultPath, 'w')
f.write(resultJson)
f.close()
print(resultName)

endTime = time.clock()
#print(endTime - startTime)