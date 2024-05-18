import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReforestationProjectsService } from './reforestation-projects.service';
import { CreateReforestationProjectDto } from './dto/create-reforestation-project.dto';
import { UpdateReforestationProjectDto } from './dto/update-reforestation-project.dto';
import { acceptedQueryParams } from 'src/interfaces/reforestation-projects.interfaces';
import { formatQuery } from 'src/utils/format';

@Controller('api/reforestation-projects')
export class ReforestationProjectsController {
  constructor(private readonly reforestationProjectsService: ReforestationProjectsService) { }

  @Post()
  async create(@Body() createReforestationProjectDto: CreateReforestationProjectDto) {
    return {
      'Status': {
        'message': 'Creación de registro',
        'code': 201
      },
      'Data': await this.reforestationProjectsService.createReport(createReforestationProjectDto)
    };
  }

  @Get()
  async findAll(@Query() query: acceptedQueryParams) {
    const formattedQuery = formatQuery(query)
    try {
      const data = await this.reforestationProjectsService.findAll(formattedQuery)
      if (!data.length) {
        return {
          'Status': {
            'message': 'Lista de registros. Ningún registro devuelto',
            'code': 404
          },
          'Data': [],
          'Query params': formattedQuery
        }
      } else {
        return {
          'Status': {
            'message': 'Lista de registros',
            'code': 200
          },
          'Data': data,
          'Query params': formattedQuery
        }
      }
    } catch (error) {
      return {
        'Status': {
          'message': 'Error al buscar registros',
          'code': 500
        },
        'Error': error.message
      }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reforestationProjectsService.findOne(id);
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
