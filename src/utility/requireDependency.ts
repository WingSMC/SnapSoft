import { Dependencies } from "../types"

export default (dependencies: Dependencies, name: keyof Dependencies) => {
	const dependency = dependencies[name]
	if (!dependency && dependency !== 0) {
		throw new Error(`Dependency ${name} is not defined`)
	}
	return dependency
}
