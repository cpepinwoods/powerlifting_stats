import requests
from bs4 import BeautifulSoup
import csv
import sys

response = requests.get(sys.argv[1])
soup = BeautifulSoup(response.text, 'html.parser')

name = soup.find('h3').contents[0]

tables = soup.find_all('table')

year = tables[0].contents[1].find_all('td')[1].contents[0].split('-')[1]

compname = year + "_" + name.replace(' ', '_')

tables = tables[1].contents
# lifters[1] is the first row of the table, which contains the column headers
# lifters[3] is all the lifters
lifters = tables[3].contents
lifters = "".join(str(x) for x in lifters)
categories = lifters.split('<th colspan=\"20\">')

def makeArr(arr):
    ret = []
    for i in range(len(arr)):
        entry = arr[i].split('</td>')
        for j in range(len(entry)):
            row = entry[j]
            if row == '\n':
                continue
            if row.find('<a href') != -1:
                row = row.split('>')
                row = row[2]
                row = row[:-3]
                entry[j] = row.strip()
            else:
                row = row.split('>')
                row = row[1]
                entry[j] = row.strip()
        ret += [entry[:-3]]
    ret = filter(lambda x: len(x) == 20, ret)
    ret = list(ret)
    return ret

lifters = {}

for category in categories:
    category = category.split('<tr>')
    label = category[0].split('<')[0].strip()
    category = category[2:]
    category = makeArr(category)
    lifters[label] = category


all = []
for key in lifters:
    for lifter in lifters[key]:
        k = [key]
        k.extend(lifter)
        all.append(k)

filename = './meets/%s.csv' % compname

with open(filename, 'w', newline = '') as f:
    writer = csv.writer(f)
    writer.writerows(all)