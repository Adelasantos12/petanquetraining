import { IsInt, Min, Max, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMerciAssessmentDto {
  @IsInt()
  @Min(1)
  @Max(30)
  motricity: number;

  @IsInt()
  @Min(1)
  @Max(30)
  emotions: number;

  @IsInt()
  @Min(1)
  @Max(30)
  relationships: number;

  @IsInt()
  @Min(1)
  @Max(30)
  fiveSenses: number;

  @IsInt()
  @Min(1)
  @Max(30)
  intelligence: number;

  @IsOptional()
  answers?: any;
}

export class ApproveMerciAssessmentDto {
  @IsString()
  @IsNotEmpty()
  coachComments: string;

  @IsString()
  @IsOptional()
  rank?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
