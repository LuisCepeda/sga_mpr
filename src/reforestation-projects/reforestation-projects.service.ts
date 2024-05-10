import { Injectable } from '@nestjs/common';
import { CreateReforestationProjectDto } from './dto/create-reforestation-project.dto';
import { UpdateReforestationProjectDto } from './dto/update-reforestation-project.dto';

@Injectable()
export class ReforestationProjectsService {
  create(createReforestationProjectDto: CreateReforestationProjectDto) {
    return 'This action adds a new reforestationProject';
  }

  findAll() {
    return `This action returns all reforestationProjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reforestationProject`;
  }

  update(id: number, updateReforestationProjectDto: UpdateReforestationProjectDto) {
    return `This action updates a #${id} reforestationProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} reforestationProject`;
  }
}
