import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('E-commerce APIs')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey', name: 'x-access-token', in: 'header' })
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'E-commerce APIs',
    explorer: false,
    // swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}
