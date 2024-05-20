import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose';


export type ReforestationProjectDocument = HydratedDocument<ReforestationProject>

@Schema({ _id: false })
class Project {
    @Prop({ trim: true })
    name?: string;

    @Prop({ trim: true })
    resolution?: string;
}

@Schema({ _id: false })
class Location {
    @Prop({ trim: true })
    longitude_degrees: number

    @Prop({ trim: true })
    latitude_degrees: number

    @Prop({ trim: true })
    municipality?: string

    @Prop({ trim: true })
    village?: string

    @Prop({ trim: true })
    department?: string
}

@Schema({ _id: false })
class TreeSpecie {
    @Prop({ trim: true })
    commonName: string;

    @Prop({ trim: true })
    scientificName?: string;

    @Prop({ trim: true, min: 0 })
    quantity: number;
}

@Schema({ timestamps: true })
export class ReforestationProject {

    @Prop({ type: Project, trim: true, _id: false })
    project?: Project

    @Prop({ type: Location, required: true, trim: true })
    location: Location

    @Prop({ trim: true })
    propertyType: string;

    @Prop({ type: [TreeSpecie], trim: true, required: true })
    treeSpecies: TreeSpecie;

    @Prop({ trim: true, required: true })
    designatedPlantingAreaInMeters: number;

    @Prop({ required: true, trim: true })
    status: string

}

export const ReforestationProjectSchema = SchemaFactory.createForClass(ReforestationProject)