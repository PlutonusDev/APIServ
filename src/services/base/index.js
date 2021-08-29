const fs = require("fs");
const path = require("path");
const express = require("express");
const service = require("../../util/service");

const handler = new service({
	name: "base",
	endpoint: "/"
});

handler.router.get("/", (req, res) => {
	fs.readdir(path.join(__dirname, "../"), (e, services) => {
		let available = [];
		services.forEach(service => {
			try {
				available.push(require(path.join(__dirname, "../", service, "index.js")));
			} catch {}
		});
		res.status(200).json(available);
	});
});

module.exports = handler;
