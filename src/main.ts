import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SGA Monitoreo Planes de Reforestación')
    .setDescription('Esta API se encarga de manejar la información acerca de los Planes de reforestación.')
    .setVersion('1.0')
    .addTag('Reforestation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/mpr/docs', app, document);

  const PORT = process.env.PORT || 3003
  await app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
bootstrap();
