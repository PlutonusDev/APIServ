const express = require("express");
const router = express.Router();
const { SuccessResponse } = require("../../../util/ApiResponse");

router.get("*", (req, res) => {
	return new SuccessResponse(res, { data: {
		response: "Hello, world!"
	}}).send();
});

module.exports = {
	serviceName: "helloworld-v1-test",
	router,
	endpoint: "/v1"
}
