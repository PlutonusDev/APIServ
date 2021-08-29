const crypto = require("crypto");
const express = require("express");

module.exports = class Service {
	constructor({ name = "unknown", endpoint = `/${crypto.randomBytes(4).toString("hex")}` }) {
		this.router = express.Router();
		this.endpoint = endpoint;
		this.name = name;
		this.log = require("./logger")(`srv/${this.name}`).log;
		this.log(`Initialized service "${name}" for "${endpoint}"`);
		return this;
	}

	addRouter({ serviceName, router, endpoint = `/${crypto.randomBytes(4).toString("hex")}` }) {
		this.log(`Added router "${serviceName || "unknown"}" to "${endpoint}"`);
		this.router.use(endpoint, router);
	}
}
