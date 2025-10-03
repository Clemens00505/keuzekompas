import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateModuleDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() @MaxLength(1000) description?: string;
  @IsEnum([15, 30] as any) ec!: 15 | 30;
  @IsEnum(['NLQF-5','NLQF-6']) niveau!: 'NLQF-5' | 'NLQF-6';
  @IsOptional() @IsArray() @IsString({ each: true }) thema?: string[];
}
