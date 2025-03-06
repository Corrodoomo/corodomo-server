import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export type Request = ExpressRequest & { user: DecodedUser };
export type Response = ExpressResponse;
