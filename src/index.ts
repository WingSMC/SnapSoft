import type { Application } from "express"
import "dotenv/config"
import express from "express"

import router from "./router"



const app: Application = express()

app.use(express.json())
app.use(router)

app.listen(3000, () => {
	console.log("Listening on port 3000")
})
