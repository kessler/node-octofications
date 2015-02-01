var path = require('path')
var isos = require('isos')

if (isos('osx')) {
	module.exports = itemToMessageMac
} else {
	module.exports = itemToMessage
}

var icon = path.join(__dirname, 'ironcat.jpg')

function itemToMessageMac(item) {
	return { title: item.author, subtitle: item.title.replace(item.author, ''), message: item.link.replace('https://github.com/', '') + '\n' + item.title, open: item.link }
}

function itemToMessage(item) {
	return { title: item.title, message: item.link, icon: icon}
}