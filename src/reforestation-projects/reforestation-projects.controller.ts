import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ReforestationProjectsService } from './reforestation-projects.service';
import { CreateReforestationProjectDto } from './dto/create-reforestation-project.dto';
import { UpdateReforestationProjectDto } from './dto/update-reforestation-project.dto';
import { acceptedQueryParams } from 'src/interfaces/reforestation-projects.interfaces';
import { formatQuery } from 'src/utils/format';
import { Response } from 'express';


@Controller('api/reforestation-projects')
export class ReforestationProjectsController {
  constructor(private readonly reforestationProjectsService: ReforestationProjectsService) { }

  @Post()
  async create(@Body() createReforestationProjectDto: CreateReforestationProjectDto, @Res() response: Response) {
    try {
      const createdProject = await this.reforestationProjectsService.createReport(createReforestationProjectDto)
      return response.status(HttpStatus.CREATED).json({
        'Status': {
          'message': 'Creación de registro',
          'code': HttpStatus.CREATED
        },
        'Data': createdProject
      })
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al crear el registro',
        error: error.message,
      });
    };
  }

  @Get()
  async findAll(@Query() query: acceptedQueryParams, @Res() response: Response) {
    const formattedQuery = formatQuery(query)
    try {
      const data = await this.reforestationProjectsService.findAll(formattedQuery)
      if (!data.length) {
        return response.status(HttpStatus.NOT_FOUND).json({
          'Status': {
            'message': 'No se encontraron registros',
            'code': HttpStatus.NOT_FOUND
          },
          'Data': [],
          'Query params': formattedQuery
        });
      }
      return response.status(HttpStatus.OK).json({
        'Status': {
          'message': 'Lista de registros',
          'code': HttpStatus.OK
        },
        'Data': data,
        'Query params': formattedQuery
      })

    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar registros',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const data = await this.reforestationProjectsService.findOne(id)
      if (!data.length) {
        return response.status(HttpStatus.NOT_FOUND).json({
          'Status': {
            'message': `Registro con id ${id} no encontrado.`,
            'code': HttpStatus.NOT_FOUND
          }
        });
      }

      return response.status(HttpStatus.OK).json({
        'Status': {
          'message': `Registro con id: ${id}`,
          'code': HttpStatus.OK,
        },
        'Data': data
      })

    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar registro',
        error: error.message,
      });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReforestationProjectDto: UpdateReforestationProjectDto, @Res() response: Response) {
    try {
      const updatedProject = await this.reforestationProjectsService.update(id, updateReforestationProjectDto);
      return response.status(HttpStatus.OK).json({
        'Status': {
          'message': `Registro con id ${id} actualizado`,
          'code': HttpStatus.OK,
        },
        'Data': updatedProject,
      })
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al actualizar registro',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const { acknowledged, deletedCount } = await this.reforestationProjectsService.remove(id);


      if (deletedCount === 0) {
        throw new NotFoundException(`No se encontró registro con id ${id}`);
      }
      return response.status(HttpStatus.NO_CONTENT).json({
        status: {
          message: `Registro con id ${id} eliminado correctamente.`,
          code: HttpStatus.NO_CONTENT,
        },
      });

    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Error al eliminar el registro ${id}`,
        error: error.message,
      });
    }
  }
}
