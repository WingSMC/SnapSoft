import type { RequestHandler } from "express"
import type { Dependencies } from "../types"
import ErrorWithTrace from "../utility/ErrorWithTrace"

export default (_dependencies: Dependencies): RequestHandler => {
	return (req, res, next) => {
		const data = req.body.input as number[]
		if (!(data instanceof Array)) {
			return next(new ErrorWithTrace("Invalid input", "", 400))
		}
		const product = data.reduce((acc, curr) => acc * curr)
		const output = data.map(num => (product * (num ** -1)))
		const responseBody = { output }

		res.locals = responseBody
	}
}
