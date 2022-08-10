import type { Dependencies } from "../types"
import { Router } from "express"

import { PrismaClient } from "@prisma/client"
import calculate from "../middleware/calculate"
import persist from "../middleware/persist"
import history from "../middleware/history"
import error from "../middleware/error"



const router = Router()
const dependencies: Dependencies = {
	prisma: new PrismaClient({
		datasources: {
			db: {
				url: process.env.DATABASE_URL ?? "postgres://postgres:postgres@postgres:5432/postgres"
			}
		}
	}),
	logger: console
}
Object.freeze(dependencies)
const calculateMW = calculate(dependencies)
const persistMW = persist(dependencies)
const historyMW = history(dependencies)
const errorMW = error(dependencies)



router.post(/^\/api\/calculate\/[abc]$/, persistMW, calculateMW)
router.get("/api/history", historyMW)
router.use(errorMW)



export default router
