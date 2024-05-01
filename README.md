Howdy,

The premise of this app is pretty simple. I am a part of the Northeastern Powerlifting team and one thing that I think my sport is lacking is statistics and figures surrounding competitions and performance. Bearing this in mind, I wanted to make a web app that I could work on to display interesting information about different powerlifting meets. 

Usage is relatively straightforward: clone the repo, navigate to the api folder, npm install, npm start. In a new terminal navigate to the client folder, npm install, npm start. I have not tested this on a device besides my own, I apologize in advance if that does not actually work. If it does however, you should now be presented with the webpage. While it comes pre-loaded with several meets that you can look at, you can load any new meet you want into the app by navigating here: https://usapl.liftingdatabase.com/competitions clicking through to any competition, and putting it's URL into the top input box. 

When you click on a meet, it should display a histogram of the totals achieved at the meet (divided into 50 buckets). For any given meet you will probably observe a roughly bimodal distribution (women's totals, men's totals) and then a set of notable outliers at 0 (people who bombed out of the meet)

The tech stack for the project is straightforward, I'm creating the frontend elements with React and D3.js (first time using) and serving the backend elements with Express. Worth noting that I've set up the backend so that it is running Python scripts to do data analysis. Although it is currently not doing heavy lifting that really requires this, I plan to do more advanced stats in the future, and will appreciate the built in functionality of Pandas.
