var walmart = require("walmart");
var ebay = require("ebayfinder");
var amazon = require("amazonapi");
var after = require("after");
var ebayKey = "ZacharyR-WVUPScho-PRD-645f30466-3a395526";
walmart.setApi("a6yhappxe2tcd2ukqkrtawxr");

module.exports = {
	find: function(queryObject, callback){
		
		var next = after(3, sendInfo);
		var results = {};
		var returnArray = [];
		var errorInfo = [];
		count = 0;

		console.log(queryObject.maxPrice);
		walmart.search(queryObject, function(err, resp){
			if(err){
				console.log(err);
				errorObject = { 
					"code": err.code,
					"message": err.message
				}
				errorInfo.push(errorObject)
			}else{
				for(i = 0; i<resp.length; i++){	
					returnArray.push(resp[i]);
				} 
			}
			next(null, results);
			//res.send(returnArray);
		});
		// EBAY
		var ebayMaxPrice = null;
		if(queryObject.maxPrice){
			ebayMaxPrice = queryObject.maxPrice;
		}
		ebay(ebayKey,queryObject.searchTerm, ebayMaxPrice, function(err, res){
			if(err){
				console.log("Ebay Error " + err);

			}else{
				for(i = 0; i<res.length; i++){
					if(res[i].reviews == "defaultReviews"){
						res[i].reviews = 0;
					}
					if(!res[i].numReviews){
						res[i].numReviews = 0;
					}
					returnArray.push(res[i]);
				}
			}
			next(null, results);
		});
		// END EBAY
		
		// AMAZON
		

		amazon.setApi("AKIAI7LCAK3FMX7NN47Q", "yAHkb+MUAwyV821RjTPiAW0EZCf3gk8M+oWA+tHO", "lcox2-20");

		amazon.search("Playstation", function(err, res){
			if(err){
				console.log("Amazon Error " + err);
			}else{
				for(i = 0; i<res.length; i++){
					returnArray.push(res[i]);
				}
				next(null, results);
			}
		})
		// END AMAZON
		function sendInfo(){
			callback(errorInfo, returnArray);
		}
	}
}