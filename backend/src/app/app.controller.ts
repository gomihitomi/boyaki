import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from '@post.service';
import { Post } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly postService: PostService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('posts')
  async getAllPost(): Promise<Post[]> {
    return this.postService.posts({});
  }

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<Post | null> {
    return this.postService.post({ id: Number(id) });
  }
}
