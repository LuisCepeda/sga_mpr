import { IsString, IsOptional, IsNumber, IsNotEmpty, ValidateNested, IsArray, Min } from 'class-validator';
import { Type } from 'class-transformer';

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
    readonly longitude_degrees: number;

    @IsNumber()
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
    readonly commonName: string;

    @IsString()
    @IsOptional()
    readonly scientificName?: string;

    @IsNumber()
    @Min(0)
    readonly quantity: number;
}

export class CreateReforestationProjectDto {
    @ValidateNested()
    @Type(() => ProjectDTO)
    @IsOptional()
    readonly project?: ProjectDTO;

    @ValidateNested()
    @Type(() => LocationDTO)
    @IsNotEmpty()
    readonly location: LocationDTO;

    @IsString()
    @IsNotEmpty()
    readonly propertyType: string;

    @ValidateNested({ each: true })
    @Type(() => TreeSpecieDTO)
    @IsArray()
    @IsNotEmpty()
    readonly treeSpecies: TreeSpecieDTO[];

    @IsNumber()
    @IsNotEmpty()
    readonly designatedPlantingAreaInMeters: number;

    @IsString()
    @IsNotEmpty()
    readonly status: string;
}
