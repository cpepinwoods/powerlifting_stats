import pandas as pd
import numpy as np
import sys
import json

# This class is used to convert numpy objects to json objects
class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.int64):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

# Print a list with better formatting
def prettyprint(l):
    out = "["
    for i in l:
        out += str(i) + ", "
    out = out[:-2] + "]"
    return out

# read in the data
path = "public/meets/" + sys.argv[1]
try:
    df = pd.read_csv(path, encoding='cp1252')
except Exception as error:
    print(error)

# rename the columns
df.columns = ['Division', 'Weight Class', 'Place', 'Name', 'Birth_Year', 'Team', 'State', 'Lot Number', 
            'Body Weight', 'Squat1', 'Squat2', 'Squat3', 'Bench1', 'Bench2', 'Bench3', 'Deadlift1', 'Deadlift2', 'Deadlift3',
            'Total', 'Dots', 'Bench Dots']

# filter data based on options
if sys.argv[2] == "both":
    pass
elif sys.argv[2] == "male":
    df = df[df['Division'].str.contains("Male")]
elif sys.argv[2] == "female":
    df = df[df['Division'].str.contains("Female")]

# get specified gear type
equipment = sys.argv[4]
if equipment == "Raw":
    df = df[df['Division'].str.contains("Raw")]
elif equipment == "Equipped":
    df = df[~df['Division'].str.contains("Raw")]
    
# get the specified lift
lift = sys.argv[3]

if lift == "Squat":
    df = df[["Squat1", "Squat2", "Squat3"]].max(axis=1)
elif lift == "Bench":
    df = df[["Bench1", "Bench2", "Bench3"]].max(axis=1)
elif lift == "Deadlift":
    df = df[["Deadlift1", "Deadlift2", "Deadlift3"]].max(axis=1)
elif lift == "Total":
    df = df['Total']

df = df.dropna()
df[df < 0] = 0

# create the histogram from the data
data = df.to_numpy()
data = np.histogram(data, bins=50)
freq = data[0]
vals = data[1]
out = {"freq": list(freq), "vals": list(vals)}

# Output it as a json object
try:
    print(json.dumps(out, cls=NpEncoder))
except Exception as error:
    print(error)
