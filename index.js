var config = require('./lib/config.js');
var pollFeed = require('./lib/pollFeed.js');
var FeedParser = require('feedparser');
var notifier = require('node-notifier');
var lruCache = require('lru-cache');
var debug = require('debug')('octofications');
var schedule = require('tempus-fugit').schedule;
var inspect = require('util').inspect;
var itemToMessage = require('./lib/itemToMessage.js');

var EventEmitter = require('events').EventEmitter;

var options = {
	maxAge: 1000 * 60 * 60 * 24,
	max: 1000
};

var cache = lruCache(options);
var feedEmitter = new EventEmitter();
var firstLaunch = true;

feedEmitter.on('item', function(item, count) {
	if (!cache.get(item.title)) {
		debug('feed item %s, %s, fl: %s', item.title, item.link, firstLaunch);

		// avoid the swamp of old feed items when launching 1st time
		//if (!firstLaunch) {
			setTimeout(function() {			
				notifier.notify(itemToMessage(item));
			}, count * 5000);
		//}

		cache.set(item.title, true);
	}
});

feedEmitter.on('end', function() {

	firstLaunch = false;
});

var job = schedule(config.pollInterval, pollFeed(feedEmitter));

debug('feed job scheduled, %s', inspect(job));
