# octofications

currently no fancy installations or startup, just clone and do
```
	node index
```
of course some configuration is needed, naturally its using [rc](https://github.com/dominictarr/rc): 
```
{
	"authenticationToken": "yourAuthToken",
	"user": "yourGithubUser",
	"pollIntervalInSeconds": 60	
}
```
if its not working then check that you set the proper permissions for the token

when starting up you will get a flush of notifications, but after that only new ones will be showns.

this is based on [node-notifier](https://github.com/mikaelbr/node-notifier) so out of the box it works on linux and mac, windows requires [growl](http://growl.info/).