const express = require("express");
const service = require("../../util/service");

const handler = new service({
	name: "HelloWorld",
	endpoint: "/helloworld"
});

const v1 = require("./v1/");
handler.addRouter(v1);
v1.endpoint = "/";
handler.addRouter(v1);

//handler.router.get("/", (req, res) => res.status(200).send("Hello, world!"));

module.exports = handler;
