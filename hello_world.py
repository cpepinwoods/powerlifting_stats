import requests
from bs4 import BeautifulSoup
response = requests.get('https://usapl.liftingdatabase.com/competitions-view?id=120525')
soup = BeautifulSoup(response.text, 'html.parser')

tables = soup.find_all('table')
tables = tables[1].contents
# lifters[1] is the first row of the table, which contains the column headers
# lifters[3] is all the lifters
lifters = tables[3].contents
lifters = "".join(str(x) for x in lifters)
lifters = lifters.split('<td></td>')
print(lifters[0])