import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ReforestationProjectsService } from './reforestation-projects.service';
import { CreateReforestationProjectDto } from './dto/create-reforestation-project.dto';
import { UpdateReforestationProjectDto } from './dto/update-reforestation-project.dto';
import { acceptedQueryParams } from 'src/interfaces/reforestation-projects.interfaces';
import { formatQuery } from 'src/utils/format';
import { Response } from 'express';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import messages from '../constants/messages'

@ApiTags('Reforestation projects')
@Controller('reforestation-projects')
export class ReforestationProjectsController {
  constructor(private readonly reforestationProjectsService: ReforestationProjectsService) { }

  @Post()
  @ApiCreatedResponse({ description: messages.CREATED_SINGLE_RECORD })
  async create(@Body() createReforestationProjectDto: CreateReforestationProjectDto, @Res() response: Response) {
    try {
      const createdProject = await this.reforestationProjectsService.createReport(createReforestationProjectDto)
      return response.status(HttpStatus.CREATED).json({
        'Status': {
          'message': messages.CREATED_SINGLE_RECORD,
          'code': HttpStatus.CREATED
        },
        'Data': createdProject
      })
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: messages.ERROR_CREATING_SINGLE_RECORD,
        error: error.message,
      });
    };
  }

  @Get()
  @ApiNotFoundResponse({ description: messages.NOT_FOUND_MULTIPLE_RECORDS })
  @ApiOkResponse({ description: '' })
  async findAll(@Query() query: acceptedQueryParams, @Res() response: Response) {
    const formattedQuery = formatQuery(query)
    try {
      const data = await this.reforestationProjectsService.findAll(formattedQuery)
      if (!data.length) {
        return response.status(HttpStatus.NOT_FOUND).json({
          'Status': {
            'message': messages.NOT_FOUND_MULTIPLE_RECORDS,
            'code': HttpStatus.NOT_FOUND
          },
          'Data': [],
          'Query params': formattedQuery
        });
      }
      return response.status(HttpStatus.OK).json({
        'Status': {
          'message': messages.FOUND_MULTIPLE_RECORDS,
          'code': HttpStatus.OK
        },
        'Data': data,
        'Query params': formattedQuery
      })

    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: messages.ERROR_FINDING_MULTIPLE_RECORDS,
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
            'message': messages.NOT_FOUND_SINGLE_RECORD,
            'code': HttpStatus.NOT_FOUND,
            'id': id
          }
        });
      }

      return response.status(HttpStatus.OK).json({
        'Status': {
          'message': messages.FOUND_SINGLE_RECORD,
          'code': HttpStatus.OK,
          'id': id
        },
        'Data': data
      })

    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: messages.ERROR_FINDING_SINGLE_RECORD,
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
          'message': messages.UPDATED_SINGLE_RECORD,
          'code': HttpStatus.OK,
          'id': id
        },
        'Data': updatedProject,
      })
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        'message': messages.ERROR_UPDATING_SINGLE_RECORD,
        'error': error.message,
        'id': id
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const { acknowledged, deletedCount } = await this.reforestationProjectsService.remove(id);


      if (deletedCount === 0) {
        throw new NotFoundException(messages.NO_RECORD_TO_DELETE);
      }
      return response.status(HttpStatus.NO_CONTENT).json({
        status: {
          message: messages.DELETED_SINGLE_RECORD,
          code: HttpStatus.NO_CONTENT,
          id: id
        },
      });

    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: messages.ERROR_DELETING_SINGLE_RECORD,
        error: error.message,
        id: id
      });
    }
  }
}
