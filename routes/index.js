const request = require('request');
const FeedParser = require('feedparser'); 
const express = require('express');
const router = express.Router();
var dataArray = [];

var req = request('http://www.masrawy.com/rssfeed/25/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1')
, feedparser = new FeedParser();

req.on('error', function (error) {
	console.log(err);
});
req.on('response', function (res) {
	var stream = this;
	
	if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
	
	stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
	// always handle errors
	console.log("error");
});
feedparser.on('readable', function() {
	// This is where the action is!
	var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;
	
	while (item = stream.read()) {
		dataArray.push(item);
	}
});



router.get('/', function(req, res){
	res.render('index/home', {data: dataArray});
});


module.exports = router;