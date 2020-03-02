app.personTableData = "";
app.localform = "";
app.init= function() {

	service.doGet('GET','html/search.html',false);
    document.getElementById('app').innerHTML = service.response;

    service.doGet('GET','html/tablehead.html',false);
	document.getElementById('app').innerHTML += service.response;

	service.doGet('GET','html/form.html',false);
	document.getElementById('app').innerHTML += service.response;
}

 app.searchData = function(){
 	var data=document.getElementById('searchData').value;
 	service.doGet('GET', 'http://192.168.1.11/sit_web_backend/api/event2020Controller.php?input='+data+'&mode=reglist', false);
 	app.personTableData = JSON.parse(service.response);
 	app.createPersonListTable();
 	return false;
 }

 app.createPersonListTable = function() {
	for(var i = 0; i< app.personTableData.length; i++) {
         service.doGet('GET', '../html/tabledata.html', false);
         var personTable = service.response;
         personTable = personTable.replace('xxx', app.personTableData[i].name);
         personTable = personTable.replace('yyy', app.personTableData[i].id);
         personTable = personTable.replace('zzz', app.personTableData[i].email);
         personTable = personTable.replace('aaa', app.personTableData[i].mobile);
         personTable = personTable.replace('bbb', app.personTableData[i].collegename);
         document.getElementById('personTableBody').innerHTML = personTable;
         document.getElementById('del-button').setAttribute("onclick",'app.explore('+i+')');
     }
 }

 app.explore = function(id) {
 	app.localform = app.personTableData[id];
    document.getElementById('pname').value =app.localform.name;
    document.getElementById('pid').value =app.localform.id;
    document.getElementById('email').value =app.localform.email;
    document.getElementById('mnber').value =app.localform.mobile;
    document.getElementById('cname').value =app.localform.collegename;
    document.getElementById('yr').value =app.localform.year;
    document.getElementById('psts').value =app.localform.payment_status;
    document.getElementById('tid').value =app.localform.transaction_id;
    document.getElementById('mac').value =app.localform.mac;
    document.getElementById('dept').value =app.localform.department;   
    document.getElementById('Confirm-button').setAttribute("onclick",'app.confirm('+app.localform.id+')');
    document.getElementById('Edit-button').setAttribute("onclick",'app.editPersonSubmit()');
    document.getElementById('Cancel-button').setAttribute("onclick",'app.reload()');
}
app.confirm = function(id){

	service.doGet('GET','http://192.168.1.11/sit_web_backend/api/event2020Controller.php?status=APPROVED&mode=updatestatus&id='+id, false);
	if (JSON.parse(service.response)==="Updated") {
		alert('APPROVED');
		app.reload();
	}
}

app.reload = function(){
	 window.location.reload();
}
app.editPersonSubmit =function(){
	name=document.getElementById('pname').value;
	id=document.getElementById('pid').value;
	email=document.getElementById('email').value;
	number=document.getElementById('mnber').value;
	college=document.getElementById('cname').value;
	year=document.getElementById('yr').value;
	pstatus=document.getElementById('psts').value;
	transaction=document.getElementById('tid').value;
	mac=document.getElementById('mac').value;
	dept=document.getElementById('dept').value;

	var url = "http://192.168.1.11/sit_web_backend/api/event2020Controller.php?id="+id+"&mode=updateperson&name="+name+"&mac="+mac+"&email="+email+"&mobile="+number+"&year="+year+"&txnid="+transaction+"&college="+college+"&pm="+pstatus+"&dept="+dept;
	service.doGet('GET', url, false);
	app.localform = service.response;
}