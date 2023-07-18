import os
import json
import datetime

def epochtranslate(epoch):
    return datetime.datetime.fromtimestamp(epoch).strftime("%c")

def loot(path):
    d = {'fullpath':  os.path.basename(path), 'filename': os.path.basename(path)[12:], 'uid': os.path.basename(path)[:10], 'created': epochtranslate(os.path.getctime(path)), "modified": epochtranslate(os.path.getmtime(path))}
    if os.path.isdir(path):
        d['filename'] = [loot(os.path.join(path,x)) for x in os.listdir(path)]
    return d

# print(json.dumps(loot('Server/UI/tiran/public/static/loot')))
