import type { RequestHandler } from "express"
import type { Dependencies, PrismaClient } from "../types"
import ErrorWithTrace from "../utility/ErrorWithTrace"
import requireDependency from "../utility/requireDependency"

export default (dependencies: Dependencies): RequestHandler => {
	const prisma = requireDependency(dependencies, "prisma") as PrismaClient

	return async (req, res, next) => {
		const { input, comment } = req.body
		if (typeof comment !== "string") {
			return next(new ErrorWithTrace("Invalid comment", "", 400))
		}
		next()
		const { output } = res.locals
		try {
			await prisma.calculation.create({
				data: {
					input,
					output,
					comment
				}
			})
		} catch (e) {
			return next(new ErrorWithTrace("Prisma failed to insert new record", `${e}`))
		}
		res.json({ output })
	}
}
