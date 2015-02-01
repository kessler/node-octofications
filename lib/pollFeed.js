var FeedParser = require('feedparser')

var https = require('https')
var config = require('./config')
var EventEmitter = require('events').EventEmitter
var debug = require('debug')('octofications:feed')
var util = require('util')

module.exports = function(emitter) {

	return function pollFeed(job) {

		debug('executing feed job')

		var parser = new FeedParser()

		var options = {
			hostname: 'github.com',
			port: 443,
			path: '/' + config.user + '.private.atom',
			method: 'GET',
			auth: config.authenticationToken + ':x-oauth-basic'
		}

		var req = https.request(options, function(res) {
			
			if (res.statusCode === 200) {
				debug('response from github ok.')
				res.pipe(parser)
			} else {
				debug('error getting feed')
				job.done()
			}
		})

		req.end()

		req.on('error', function(e) {
			debug('request error: %s', e)
			job.done(e)
		})

		parser.on('error', function(error) {
			debug('parser error: %s', error.toString())
			job.done(error)
		});

		var count = 0

		parser.on('readable', function() {
			// This is where the action is!
			var stream = this
			var meta = this.meta // **NOTE** the "meta" is always available in the context of the parser instance
			var item
			
			while (item = stream.read()) {
				emitter.emit('item', item, count++)
			}
		})

		parser.on('end', function () {
			emitter.emit('end')
			job.done()
		})
	}
}