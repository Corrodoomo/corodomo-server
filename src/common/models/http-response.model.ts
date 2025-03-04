export class HttpResponse<T> {
	private status: number;
	private result: T;
	private timestamp: string;

	constructor(status: number, result: T) {
		this.status = status;
		this.result = result;
		this.timestamp = new Date().toISOString();
	}
}
