from flask import Flask, request, jsonify
from random import randint
import json
from cross import crossdomain


app = Flask(__name__)
leaders = {}


def init():
  i = 0
	for name in ['Bob', 'Eric', 'Jason', 'Victor', 'Tor', 'Katie', 'Lia', 'Yazmin', 'Rob Stark', 'AAA']:
		info = {'name': name, 'day': randint(1,20), 'powerups': randint(1,20), 'score': randint(-60,50) * 1000, ip:None}
		leaders[i] = info
    i += 1

@app.route('/', methods=['GET', 'POST'])
@crossdomain(origin='*')
def leaderboard():
    global leaders
    if request.method == 'POST':
      data = json.loads(request.data)
      ip = request.remote_addr
      info = {'name': data['name'], 'day': data['day'], 'powerups': data['powerups'], 'score': data['score']}
      leaders[ip] = info
      return 'success'
    else:
      top10 = sorted(leaders, key=lambda x: int(x['score']),reverse=True)
    	ranks = dict((key, value) for (key, value) in enumerate(top10))
    	return json.dumps(ranks)

if __name__ == '__main__':
	init()
	app.run(host='0.0.0.0')




