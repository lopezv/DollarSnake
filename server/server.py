from flask import Flask, request, jsonify
from random import randint
import json
from cross import crossdomain


app = Flask(__name__)

app


#app.debug = True
leaders = []

def init():
	for name in ['Bob', 'Eric', 'Jason', 'Victor', 'Tor', 'Katie', 'Lia', 'Yazmin', 'Rob Stark', 'AAA']:
		info = {'name': name, 'day': randint(1,20), 'powerups': randint(1,20), 'score': randint(-60,50) * 1000}
		leaders.append(info);
	return sorted(leaders, key=lambda x: int(x['score']),reverse=True)[:10]


@app.route('/', methods=['GET', 'POST'])
@crossdomain(origin='*')
def leaderboard():
    global leaders
    if request.method == 'POST':
      data = json.loads(request.data)
      info = {'name': data['name'], 'day': data['day'], 'powerups': data['powerups'], 'score': data['score']}
      leaders.append(info);
      leaders = sorted(leaders, key=lambda x: int(x['score']),reverse=True)[:10]
      return 'success'
    else:
    	ranks = dict((key, value) for (key, value) in enumerate(leaders))
    	return json.dumps(ranks)

if __name__ == '__main__':
	leaders = init()
	app.run(host='0.0.0.0')
