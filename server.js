var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne= {
	title: 'Article One| Debargha Bhattacharjee'
	heading: 'Article One'
	date: '5 Sept, 2016, 7:20 PM IST'
	content: `<p>
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
};				

function createTemplete (data) {
	var title= data.title;
	var heading= data.heading;
	var date= data.date;
	var content= data.content; 
	
	var htmlTemplate= {
		`<!doctype html>
		<html>
			<head>
				${title}
				<link href="../ui/style.css" rel="stylesheet" />
			</head>
			<body>
			  <div class="configuration">
				<div>
					<a href="../ui/index.html">Home</a>
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

app.get('/article-one', function(req, res) {
	res.sendFile(createTemplate(articleOne));
});

app.get('/article-two', function(req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function(req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.lof(`IMAD course app listening on port ${port}!`);
});
