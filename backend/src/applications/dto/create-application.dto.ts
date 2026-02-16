import { IsString, IsEmail, IsEnum, IsInt, IsBoolean, IsArray, IsOptional } from 'class-validator';
import { CountryCode, CompetitiveLevel } from '../../entities/application.entity';

export class CreateApplicationDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsEmail() email: string;
  @IsEnum(CountryCode) country: CountryCode;
  @IsString() city: string;
  @IsString() timezone: string;
  @IsInt() yearsPlaying: number;
  @IsEnum(CompetitiveLevel) currentLevel: CompetitiveLevel;
  @IsInt() tournamentsPerYearCurrent: number;
  @IsInt() tournamentsPerYearGoal: number;
  @IsString() @IsOptional() clubAffiliation?: string;
  @IsInt() weeklyTrainingHoursAvailable: number;
  @IsBoolean() accessToCourt: boolean;
  @IsBoolean() accessToEquipment: boolean;
  @IsBoolean() canRecordTrainingResults: boolean;
  @IsArray() preferredTrainingDays: string[];
  @IsString() @IsOptional() healthLimitations?: string;
  @IsString() primaryGoal6Months: string;
  @IsString() mainWeaknessSelfPerceived: string;
  @IsString() mainStrengthSelfPerceived: string;
  @IsString() whyThisAcademy: string;
  @IsBoolean() willingnessQuincenalReview: boolean;
  @IsBoolean() acceptanceOfDisciplineRules: boolean;
  @IsBoolean() confirmationTruthfulInformation: boolean;
  @IsBoolean() consentDataProcessing: boolean;
}
