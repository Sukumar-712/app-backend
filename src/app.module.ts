import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // so you can use it everywhere without re-importing
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: "mongodb+srv://santhoshsugu71200_db_user:dF73FfHIJT6GXqrI@cluster0.4gpfn25.mongodb.net/pagination?retryWrites=true&w=majority",
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
