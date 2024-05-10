import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'




@Schema({ timestamps: true })
export class ReforestationProject {
    @Prop({ trim: true })
    project?: {
        name?: string
        resolution?: string
    }

    @Prop({ required: true, trim: true })
    location: {
        longitude_degrees: string
        latitude_degrees: string
        municipality?: string
        village?: string
        department?: string
    }

    @Prop({ trim: true })
    propertyType: string;

    @Prop({ trim: true, required: true })
    treeSpecies: [{
        commonName: string;
        scientificName?: string;
        quantity: number;
    }];

    @Prop({ trim: true, required: true })
    designatedPlantingAreaInMeters: number;

    @Prop({ required: true, trim: true })
    status: string

}

export const ReforestationProjectSchema = SchemaFactory.createForClass(ReforestationProject)