export class InsertResult<T> {
	inserted: number;
	items?: T[];
}

export class UpdateResult<T> {
	updated: number;
	items?: T[];
}

export class DeleteResult {
	deleted: number;
}
