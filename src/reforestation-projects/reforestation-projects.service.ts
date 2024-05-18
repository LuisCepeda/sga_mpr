import { Injectable } from '@nestjs/common';
import { CreateReforestationProjectDto } from './dto/create-reforestation-project.dto';
import { UpdateReforestationProjectDto } from './dto/update-reforestation-project.dto';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ReforestationProject } from '../schemas/reforestation-project.schema'
import { acceptedQueryParams } from 'src/interfaces/reforestation-projects.interfaces';


@Injectable()
export class ReforestationProjectsService {
  constructor(@InjectModel(ReforestationProject.name) private reforestationProjectModel: Model<ReforestationProject>) { }


  createReport(createReforestationProjectDto: CreateReforestationProjectDto): Promise<ReforestationProject> {
    const createdRP = new this.reforestationProjectModel(createReforestationProjectDto)
    return createdRP.save()
  }

  findAll(query: any) {
    return this.reforestationProjectModel.find(query).exec();
  }


  findOne(id: string) {
    return this.reforestationProjectModel.findOne({ _id: id }).exec()
  }

  update(id: number, updateReforestationProjectDto: UpdateReforestationProjectDto) {
    return `This action updates a #${id} reforestationProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} reforestationProject`;
  }
}
