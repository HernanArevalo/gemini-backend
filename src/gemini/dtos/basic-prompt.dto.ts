import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UploadedFile } from 'src/interfaces';

export class BasicPromptDto {
  @IsString()
  @IsNotEmpty()
  prompt!: string;

  @IsArray()
  @IsOptional()
  files: UploadedFile[] = [];
}