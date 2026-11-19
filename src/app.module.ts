import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.getOrThrow<'postgres'>('DB_TYPE'),
        host: configService.getOrThrow<string>('DB_HOST'),
        port: Number(configService.getOrThrow<string>('DB_PORT')),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_DATABASE'),
        entities: [User],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
