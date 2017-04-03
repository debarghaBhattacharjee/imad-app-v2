// JavaScript Document
"use-strict";

var sectionCount= 0;
var x;

function custom1() {
	loginInit();
	var y1= document.getElementById("aboutSection1");
	var y2= document.getElementById("archiveSection1");
	var y3= document.getElementById("carousel1");
	
	console.log("custom1 works");
	window.scrollTo(0, 0);
	if(y1) {
		console.log("y1 executed1");
		resizeImg();
		resizeSection();
				
		window.onresize= function() {
			resizeSection();
			resizeImg();
		}
	}
	
	if(y2) {
		console.log("y2 executed1");
		resizeSection();
		window.onresize= function() {
			resizeSection();
		}
	}
}


function resizeSection() {
	$('#aboutSection1').css('height', window.innerHeight+'px');
	$('#aboutSection2').css('height', window.innerHeight+'px');
	$('#aboutSection3').css('height', window.innerHeight+'px');
   
}

function resizeImg() {	
    if(document.body.clientWidth >= 1000) {
	    document.getElementById("section-1_about").height= document.body.clientHeight* 0.4;
	}
	else if(document.body.clientWidth >= 768) {
	    document.getElementById("section-1_about").height= document.body.clientHeight* 0.3;
	}
	else {
		document.getElementById("section-1_about").height= document.body.clientHeight* 0.5;
	}
}

function hideSection1() {
    $('#aboutSection1').slideUp(500);
}

function showSection1() {
    $('#aboutSection1').slideDown(500);
}

function hideSection2() {
   $('#aboutSection2').slideUp(500);
}

function showSection2() {
    $('#aboutSection2').slideDown(500);
}

function hideSection3() {
    $('#aboutSection3').slideUp(500);
}

function showSection3() {
    $('#aboutSection3').slideDown(500);
}


function searchArchive() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("archiveInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("archiveTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}


function createTable(data1, data2) {
	var table, tr, th1, th2, content;
	var tablePlaceholder= document.getElementById("tablePlaceholder");
	
	table = document.createElement("TABLE");
	table.setAttribute("id", "archiveTable");
	table.setAttribute("width", "100%");
	table.setAttribute("border", "1");
	tablePlaceholder.appendChild(table);
	
	 
	 tr = document.createElement("TR");
	 tr.setAttribute("class", "header");
	 table.appendChild(tr);		

	 th1 = document.createElement("TH");
	 th1.setAttribute("width", "60%");
	 content = document.createTextNode("Article");
	 th1.appendChild(content);
	 
	 th2 = document.createElement("TH");
	 th2.setAttribute("width", "40%");
	 content = document.createTextNode("Author");
	 th2.appendChild(content);
	 
	 tr.appendChild(th1);
	 tr.appendChild(th2);
	
	 for (i = 0; i < data1.length; i++) {
		
		tr = document.createElement("TR");
		table.appendChild(tr);						
		 
		td1 = document.createElement("TD");
		
		content = document.createTextNode(data1[i]);
		td1.appendChild(content);
		
		
		td2 = document.createElement("TD");
		
		content = document.createTextNode(data2[i]);
		td2.appendChild(content);
		
		tr.appendChild(td1);
		tr.appendChild(td2);
	 }
 }
 
 $('#formLink').click(showForm);
 function showForm() {
    $('#login1').show();   
	hideRegister();
 }
 
 
$('.hideForm').click(hideForm);
function hideForm() {
    $('#login1').hide();
}

function hideRegister() {
    $('#regForm').hide();
	$('#loginForm').show();
}

function showRegister() {
	$('#loginForm').hide();
	$('#regForm').show();
}
 
$('#loginLink').click(hideRegister);
$('#regLink').click(showRegister);
 
 
 var restoreHome, restoreUpload, restoreAccount, restoreProfile, restoreShortcut;
 var restore1;
 
 function onLoginSuccess(data) {
   
	$('#profile, .loginHome, #loginUpload, #loginAccount').show();
	$('#loginParent1').prepend(restoreHome);
	$('#loginParent1').append(restoreUpload);
	$('#loginParent2').append(restoreAccount);
	$('#loginAccount').append(restoreProfile);
	$('#profile').html(data);
	
	restore1= $('#indexSec4').detach();
	restoreShortcut= $('#loginShortcut').detach();
	$('#login1 :input').attr('disabled', true);
	hideForm();	
}


function onLogoutSuccess() {
	restoreHome= $('.loginHome').detach();
	restoreUpload= $('#loginUpload').detach();
	restoreAccount= $('#loginAccount').detach();
	restoreProfile= $('#profile').detach();
	
	
	$('#login1 :input').attr('disabled', false);
	$('#content').append(restore1);
	$('#loginParent2').append(restoreShortcut);
}

function goToByScroll(id){
	console.log("this is"+ id);
    $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}


custom1();