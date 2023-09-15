import { Controller, Post, Body } from '@nestjs/common';
import * as crypto from 'crypto';

@Controller('payments')
export class PaymentsController {
  @Post('generate-signature')
  generateSignature(@Body() formData) {
    const passPhrase = formData.passPhrase; // Replace with your passphrase

    // Create parameter string
    let pfOutput = '';
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] !== '') {
          pfOutput += `${key}=${encodeURIComponent(formData[key].trim()).replace(/%20/g, '+')}&`;
        }
      }
    }

    // Remove the last ampersand
    pfOutput = pfOutput.slice(0, -1);

    // Add the passphrase
    pfOutput += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, '+')}`;

    // Generate the MD5 signature
    const signature = crypto.createHash('md5').update(pfOutput).digest('hex');

    return signature;
  }
}
