import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as ngrok from 'ngrok';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Start Ngrok tunnel and expose port 80 or 443
    // const ngrokUrl = await ngrok.connect({ proto: 'http', addr: 3000 }); // For port 80
    // // const ngrokUrl = await ngrok.connect({ proto: 'tls', addr: 443 }); // For port 443 (HTTPS)

    // console.log(`Ngrok URL: ${ngrokUrl}`);
    // const subdomain = ngrokUrl.split('.')[0]; // Split the URL by periods and get the first part
    // console.log('Subdomain:', subdomain);
    app.use(cors({
      origin: '*',
    }));
  await app.listen(3000);
}
bootstrap();
