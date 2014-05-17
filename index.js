var config = require('./lib/config.js')
var feed = require('./lib/feed.js')
var FeedParser = require('feedparser')
var Notifier = require('node-notifier')
var lruCache = require('lru-cache')
var debug = require('debug')('octofications')
var schedule = require('tempus-fugit').scheduling.schedule
var inspect = require('util').inspect
var itemToMessage = require('./lib/itemToMessage.js')

var EventEmitter = require('events').EventEmitter
var notifier = new Notifier()
 
var options = { maxAge: 1000 * 60 * 60 * 24, max: 1000 }
var cache = lruCache(options)
var feedEmitter = new EventEmitter()
var firstLaunch = true

feedEmitter.on('item', function (item, count) {
	
	if (!cache.get(item.title)) {
		debug('feed item %s, %s, fl: %s', item.title, item.link, firstLaunch)
	
		if (!firstLaunch) {
			setTimeout(function () {			
				notifier.notify(itemToMessage(item))	
			}, count * 1000)
		}

		cache.set(item.title, true)
	}

})

feedEmitter.on('end', function () {
	firstLaunch = false
})
	
var job = schedule(config.pollInterval, feed(feedEmitter))

debug('feed job scheduled, %s', inspect(job))