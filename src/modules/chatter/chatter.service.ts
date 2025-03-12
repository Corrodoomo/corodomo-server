import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChatterService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Chat with chatter
   * @param message
   * @returns
   */
  async chat(message: string): Promise<string> {
    const response = await firstValueFrom(this.httpService.post('chat', { message }));
    return response.data.result;
  }

  /**
   * Chat with chatter
   * @param message
   * @returns
   */
  async topic(message: string): Promise<string> {
    const response = await firstValueFrom(this.httpService.post('topic', { message }));

    return response.data.result;
  }
}
