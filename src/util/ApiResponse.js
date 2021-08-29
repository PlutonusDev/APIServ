const statusCode = {
	SUCCESS: 200,
	NOT_FOUND: 404,
	INTERNAL_ERROR: 500
}

const statusMsg = {
	SUCCESS: "OK",
	NOT_FOUND: "Not found",
	INTERNAL_ERROR: "Something went wrong"
}

class BaseResponse {
	constructor(res, { code, message, data }) {
		this.res = res;
		this.code = code;
		this.message = message;
		this.data = data;

		return this;
	}

	send() {
		this.res.status(this.code).send({
			code: this.code,
			message: this.message,
			data: this.data
		});
	}
}

class SuccessResponse {
	constructor(res, { message = statusMsg.SUCCESS, data = {} }) {
		return new BaseResponse(res, {code: statusCode.SUCCESS, message, data });
	}
}

module.exports = {
	SuccessResponse
}
