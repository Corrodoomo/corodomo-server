import { Inject, Injectable } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';

@Injectable()
export class MqttService {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientMqtt) {}

  /**
   * Notification emit
   */
  public notify(message: object) {
    this.client.emit('notification/receive', message);
  }

  /**
   * Notification emit
   */
  public notifyDuplicatedDevices(idToken: string, message: object) {
    this.client.emit(`notification/receive/${idToken}`, message);
  }
}
