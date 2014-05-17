// os sensitive conversion of an item to a notification message 

if (process.platform === 'darwin')
	module.exports = itemToMessageMac
else
	module.exports = itemToMessage

function itemToMessageMac(item) {
	return { title: item.author, subtitle: item.title.replace(item.author, ''), message: item.link + '\n' + item.title }
}

function itemToMessage(item) {
	return { title: item.title, message: item.link }
}