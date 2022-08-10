import type { RequestHandler } from "express"
import type { Dependencies, PrismaClient } from "../types"
import ErrorWithTrace from "../utility/ErrorWithTrace"

import requireDependency from "../utility/requireDependency"

export default (dependencies: Dependencies): RequestHandler => {
	const prisma = requireDependency(dependencies, "prisma") as PrismaClient

	return async (req, res, next) => {
		const filter = req.query.filter
		if (typeof filter !== "string") {
			return next(new ErrorWithTrace("Invalid filter", "", 400))
		}

		try {
			const calculations = await prisma.calculation.findMany({
				where: {
					comment: {
						contains: filter
					}
				}
			})
			res.json(calculations)
		} catch (e) {
			return next(new ErrorWithTrace("Prisma failed to find records", `${e}`))
		}
	}
}
