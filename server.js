var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


var friends = [
	{
		name: "Friend1",
		photo: "http://ib2.huluim.com/video/60665477?region=US&size=600x400",
		scores: ["1","1","1","1","1","1","1","1","1","1"]
	},
	{
		name: "Friend2",
		photo: "http://vignette4.wikia.nocookie.net/dragonball/images/3/3b/Kid_Goku_episode_1.jpg/revision/latest?cb=20120315174200",
		scores: ["5","5","5","5","5","5","5","5","5","5"]
	}
];


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'app/public/home.html'));
});

app.get('/survey', function(req, res) {
	res.sendFile(path.join(__dirname, 'app/public/survey.html'));
});

app.get('/api/friends', function(req, res) {
	res.status(201).json(friends);
});

app.post('/api/friends', function(req, res) {
	var newFriend = req.body;
	console.log(newFriend);

	function addUser() {
		friends.push(newFriend);
		res.json(friends);
	};

	function findFriend() {
		var allDif = [];
		for (var i = 0; i < friends.length; i++) {
			var totalDifference = 0;
			for (var x = 0; x < newFriend.scores.length; x++) {
				if (x === (newFriend.scores.length - 1)) {
					totalDifference += (Math.abs(newFriend.scores[x] - friends[i].scores[x]));
					allDif.push(totalDifference);
					totalDifference = 0;
				} else {
					totalDifference += (Math.abs(newFriend.scores[x] - friends[i].scores[x]));
				}
			}
		}

		console.log(allDif);
		var smallestDif = 100; // arbitrary large number that is greater than any possible totalDifference
		for (var i = 0; i < allDif.length; i++) {
			if (allDif[i] < smallestDif) {
				smallestDif = allDif[i];
			}
		}
// TODO: remove once Modal is working
		console.log('----------------------------------------')
		console.log('Matched Friend:')
		console.log(friends[allDif.indexOf(smallestDif)]);
		console.log('----------------------------------------')
	};

	findFriend();
	addUser();

});



app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});