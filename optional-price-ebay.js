//Adapted from example by Ben Buckman
//https://github.com/benbuckman/nodejs-ebay-api/blob/master/examples/Finding-FindItemsByKeywords.js
var ebay = require('ebay-api');

/** Took out this require, kept throwing an error on my ends since I wasn't using dotenv */
//require('dotenv').config();

//Expose the finding function
//
/************************
***** Changed this so that instead of calling in ebay on my end, I call in ebay.search(). Yours Should be fine as-is, or you can change it to this way, whatever you think is best.
***************************/cd 
module.exports = {
    search: function(APIKEY, name, price, callback) {
        //Find by name and price with results limited to two
        
        /***************************************
        ** Error Checking to make price Optional
        ***************************************/
        if(price == null){
           var parameters = {
                keywords: [name],
                paginationInput: {
                    entriesPerPage: 2
                }
            } 
        }else{
            //console.log("price should not be 0")
            var parameters = {
                keywords: [name],
                paginationInput: {
                    entriesPerPage: 2
                },
                itemFilter: [
                    { name: 'MaxPrice', value: price }
                ],
            }
        }
        /************************************
        * End optional Price Logic
        * **********************************/


        /*********************************
        ** Cleaned All this up for my sake, was just having issues with my optional price logic, yours should be fine as is
        ************************************/
        var searchInfo = {
            serviceName: 'Finding',
            opType: 'findItemsByKeywords',
            appId: APIKEY,
            params: parameters,
            parser: ebay.parseResponseJson // (default)
        }
         //Send request
        ebay.xmlRequest(searchInfo, function itemsCallback(error, itemsResponse){
            if (error) {
                callback(error);
                return;
            }

            var items = itemsResponse.searchResult.item;
            //return array
            var returnArray = [];
            for (var i = 0; i < items.length; i++) {
                //Create a temp object each iteration
                var tempObj = {
                        id: items[i].itemId,
                        name: items[i].title,
                        price: items[i].sellingStatus.convertedCurrentPrice.amount,
                        salePrice: null,
                        category: items[i].primaryCategory.categoryName,
                        url: items[i].viewItemURL,
                        imageUrl: items[i].galleryURL,
                        provider: 'eBay',
                        reviews: null
                    }
                    //Add the found object to the array
                returnArray.push(tempObj);
            }
            //console.log(returnArray);
            callback(null, returnArray);
        });
    }
}