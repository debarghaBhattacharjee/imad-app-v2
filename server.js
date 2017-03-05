var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;

var config = {
  host: 'db.imad.hasura-app.io',
  user: 'debarghabhattacharjee',
  password: process.env.DB_PASSWORD,
  database: 'debarghabhattacharjee',
  port: '5432'
};


var app = express();
app.use(morgan('combined'));

app.use(express.static("public"));
app.use('/home', express.static(__dirname+'/home'));

app.use('/p6', express.static(__dirname+'/p6'));

var articles= {
	'article-one': {
		title: 'Article One| Debargha Bhattacharjee',
		heading: 'Article One',
		date: '5 Sept, 2016, 7:20 PM IST',
		content: 	`<p>n
						This is the first article. This was done by Debargha Bhattacharjee for testing purposes.
						The remaining lines would be just repetitions of the above lines.
					</p>
					<p>
						This is the first article. This was done by Debargha Bhattacharjee for testing purposes.
						The remaining lines would be just repetitions of the above lines.
					</p>
					<p>
						This is the first article. This was done by Debargha Bhattacharjee for testing purposes.
						The remaining lines would be just repetitions of the above lines.
					</p>`
	},
	'article-two': {
		title: 'Article Two| Debargha Bhattacharjee',
		heading: 'Article Two',
		date: '5 Sept, 2016, 7:25 PM IST',
		content: 	`<p>
						This is the second article. This was done by Debargha Bhattacharjee for testing purposes.
						The remaining lines would be just repetitions of the above lines.
					</p>
					<p>
						This is the second article. This was done by Debargha Bhattacharjee for testing purposes.
						The remaining lines would be just repetitions of the above lines.
					</p>
					<p>
						This is the second article. This was done by Debargha Bhattacharjee for testing purposes.
						The remaining lines would be just repetitions of the above lines.
					</p>`	
		
	},
	'article-three': {
		title: 'Article Three| Debargha Bhattacharjee',
		heading: 'Article Three',
		date: '5 Sept, 2016, 7:30 PM IST',
		content: 	`<p>
						This is the third article. This was done by Debargha Bhattacharjee for testing purposes.
						The remaining lines would be just repetitions of the above lines.
					</p>
					<p>
						This is the third article. This was done by Debargha Bhattacharjee for testing purposes.
						The remaining lines would be just repetitions of the above lines.
					</p>
					<p>
						This is the third article. This was done by Debargha Bhattacharjee for testing purposes.
						The remaining lines would be just repetitions of the above lines.
					</p>`
	}
};			

function createTemplate (data) {
	var title= data.title;
	var heading= data.heading;
	var date= data.date;
	var content= data.content; 
	
	var htmlTemplate= 
		`<html>
			<head>
				<title>${title}</title>
				<meta name="viewport" content="width-device-width, initial-scale=1" />
				<link href="../ui/style.css" rel="stylesheet" />
			</head>
			<body>
			  <div class="configuration">
				<div>
					<a href="/">Home</a>
				</div>
				<hr/>
				<h3>${heading}</h3>
				<div>${date}</div>
				<div>
					${content}
				</div>	
			  </div>
			</body>
		</html>`;
		
	return htmlTemplate;
}
	
	
		
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'home', 'home.html'));
});

app.get('/p6', function (req, res) {
  res.sendFile(path.join(__dirname, 'p6', 'index.html'));
});

var pool = new Pool(config)
app.get('/test-db', function(req, res) {
	pool.query('SELECT * FROM test', function(err, result) {
		if(err) {
			res.status(500).send(err.toString());
		}
		else {
			res.send(JSON.stringify(result));
		}
	});		
});

app.get('/:articleName', function(req, res) {
	//article-name== article-one
	//articles[article-name]== {} content object for article one
	var articleName= req.params.articleName;
	res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
