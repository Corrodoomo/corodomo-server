import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export type Request = ExpressRequest & { user: TCachedSession; timeId: string };
export type Response = ExpressResponse;
