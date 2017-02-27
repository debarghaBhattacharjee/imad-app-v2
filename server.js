var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.use(express.static("public"));
app.use('/home', express.static(__dirname+'/home'));

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

app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'home', 'home.html'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
