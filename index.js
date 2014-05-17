var config = require('./lib/config.js')
var feed = require('./lib/feed.js')
var FeedParser = require('feedparser')
var Notifier = require('node-notifier')
var lruCache = require('lru-cache')
var debug = require('debug')('octofications')
var schedule = require('tempus-fugit').scheduling.schedule
var inspect = require('util').inspect
var itemToMessage = require('./lib/itemToMessage.js')

var notifier = new Notifier()
 
var options = { maxAge: 1000 * 60 * 60 * 24, max: 1000 }
var cache = lruCache(options)
 
function onFeedItem(item) {
	//console.log(inspect(item))
	if (!cache.get(item.title)) {
		debug('feed item %s, %s', item.title, item.link)

		notifier.notify(itemToMessage(item))

		cache.set(item.title, true)
	}
}

var interval = { second: config.pollIntervalInSeconds }
	
var job = schedule(interval, feed(onFeedItem))

debug('feed job scheduled, %s', inspect(job))