import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReforestationProject } from '../database/schemas/reforestation-project.schema';

@Injectable()
export class InitDbService implements OnModuleInit {
    private readonly logger = new Logger(InitDbService.name);

    constructor(
        @InjectModel(ReforestationProject.name) private readonly projectModel: Model<ReforestationProject>,
    ) { }

    async onModuleInit() {
        const count = await this.projectModel.countDocuments();
        if (count === 0) {
            this.logger.log('No reforestation projects found, initializing database with default projects...');
            await this.projectModel.insertMany([
                {
                    _id: "665530c03d347212c94b45df",
                    project: {
                        name: "Proyecto de Reforestación Boyacá",
                        resolution: "Resolución 1234",
                    },
                    location: {
                        longitude_degrees: -73.3678,
                        latitude_degrees: 5.4545,
                        municipality: "Tunja",
                        village: "Centro",
                        department: "Boyacá",
                    },
                    propertyType: "Terreno privado",
                    treeSpecies: [
                        {
                            commonName: "Pino",
                            scientificName: "Pinus radiata",
                            quantity: 1000,
                        },
                        {
                            commonName: "Eucalipto",
                            scientificName: "Eucalyptus globulus",
                            quantity: 500,
                        },
                    ],
                    designatedPlantingAreaInMeters: 10000,
                    status: "Activo",
                    createdAt: new Date("2024-05-28T01:17:52.830Z"),
                    updatedAt: new Date("2024-05-28T01:17:52.830Z"),
                    __v: 0,
                },
                {
                    _id: "6655318d3d347212c94b45e3",
                    project: {
                        name: "Reforestación en Chía",
                        resolution: "Resolución 5678",
                    },
                    location: {
                        longitude_degrees: -74.0583,
                        latitude_degrees: 4.8634,
                        municipality: "Chía",
                        village: "La Balsa",
                        department: "Cundinamarca",
                    },
                    propertyType: "Terreno comunitario",
                    treeSpecies: [
                        {
                            commonName: "Roble",
                            scientificName: "Quercus humboldtii",
                            quantity: 300,
                        },
                        {
                            commonName: "Aliso",
                            scientificName: "Alnus acuminata",
                            quantity: 700,
                        },
                    ],
                    designatedPlantingAreaInMeters: 5000,
                    status: "Planeado",
                    createdAt: new Date("2024-05-28T01:21:18.005Z"),
                    updatedAt: new Date("2024-05-28T01:21:18.005Z"),
                    __v: 0,
                },
                {
                    _id: "6655319e3d347212c94b45e5",
                    project: {
                        name: "Reforestación en Duitama",
                        resolution: "Resolución 9101",
                    },
                    location: {
                        longitude_degrees: -73.0327,
                        latitude_degrees: 5.8265,
                        municipality: "Duitama",
                        village: "Centro",
                        department: "Boyacá",
                    },
                    propertyType: "Terreno público",
                    treeSpecies: [
                        {
                            commonName: "Nogal",
                            scientificName: "Juglans neotropica",
                            quantity: 150,
                        },
                        {
                            commonName: "Cedro",
                            scientificName: "Cedrela odorata",
                            quantity: 350,
                        },
                    ],
                    designatedPlantingAreaInMeters: 3000,
                    status: "En progreso",
                    createdAt: new Date("2024-05-28T01:21:34.129Z"),
                    updatedAt: new Date("2024-05-28T01:21:34.129Z"),
                    __v: 0,
                },
                {
                    _id: "665531b03d347212c94b45e7",
                    project: {
                        name: "Reforestación en Zipaquirá",
                        resolution: "Resolución 1112",
                    },
                    location: {
                        longitude_degrees: -74.027,
                        latitude_degrees: 5.0221,
                        municipality: "Zipaquirá",
                        village: "El Abra",
                        department: "Cundinamarca",
                    },
                    propertyType: "Terreno privado",
                    treeSpecies: [
                        {
                            commonName: "Guayacán",
                            scientificName: "Tabebuia chrysantha",
                            quantity: 250,
                        },
                        {
                            commonName: "Caoba",
                            scientificName: "Swietenia macrophylla",
                            quantity: 200,
                        },
                    ],
                    designatedPlantingAreaInMeters: 8000,
                    status: "Completado",
                    createdAt: new Date("2024-05-28T01:21:52.197Z"),
                    updatedAt: new Date("2024-05-28T01:21:52.197Z"),
                    __v: 0,
                },
            ]);
            this.logger.log('Database initialized with default reforestation projects.');
        } else {
            this.logger.log('Reforestation projects already exist in the database, skipping initialization.');
        }
    }
}
