import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export type Request = ExpressRequest & { user: Session; timeId: string };
export type Response = ExpressResponse;
