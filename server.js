'use strict';
const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
const runner = require('./test-runner');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, 'views', 'index.html'))
);

app.get('/hello', (req, res) => {
	const name = req.query.name || 'Guest';
	res.type('txt').send('hello ' + name);
});

const travellers = (req, res) => {
	let data = {};
	if (req.body && req.body.surname) {
		switch (req.body.surname.toLowerCase()) {
			case 'polo':
				data = {
					name: 'Marco',
					surname: 'Polo',
					dates: '1254 - 1324',
				};
				break;
			case 'colombo':
				data = {
					name: 'Cristoforo',
					surname: 'Colombo',
					dates: '1451 - 1506',
				};
				break;
			case 'vespucci':
				data = {
					name: 'Amerigo',
					surname: 'Vespucci',
					dates: '1454 - 1512',
				};
				break;
			case 'da verrazzano':
			case 'verrazzano':
				data = {
					name: 'Giovanni',
					surname: 'da Verrazzano',
					dates: '1485 - 1528',
				};
				break;
			default:
				data = {
					name: 'unknown',
				};
		}
	}
	res.json(data);
};
app.route('/travellers').put(travellers);

app.route('/_api/get-tests').get(
	cors(),
	(req, res, next) => {
		if (error || process.env.SKIP_TESTS)
			return res.json({ status: 'unavailable' });
		next();
	},
	(req, res, next) => {
		if (!runner.report) return next();
		res.json(testFilter(runner.report, req.query.type, req.query.n));
	},
	(req, res) => {
		runner.on('done', (report) => {
			process.nextTick(() =>
				res.json(testFilter(runner.report, req.query.type, req.query.n))
			);
		});
	}
);

const listener = app.listen(process.env.PORT || 3000, 'localhost', () => {
	const { address, port } = listener.address();
	console.log(`Server is listening at http://${address}:${port}`);
	// Comment the next line to run the tests when start the server
	// process.env.SKIP_TESTS = true;
	if (!process.env.SKIP_TESTS) {
		console.log('Running Tests...');
		setTimeout(() => {
			try {
				runner.run();
			} catch (err) {
				console.log('Tests are not valid:', err.message);
			}
		}, 1500);
	}
});

module.exports = app; // for testing

const testFilter = (tests, type, n) => {
	let out;
	switch (type) {
		case 'unit':
			out = tests.filter((t) => t.context.match('Unit Tests'));
			break;
		case 'functional':
			out = tests.filter(
				(t) => t.context.match('Functional Tests') && !t.title.match('#example')
			);
			break;
		default:
			out = tests;
	}
	if (n !== undefined) return out[n] || out;
	return out;
};
