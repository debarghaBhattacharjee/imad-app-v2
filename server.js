var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var crypto = require('crypto');
var bodyParser= require('body-parser');
var session= require('express-session');


var config = {
  host: 'db.imad.hasura-app.io',
  user: 'debarghabhattacharjee',
  password: process.env.DB_PASSWORD,
  database: 'debarghabhattacharjee',
  port: '5432'
};

var pool= new Pool(config);

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use('/', express.static(__dirname+'/ui'));

app.use(session({
	secret: 'SomeRandomString',
	cookie: {maxAge: 1000* 60 * 60* 24* 30}
}));


/* --------------------------------------------------------------------------------------------------------------------------------- */

app.post('/register', function(req, res) {
	console.log(req.body);
	var fname= req.body.fname;
	var lname= req.body.lname;
	var email= req.body.email;
	var username= req.body.uname;
	var password= req.body.psw;
	
	
	var salt= crypto.randomBytes(128).toString('hex');
	var dbString= hash(password, salt);
	
	pool.query('INSERT INTO scoopbook_data (fname, lname, email, username, password) VALUES($1, $2, $3, $4, $5);', [fname, lname, email, username, dbString], 
	function(err, result) {
		if(err) {
			console.log(req.body);
			res.status(500).send(err.toString());
		}
		else {
			res.send("Registration successful...");
		}
	});
});	

app.post('/login', function(req, res) {
	var username= req.body.uname;
	var password= req.body.psw;
	
	pool.query('SELECT * FROM scoopbook_data WHERE username= $1;', [username], function(err, result) {
		if(err) {
			res.status(500).send(err.toString());
		}
		else {
			if(result.rows.length=== 0) {
				res.status(403).send('username/password is invalid...');
			}
			else {
				var dbString= result.rows[0].password;
				var salt= dbString.split("$")[2];
				var hashedPassword= hash(password, salt);

				if(hashedPassword=== dbString) {
					//Set session
					var fname= result.rows[0].fname;
				    req.session.auth= {userId: result.rows[0].id, fname: fname};
					res.send(fname);
				}
				else {
					res.status(403).send('username/password is invalid...');
				}
			}
		}
	});		
});	

app.get('/check-login', function(req, res) {
	if(req.session &&  req.session.auth && req.session.auth.userId) {
		res.send(req.session.auth.fname);
	}
	else {
		res.status(403).send('You are not logged in...');
	}
});

app.get('/logout', function(req, res) {
	delete req.session.auth;
	res.send('Successfully logged out...');
});

function hash(input, salt) {
	var hashed= crypto.pbkdf2Sync(input, 'salt', 10000, 512, 'sha512');
	return ["pbkdf2Sync", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/:pageName', function(req, res) {
	var pageName= req.params.pageName;
	if(pageName=== 'about') {
		res.send(webPages[pageName]);
	}
	else if(pageName=== 'archive') {
		pool.query("SELECT title, author FROM scoopbook_articles", function(err, result) {
			if(err) {
				res.status(500).send(err.toString());
			}
			else {
				var len= result.rows.length;
				if(len=== 0) {
					res.status(404).send("No article found.");
				}
				else {
					var data1= [], data2=[];
					for(var i= 0; i< len; i++) {
						data1.push(result.rows[i].title);
						data2.push(result.rows[i].author);
					}
					res.send(JSON.stringify({pageContent: webPages[pageName], data1: data1, data2: data2}));
				}
			}
		});
	}
});


