import { IsArray, IsInt, IsUUID, Min, Max, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class RecordResultDto {
  @IsUUID()
  exerciseId: string;

  @IsInt()
  distance: number;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(1, { each: true })
  balls: number[];
}
