var rc = require('rc')
var defaults = {
	authenticationToken: 'yourAuthToken',
	user: 'yourGithubUser',
	pollIntervalInSeconds: 60	
}

module.exports = rc('octofications', defaults)