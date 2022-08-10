import { PrismaClient } from "@prisma/client"
import prisma from "prisma"

export interface IDependencies {
	prisma: PrismaClient
	logger: Logger
}
export type Dependencies = Partial<IDependencies>
export type PrismaClient = PrismaClient
export type Logger = {
	info: (...message: any[]) => any
	error: (...message: any[]) => any
	warn: (...message: any[]) => any
	log: (...message: any[]) => any
}
