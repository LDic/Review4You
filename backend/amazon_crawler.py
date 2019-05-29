"""
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import urllib
"""
import pandas as pd
from bs4 import BeautifulSoup
import datetime
import requests
import time
import os
import sys

delay = 3

startTime = time.clock()

# HTTP GET Request
reqheader = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
}
asin = sys.argv[1]#'B000068NVI'

# get total page
url_total = 'https://www.amazon.com/product-reviews/'+str(asin)
res_total = requests.get(url_total, headers=reqheader)
html_total = res_total.text
html_total = html_total[html_total.find('total-review-count')-17:html_total.find('totalReviewCount')+100]
soup_total = BeautifulSoup(html_total, 'html.parser')
totalpage = int(soup_total.find('span', {'data-hook': "total-review-count"}).text.replace(',', ''))

# create table
result_df = pd.DataFrame(index=range(0, totalpage), columns=['asin', 'overall', 'reviewText' ,'reviewTime', 'reviewerName', 'summary'])
#print(result_df)

# get review result
result = []
for i in range(1, int(totalpage/10)+2):
    url = 'https://www.amazon.com/product-reviews/'+str(asin)+'/ref=cm_cr_arp_d_paging_btm_next_/'+str(i)+'?ie=UTF8&reviewerType=all_reviews&pageNumber='+str(i)
    #print(i)
    res = requests.get(url, headers=reqheader)
    html = res.text
    html = html[html.find('cm_cr-review_list')-9:html.find('a-spinner-wrapper reviews-load-progess aok-hidden a-spacing-top-large')-12]
    soup = BeautifulSoup(html, 'html.parser')
    reviewList = soup.find_all('div', {'data-hook':"review"})
    for i2 in range(len(reviewList)):
        reviewerID = reviewList[i2].find('span', {'class':'a-profile-name'}).text
        productID = asin
        title = reviewList[i2].find('a', {'data-hook':'review-title'}).text[:-1]
        content = reviewList[i2].find('span', {'data-hook':'review-body'}).text[:-1]
        date = reviewList[i2].find('span', {'data-hook':'review-date'}).text
        ratings = reviewList[i2].find('span', {'class':'a-icon-alt'}).text[:3]
        result_df.ix[(i-1)*10+i2] = [productID, ratings, content, date, reviewerID, title]
        result.append([productID, ratings, content, date, reviewerID, title])
#print(result_df)
endTime = time.clock()

# save file
userEmail = sys.argv[2]#'abcd@gmail.com'
resultName = 'scrapeResult_'+userEmail+'_'+str(datetime.datetime.now().strftime("%y-%m-%d-%H-%M-%S"))+'.csv'
filepath = os.path.join(os.getcwd(), 'scrape_result/'+userEmail, resultName)
filename = "./scrape_result/"+userEmail+"/"
os.makedirs(os.path.dirname(filename), exist_ok=True)
data = result_df.to_csv(filepath, index=False)
print(resultName)
#print(endTime - startTime)

"""
driver = webdriver.Chrome('D:/chromedriver')

# login
driver.get('https://www.amazon.com/product-reviews/B0781Z7Y3S')

reviewList = driver.find_element_by_xpath('//*[@id="cm_cr-review_list"]')
results = reviewList.text
result = []
items = results.split('\n')
items = items[1:]
for item in items:
    if item is not '':
        result.append(item)
    else:
        break
print(result[:-3])

endTime = time.clock()
print(endTime - startTime)
#print(reviewList[0].text)

startTime = time.clock()
driver.get('https://www.amazon.com/product-reviews/B0781Z7Y3S//ref=cm_cr_arp_d_paging_btm_next_2?pageNumber=2')

reviewList = driver.find_element_by_xpath('//*[@id="cm_cr-review_list"]')
results = reviewList.text
result = []
items = results.split('\n')
items = items[1:]
for item in items:
    if item is not '':
        result.append(item)
    else:
        break
print(result[:-3])
"""
"""
driver.find_element_by_xpath('//*[@id="streamer-login-area"]/a').click()
driver.implicitly_wait(delay)

driver.find_element_by_name('username').send_keys('canis617')
driver.find_element_by_name('password').send_keys('whdgus20203')
driver.find_element_by_xpath('//*[@id="loginForm"]/div[3]/button/span').click();
driver.implicitly_wait(delay)
driver.implicitly_wait(delay)

sleep(1)

driver.get('http://twip.kr/dashboard/donate')
driver.implicitly_wait(delay)
"""