var webPages= {
	'about':  `
				<!-- section-1 -->

				<div class="section-1" id="aboutSection1">
					<div class="container">
					<div class="row">
					  <div class="col-sm-3">
						<img src="images/profile-pic.jpg"  id="section-1_about" alt="Placeholder image">
					  </div>
					  
					  <div class="col-sm-1"></div>
						<div class="col-sm-8">
							<h1>DEBARGHA BHATTACHARJEE</h1>
							<h3>Web Developer</h3>
							<hr>
							<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in.
							</p>
							
						</div>
						
					  </div>
					<div class="row">
						  <div class="col-sm-4"></div>
						  <div class="col-sm-8" id="linkSocial">
							  <img src="images/facebook.png" alt="Placeholder image">
							  <img src="images/twitter.png" alt="Placeholder image">
							  <img src="images/youtube.png" alt="Placeholder image">
						  </div>
						</div>
					
					  <div class="row" id="sectionLink1">
						  <div class="col-sm-5"></div>
						  <div class="col-sm-2">
							  <button type="button" class="btn btn-lg btn-default" onClick="hideSection1(), showSection2()">
								  <span class="glyphicon glyphicon-hand-down"></span>
								  NEXT PAGE
							  </button>
						  </div>
						  <div class="col-sm-5"></div>
					  </div>
						
					</div>
				</div>

				<!-- section-2 -->

				<div class="section-2" id="aboutSection2">
				  <div class="container">
					<div class="row">
					  <div class="col-sm-3">
						  <h1>PERSONAL DETAILS</h1>
					  </div>
					  <div class="col-sm-2"></div>
					  <div class="col-sm-7">
						  <hr>
							  <p><span>Email :</span> debarghab.kvdima@gmail.com</p>
							  <p><span>Website :</span> scoopbook.com</p>
							  <p><span>Phone :</span> (+91)7872 - 863711</p>
							  <p><span>Address :</span> Alipurduar, West Bengal</p>
						  
					  </div>
					</div>
					<br><br><br>
					<div class="row">
					  <div class="col-sm-3">
						<h1>EDUCATIONAL DETAILS</h1>
					  </div>
					  <div class="col-sm-2"></div>
					  <div class="col-sm-7">
						<hr>
							<p>
								<span>Class 10 :</span> Kendriya Vidyalaya Alipurduar Jn <br>
								<span>Marks Obtained :</span> CGPA 10
							</p>
							
							<p>
								<span>Class 12 :</span> Kendriya Vidyalaya Alipuduar Jn <br>
								<span>Marks Obtained :</span> 92 %
							</p>
							
							<p>
								<span>B.Tech :</span> Haldia Institute of Technology <br>
								<span>Department :</span> Computer Science and Engineering
							</p>
					  </div>
					</div>
					
					  <div class="row" id="sectionLink2">
						  <div class="col-sm-4"></div>
						  <div class="col-sm-2">
							  <button type="button" class="btn btn-lg btn-default" onClick="hideSection2(), showSection3()">
								  <span class="glyphicon glyphicon-hand-down"></span>
								  NEXT PAGE
							  </button>
						  </div>
						  <div class="col-sm-2">
							  <button type="button" class="btn btn-lg btn-default" onClick="hideSection2(), showSection1()">
								  <span class="glyphicon glyphicon-hand-up"></span>
								  PREV PAGE
							  </button>
						  </div>
						  <div class="col-sm-4"></div>
					  </div>
				</div>
				</div>

				<!-- section-3 -->

				<div class="section-3" id="aboutSection3">
				  <div class="container">
					<div class="row">
					  <div class="col-sm-3">
						<h1>ACHEIVEMENTS</h1>
					  </div>
					  <div class="col-sm-2"></div>
					  <div class="col-sm-7">
						<hr>
							<p>
								<span>Competition :</span> Thinkquest Narrative Comepetition, 2009 <br>
								<span>Position :</span> 2nd, Worldwide
							</p>
							
							<p>
								<span>Competition :</span> Lions Club Painting Competition <br>
								<span>Position :</span> 1st, Statewise
							</p>
					  
					  </div>
					</div>
				   
					<br><br><br>
					
					<div class="row">
					  <div class="col-sm-3">
						<h1>HOBBIES</h1>
					  </div>
					  <div class="col-sm-2"></div>
					  <div class="col-sm-7">
						<hr>
						<p> <span>Playing Guitar</span> </p>
						 <p> <span>Painting</span> </p>
						 <p> <span>Blogging</span> </p>
					  </div>
					</div>
					
					<br><br><br>
					
					 <div class="row">
					   <div class="col-sm-2"></div>
						<div class="col-sm-3">
							<button type="button" class="btn btn-success">DOWNLOAD CV</button>
						</div>
						<div class="col-sm-3">
							<button type="button" class="btn btn-success">BEHANCE</button>
						</div>
						<div class="col-sm-3">
							<button type="button" class="btn btn-success">GITHUB</button>
						</div>
						<div class="col-sm-1"></div>
					 </div>
					
					  <div class="row" id="sectionLink3">
						  <div class="col-sm-5"></div>
						  <div class="col-sm-2">
							  <button type="button" class="btn btn-lg btn-default" onClick="hideSection3(), showSection2()">
								  <span class="glyphicon glyphicon-hand-up"></span>
								  PREV PAGE
							  </button>
						  </div>
						  <div class="col-sm-5"></div>
					  </div>
					
				  </div>
				</div>
		      `
	,
	
	'archive': `
				  <div class="section-1" id="archiveSection1">
					<div class="container">
					<div class="row">
					  <div class="col-sm-1"></div>
						<div class="col-sm-10">
						  <input type="text" id="archiveInput" onkeyup="searchArchive()" placeholder="Search for articles.." title="Type in a name">
						</div>
					  <div class="col-sm-1"></div>
					</div>
					<div class="row">
					  <div class="col-sm-1"></div>
						<div class="col-sm-10">
				  
						</div>
					  <div class="col-sm-1"></div>
					</div>
					
					<div class="row">
					  <div class="col-sm-1"></div>
						<div class="col-sm-10" id="tablePlaceholder">

							<!-- create table here -->
                            
						</div>
					  <div class="col-sm-1"></div>
					</div>
					
						
					</div>
				  </div>
			  `   
}



/* ------------------------------------------------------------------------------------------------------------------------------------- */
		

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`Scoopbook app listening on port ${port}!`);
});
