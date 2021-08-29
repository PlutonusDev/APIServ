const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const winston = require("winston");

class Logger {
	constructor(label = "unknown") {
		label = label.toLowerCase();
		if(!fs.existsSync(path.join(__dirname, "../logs"))) fs.mkdirSync(path.join(__dirname, "../logs"));

		this.logger = winston.createLogger({
			levels: {
				"fatal": 0,
				"error": 1,
				"warning": 2,
				"http": 3,
				"info": 4,
				"debug": 5
			},
			format: winston.format.json(),
			defaultMeta: {
				service: "apiserv",
			},
			transports: [
				new winston.transports.File({ filename: path.join(__dirname, "../logs", "error.log"), level: "error" }),
				new winston.transports.File({ filename: path.join(__dirname, "../logs", "combined.log") })
			],
			format: winston.format.combine(
				winston.format.label({ label }),
				winston.format.timestamp(),
				winston.format.printf(({ level, message, label, timestamp }) => {
					return `{service:"apiserv/${label}",timestamp:"${timestamp}",level:"${level}",message:"${message}"}`;
				})
			)
		});

		if(process.env.NODE_ENV !== "production") {
			this.logger.add(new winston.transports.Console({
				format: winston.format.combine(
					winston.format.label({ label }),
					winston.format.timestamp(),
					winston.format.printf(({ level, message, label, timestamp }) => {
						return `\t${chalk.green(timestamp)} [${chalk.bold.blue(`apiserv/${label}`)}] ${chalk.magenta(level)} > ${message}`;
					})
				)
			}));
		}

		return this;
	}

	log = (message, level = "info") => this.logger.log(level, message);
}

module.exports = label => new Logger(label);
