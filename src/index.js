const chalk = require("chalk");
const logger = require("./util/logger")("root");

console.log(`\n\n\tWelcome to ${chalk.green.bold("APIServ")} v${chalk.cyan.bold(require("../package.json").version)} by PlutonusDev.\n`);

const app = require("./app");
app.start().then(server => {
	const exitHandler = () => {
		if(server) {
			server.close(() => {
				logger.log("exitHandler called server close");
				console.log();
				process.exit(1);
			});
		} else process.exit(1);
	}

	const errorHandler = e => {
		logger.log(e.message, "error");
		exitHandler();
	}

	process.on("uncaughtException", errorHandler);
	process.on("unhandledRejection", errorHandler);

	process.on("SIGINT", () => {
		logger.log("Signal interrupt received");
		exitHandler();
	});
});
