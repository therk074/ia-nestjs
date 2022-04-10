import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('triangle')
  @UseInterceptors(FileInterceptor(''))
  async postTriangle(@Body() body:any) {
    return await this.appService.postTriangle(body)
  }

  @Post('citizen')
  @UseInterceptors(FileInterceptor(''))
  async postCitizen(@Body() body:any) {
    return await this.appService.postCitizen(body.citizen_id)
  }

  @Get('star') 
  async loopStar() {
    return await this.appService.loopStar()
  }
}
