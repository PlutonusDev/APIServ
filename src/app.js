const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const express = require("express");
const logger = require("./util/logger")("app");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
	logger.log(`${req.ip} requested ${req.method.toUpperCase()} ${req.url}`, "http");
	next();
});

function start() {
	return new Promise(async res => {
		logger.log("Initialising...");
		await fs.readdir(path.join(__dirname, "services"), (e, services) => {
			services.forEach(service => {
				try {
					const handler = require(path.join(__dirname, "services", service, "index.js"));
					app.use(handler.endpoint, handler.router);
					logger.log(`Bound service "${service}" to "${handler.endpoint}"`);
				} catch(e) {
					logger.log(`Failed to load "${service}" service: ${e.message.split("\n")[0]}`);
					console.log(`\n\t${chalk.red("ERROR STACK")} @ ${e.stack.split("\n").join("\n\t\t")}\n`)
				}
			});
		});

		/*app.use("*", (req, res) => {
			logger.log("404");
			res.status(404).send("Oops! There's nothing here.");
		});*/

		res(app.listen(80, () => {
			logger.log(`APIServ is running and bound to port 80`);
		}));
	});
}

module.exports = { start };
