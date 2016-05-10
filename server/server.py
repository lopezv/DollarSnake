from flask import Flask, request, jsonify
from random import randint

app = Flask(__name__)


leaders = []

def init():
	for name in ['Bob', 'Eric', 'Jason', 'Victor', 'Tor', 'Katie', 'Lia', 'Yazmin', 'Rob Stark', 'AAA']:
		info = {'name': name, 'day': randint(1,20), 'powerups': randint(1,20), 'score': randint(0,2000)}
		leaders.append(info);
	return sorted(leaders, key=lambda x: x['score'],reverse=True)[:10]


@app.route('/', methods=['GET', 'POST'])
def leaderboard():
    if request.method == 'POST':
		info = {'name': request.form['name'], 'day': request.form['day'], 'powerups': request.form['powerups'], 'score': request.form['score']}
		leaders.append(info);
		leaders = sorted(leaders, key=lambda x: x['score'],reverse=True)[:10]
    else:

    	ranks = dict((key, value) for (key, value) in enumerate(leaders))
    	return jsonify(**ranks)

if __name__ == '__main__':
	leaders = init()
	app.run()
