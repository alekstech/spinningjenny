module.exports = class CustomError extends Error {
	constructor(message = 'Oops! Something went wrong!', statusCode = 404, ...params) {

		// pass remaining arguments to parent constructor
		super(...params)

		// stack trace for where the error was thrown 
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomError)
		}

		// custom debugging information
		this.date = new Date()
		this.statusCode = statusCode
		this.message = message
	}
}