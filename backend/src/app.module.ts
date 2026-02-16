import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENTITIES } from './entities';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { PaymentsModule } from './payments/payments.module';
import { MerciModule } from './merci/merci.module';
import { TrainingModule } from './training/training.module';
import { CoachModule } from './coach/coach.module';
import { ApplicationsModule } from './applications/applications.module';
import { InterviewsModule } from './interviews/interviews.module';
import { AdmissionModule } from './admission/admission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT', '5432'), 10),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        url: configService.get<string>('DATABASE_URL'), // Railway often provides DATABASE_URL
        entities: ENTITIES,
        synchronize: configService.get<string>('DB_SYNC') === 'true',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    OnboardingModule,
    PaymentsModule,
    MerciModule,
    TrainingModule,
    CoachModule,
    ApplicationsModule,
    InterviewsModule,
    AdmissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
