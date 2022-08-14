export default class ErrorWithTrace extends Error {
	private _message: string
	private _trace: string
	private _status: number
	constructor(message: string, trace: string, status: number = 500) {
		this._message = message
		this._trace = trace
		this._status = status
	}

	get message(): string {
		return this._message
	}

	get trace(): string {
		return this._trace
	}

	get status(): number {
		return this._status
	}

	toString(): string {
		return `${this._message}\n${this._trace}`
	}
}
