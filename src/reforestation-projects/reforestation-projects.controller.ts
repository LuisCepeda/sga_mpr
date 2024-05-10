import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReforestationProjectsService } from './reforestation-projects.service';
import { CreateReforestationProjectDto } from './dto/create-reforestation-project.dto';
import { UpdateReforestationProjectDto } from './dto/update-reforestation-project.dto';

@Controller('reforestation-projects')
export class ReforestationProjectsController {
  constructor(private readonly reforestationProjectsService: ReforestationProjectsService) {}

  @Post()
  create(@Body() createReforestationProjectDto: CreateReforestationProjectDto) {
    return this.reforestationProjectsService.create(createReforestationProjectDto);
  }

  @Get()
  findAll() {
    return this.reforestationProjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reforestationProjectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReforestationProjectDto: UpdateReforestationProjectDto) {
    return this.reforestationProjectsService.update(+id, updateReforestationProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reforestationProjectsService.remove(+id);
  }
}
