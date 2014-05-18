var daemon = require("daemonize2").setup({
        main: "index.js",
        name: "node-octofications",
        pidfile: "node-octofications.pid"
    });

switch (process.argv[2]) {
case "start":
    daemon.start();
    break;
case "stop":
    daemon.stop();
    break;
default:
    console.log("Usage: [start|stop]");
}
