export abstract class IJwtService {
	/**
	 * Verify access token
	 * @param token Access token
	 * @return Promise<JwtPayload>
	 * @example const payload = await this.jwtService.verify(token);
	 */
	abstract verify(token: string): Promise<DecodedUser>;
}
