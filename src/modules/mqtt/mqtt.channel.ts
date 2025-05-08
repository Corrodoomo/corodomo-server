import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';

import { MqttService } from './mqtt.service';

@Controller()
export class MqttChannel {
  constructor(private readonly mqttService: MqttService) {}

  @MessagePattern('notification/send')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()} `, data);

    return this.mqttService.notify({ id: 1, message: 'Your email is not verified. Please, confirm your email.', sentAt: new Date() });
  }
}
