var express = require('express');
var bp = require("body-parser");

var search = require('./search.js')

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bp.urlencoded());
app.use(bp.json());

app.get('/', function(req, res){
	res.render('main', {title: "CS 320 XML Wishlist Application", header: "Wishlist Application"});
})
app.post('/', function(req, res){
	res.render('return', {testMessage: "This is a test message"});
})


app.post('/api/product/search', function(req, res){
	
	

	var _search = req.body;
	
	//console.log(_search);
	//console.log(_search.searchTerm);
	var searchObject = {};
	if(_search.minPrice && _search.maxPrice){
		searchObject = {
			searchTerm: _search.searchTerm, 
			minPrice: _search.minPrice,
			maxPrice: _search.maxPrice
		}
	}else{
		searchObject = {
			searchTerm: _search.searchTerm 
		}
	}
	search.find(searchObject, function(errorInfo, returnArray){
		res.render('return', {error: errorInfo, array: returnArray});
	})
	//console.log(searchObject);

	//res.render('main', {title: "something posted" ,header: "Test"});
});
/*
var amazon = require("amazonapi");

amazon("playstation", function(err, res){
	if(err){
		console.log(err);
	}else{
		console.log(res);
	}
});*/



app.listen(port, function(){
	console.log('App is now listening on port ' + port);
});




/*searchObject = {
	searchTerm: 'Playstation'
}


walmart.search(searchObject, function(resp){
	console.log(resp);
}); */