import { Injectable } from '@nestjs/common';
import { CreateReforestationProjectDto } from './dto/create-reforestation-project.dto';
import { UpdateReforestationProjectDto } from './dto/update-reforestation-project.dto';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ReforestationProject } from '../database/schemas/reforestation-project.schema'
import { acceptedQueryParams } from 'src/interfaces/reforestation-projects.interfaces';


@Injectable()
export class ReforestationProjectsService {
  constructor(@InjectModel(ReforestationProject.name) private reforestationProjectModel: Model<ReforestationProject>) { }


  async createReport(createReforestationProjectDto: CreateReforestationProjectDto): Promise<ReforestationProject> {
    const createdRP = new this.reforestationProjectModel(createReforestationProjectDto)
    return await createdRP.save()
  }

  async findAll(query: any) {
    return await this.reforestationProjectModel.find(query).exec();
  }


  async findOne(id: string) {
    return await this.reforestationProjectModel.find({ _id: id }).exec()
  }

  async update(id: string, updateReforestationProjectDto: UpdateReforestationProjectDto) {
    const filter = { _id: id }
    return this.reforestationProjectModel.findOneAndUpdate(filter, updateReforestationProjectDto, { new: true })
  }

  async remove(id: string) {
    const filter = { _id: id }
    const deletedRP = await this.reforestationProjectModel.deleteOne(filter);
    return deletedRP
  }
}
