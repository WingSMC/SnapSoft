import type { Logger, Dependencies } from "../types"
import type ErrorWithTrace from "../utility/ErrorWithTrace"
import type { ErrorRequestHandler } from "express"

import requireDependency from "../utility/requireDependency"

export default (dependencies: Dependencies): ErrorRequestHandler => {
	const logger = requireDependency(dependencies, "logger") as Logger

	return (err: ErrorWithTrace, req, res, next) => {
		logger.error(err.toString())
		res.status(err.status).send(err.message)
	}
}
