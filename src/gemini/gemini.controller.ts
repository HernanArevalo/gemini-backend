import { Body, 
  Controller, 
  HttpStatus, 
  Post, 
  Res, 
  UploadedFiles, 
  UseInterceptors 
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import type { Response, Request } from 'express';

import { GeminiService } from './gemini.service';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import { UploadedFile } from 'src/interfaces';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) { }

  @Post('basic-prompt')
  basicPrompt(@Body() basicPromptDto: BasicPromptDto) {

    return this.geminiService.basicPrompt(basicPromptDto);
  }

  @Post('basic-prompt-stream')
  @UseInterceptors(FilesInterceptor('files'))
  async basicPromptStream(
    @Body() basicPromptDto: BasicPromptDto,
    @Res() res: Response,


    // todo: Files
    @UploadedFiles() files: UploadedFile[]
    ) {

    basicPromptDto.files = files;


    const stream = await this.geminiService.basicPromptStream(basicPromptDto);

    res.setHeader('Content-Type', 'text/plain');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.text || '';
      console.log(piece)

      res.write(piece)

    }
    res.end();
  }
}
