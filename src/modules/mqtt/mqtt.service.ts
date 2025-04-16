import { Inject, Injectable } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';

@Injectable()
export class MqttService {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientMqtt) {}

  /**
   * Notification emit
   */
  public notify() {
    this.client.emit('notification/receive', { id: 1, message: 'Hi, This is message from System', sentAt: new Date() });
    this.client.emit('notification/receive', { id: 1, message: 'Your email is not verified. Please, confirm your email.', sentAt: new Date() });
  }
}
