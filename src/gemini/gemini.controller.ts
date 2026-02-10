import { Controller, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get()
  getHello() {
    const apiKey = process.env.GEMINI_API_KEY;

    return `Hola Mundo, API Key: ${apiKey}`;
  }
}
