import { PartialType } from '@nestjs/swagger';
import { CreateReforestationProjectDto } from './create-reforestation-project.dto';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsNotEmpty, Min, ValidateNested, IsArray } from 'class-validator';
class ProjectDTO {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsString()
    @IsOptional()
    readonly resolution?: string;
}

class LocationDTO {
    @IsNumber()
    @IsOptional()
    readonly longitude_degrees: number;

    @IsNumber()
    @IsOptional()
    readonly latitude_degrees: number;

    @IsString()
    @IsOptional()
    readonly municipality?: string;

    @IsString()
    @IsOptional()
    readonly village?: string;

    @IsString()
    @IsOptional()
    readonly department?: string;
}

class TreeSpecieDTO {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly commonName: string;

    @IsString()
    @IsOptional()
    readonly scientificName?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    readonly quantity: number;
}
export class UpdateReforestationProjectDto extends PartialType(CreateReforestationProjectDto) {
    @ValidateNested()
    @Type(() => ProjectDTO)
    @IsOptional()
    readonly project?: ProjectDTO;

    @ValidateNested()
    @Type(() => LocationDTO)
    @IsNotEmpty()
    @IsOptional()
    readonly location?: LocationDTO;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly propertyType?: string;

    @ValidateNested({ each: true })
    @Type(() => TreeSpecieDTO)
    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    readonly treeSpecies?: TreeSpecieDTO[];

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    readonly designatedPlantingAreaInMeters?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly status?: string;
}
