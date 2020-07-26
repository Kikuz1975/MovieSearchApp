var express = require("express");
var app = express();
const request = require('request');
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search");
})
app.get("/results", function(req,res){
	var query = req.query.TROVA;
	console.log(query[0]);
	if(query[0]== "titolo"){
		var url2 = "t="
	}else{
		var url2 = "s="
	}
	var url1 = "http://omdbapi.com/?"
	var url3 = "&plot=full&apikey=thewdb"
	var url = url1 + url2+ query[1] + url3
	console.log(url);
	request( url, function(error, response, body){
	if(!error && response.statusCode == 200){
		var data = JSON.parse(body);
		if (data["Search"] != null){
			// console.log("ooook");
			var data1 = "Search";
			var data3 = data
			// var data3 = {}
			// var data4 = []
			// data4[0] = data;
			// data3.Title = data4;
			
		}else{
			var data1 = "Title";
			var data3 = {};
			var data4 = [];
			data4[0] = data
			data3.Title = data4
			
			
		}
		console.log(data3)
		if(data["Response"] == "False"){
			res.send("film non trovato, torna indietro!")
		}else{
		// res.send(result["Search"][0]["Title"]);
		res.render("results",{data: data3, data1: data1});
		}
	}	
	});
});



app.listen(2500, function(){
	console.log("Server Partito... Sfigati!")});