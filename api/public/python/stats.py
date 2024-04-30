import pandas as pd
import numpy as np
import sys
import json

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

def prettyprint(l):
    out = "["
    for i in l:
        out += str(i) + ", "
    out = out[:-2] + "]"
    return out

path = "public/meets/" + sys.argv[1]
try:
    df = pd.read_csv(path, encoding='cp1252')
except Exception as error:
    print(error)
df.columns = ['Division', 'Weight Class', 'Place', 'Name', 'Birth_Year', 'Team', 'State', 'Lot Number', 
            'Body Weight', 'Squat1', 'Squat2', 'Squat3', 'Bench1', 'Bench2', 'Bench3', 'Deadlift1', 'Deadlift2', 'Deadlift3',
            'Total', 'Dots', 'Bench Dots']
dots = df['Dots'].to_numpy()
dots = np.histogram(dots, bins=100)
freq = dots[0]
vals = dots[1]
out = {"freq": list(freq), "vals": list(vals)}
try:
    print(json.dumps(out, cls=NpEncoder))
except Exception as error:
    print(error)
