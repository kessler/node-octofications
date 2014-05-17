# octofications
github feed as notifications in your desktop
### install
currently no fancy installations or startup, just clone and do
```
	node index
```
_requires [node.js](http://nodejs.org) to be installed, obviously_
### configuration
of course some configuration is needed, naturally its using [rc](https://github.com/dominictarr/rc): 
```
{
	"authenticationToken": "yourAuthToken",
	"user": "yourGithubUser",
	"pollInterval": {
		"second": 60
	}	
}
```
There more information [here](https://github.com/kessler/tempus-fugit#the-interval-object) on how to customize pollInterval  
### misc.
if its not working then check that you set the proper permissions for the token

when starting up you will get a flush of notifications, but after that only new ones will be showns.

this is based on [node-notifier](https://github.com/mikaelbr/node-notifier) so out of the box it works on linux and mac, windows requires [growl](http://growl.info/).

### debug
linux based:
```
export DEBUG=octofications*
```
windows:
```
set DEBUG=octofications*
```
### todo
- daemonize 
- publish to npm
- change icon ?
- do something meaningful when notification is clicked (ie open a relevant webpage)