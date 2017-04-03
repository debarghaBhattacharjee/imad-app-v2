function loadAbout() {
  var req1 = new XMLHttpRequest();
  req1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("content").innerHTML = this.responseText;
	 custom1();
    }
  };
  req1.open("GET", "/about", true);
  req1.send();
}

function loadArchive() {
  var req1 = new XMLHttpRequest();
  req1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var myArr= JSON.parse(this.responseText);
     document.getElementById("content").innerHTML = myArr.pageContent;
	 createTable(myArr.data1, myArr.data2);
	 custom1();
    }
  };
  req1.open("GET", "/archive", true);
  req1.send();
}

function loginInit(){
  var req = new XMLHttpRequest();
  var y =0;
  req.onreadystatechange=function(){
      if(this.readyState===4 && this.status==403){
        
      }else if(this.readyState===4){
        onLoginSuccess(this.responseText);
		window.scrollTo(0, 0);
      }
    }
    req.open('GET','/check-login',true);
    req.send();
//  }
}


function login() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        console.log(this.responseText);
		onLoginSuccess(this.responseText);
		window.scrollTo(0, 0);
	  }
      else if (request.status === 403) {
        alert('Username or password incorrect');
      }
      else if (request.status === 500) {
        alert('Something went wrong');
      }
    }	
  };
  var uname = document.getElementById('loginForm').elements[0].value;
  var psw = document.getElementById('loginForm').elements[1].value;
  
  request.open('POST','/login',true);
  request.setRequestHeader('Content-Type', 'application/json');
  
  request.send(JSON.stringify({uname: uname, psw: psw}));
}

function logout() {
  var req = new XMLHttpRequest();
  var y =0;
  req.onreadystatechange=function(){
      if(this.readyState===4 && this.status==403){
        
      }else if(this.readyState===4){
        onLogoutSuccess();
		window.scrollTo(0, 0);
      }
    }
    req.open('GET','/logout',true);
    req.send();
//  }
}

function register() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
		showForm();
	  }
      else if (request.status === 403) {
        alert('Registration failed...');
      }
      else if (request.status === 500) {
        alert('Something went wrong');
      }
    }
  };
  var fname = document.getElementById('regForm').elements[0].value;
  var lname = document.getElementById('regForm').elements[1].value;
  var email = document.getElementById('regForm').elements[2].value;
  var uname = document.getElementById('regForm').elements[3].value;
  var psw = document.getElementById('regForm').elements[4].value;
  
  request.open('POST','/register',true);
  request.setRequestHeader('Content-Type', 'application/json');
  
  request.send(JSON.stringify({fname: fname, lname: lname, email: email, uname: uname, psw: psw}));
}
	