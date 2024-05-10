import { PartialType } from '@nestjs/swagger';
import { CreateReforestationProjectDto } from './create-reforestation-project.dto';

export class UpdateReforestationProjectDto extends PartialType(CreateReforestationProjectDto) {}
