var rc = require('rc');
var defaults = {
	authenticationToken: 'yourAuthToken',
	user: 'yourGithubUser',
	pollInterval: {
		second: 60
	}
};

module.exports = rc('octofications', defaults);
