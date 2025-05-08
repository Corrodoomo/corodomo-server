import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MqttChannel } from './mqtt.channel';
import { MqttService } from './mqtt.service';

@Global()
@Module({
  controllers: [MqttChannel],
  providers: [MqttService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.getOrThrow<string>('MQTT_URL'), // ví dụ: mqtt://localhost:1883
            username: configService.getOrThrow<string>('MQTT_USERNAME'), // ví dụ: mqtt
            password: configService.getOrThrow<string>('MQTT_PASSWORD'), // ví dụ: root
            clientId: 'server_rest_api_' + Math.random().toString(16).substr(2, 8),
            keepalive: 60,
            clean: false,
          },
        }),
      },
    ]),
  ],
  exports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.getOrThrow<string>('MQTT_URL'), // ví dụ: mqtt://localhost:1883
            username: configService.getOrThrow<string>('MQTT_USERNAME'), // ví dụ: mqtt
            password: configService.getOrThrow<string>('MQTT_PASSWORD'), // ví dụ: root
            clientId: 'server_rest_api_' + Math.random().toString(16).substr(2, 8),
            keepalive: 60,
            clean: false,
          },
        }),
      },
    ]),
  ],
})
export class MqttModule {}
