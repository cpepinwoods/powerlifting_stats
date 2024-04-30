import pandas as pd
import sys

df = pd.read_csv("public/meets/" + sys.argv[1])
df.columns = ['Division', 'Weight Class', 'Place', 'Name', 'Birth_Year', 'Team', 'State', 'Lot Number', 
              'Body Weight', 'Squat1', 'Squat2', 'Squat3', 'Bench1', 'Bench2', 'Bench3', 'Deadlift1', 'Deadlift2', 'Deadlift3',
              'Total', 'Dots', 'Bench Dots']
dots = df['Dots']
max_dot = dots.max()
min_dot = dots.min()
print("Max Dots: " + str(max_dot))