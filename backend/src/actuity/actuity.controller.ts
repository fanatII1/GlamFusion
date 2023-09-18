import { Controller, Get, Post, Put, Delete, Body, Headers, Req } from '@nestjs/common';
import { ActuityService } from './actuity.service';
import { WebSocketServer } from '@nestjs/websockets';
import { CalendarHandlingGateway } from 'src/calendar-handling/calendar-handling.gateway';
import { Server, Socket } from 'socket.io'

@Controller('actuity')
export class ActuityController {
  @WebSocketServer()
  server: Server
    //instanciate the actuity service
    //instanciate the gateway...in background the gateway will emit events whenever it recieves a webhook
    //we would need to send the webhook data to the gateway first
    constructor(private readonly actuityService: ActuityService, private readonly calendarHandlingGateway: CalendarHandlingGateway){}

    @Post('schedule')
    handleAcuityWebhook(@Body() data: any, @Headers() headers, @Req() req): string {
      // Verify the webhook request signature here...read the headers of actuity
      // Process the Acuity Scheduling webhook data here
      const connectedClient = this.calendarHandlingGateway.returnConnectedClient();
      const headersArray = Object.keys(headers);
      const actuitySignatureHeader = headersArray.includes('x-acuity-signature');
      if(actuitySignatureHeader){
        // console.log(data)
        connectedClient.emit('calendarData', data)
      }
      else{
        throw new Error('Error in the verification of the calendar provider signing header')
      }
  
      return 'Webhook received and processed successfully.';
    }
  
    @Post('appointments')
    async getCalendarAppointments(@Body() data: any) {
      const { id } = data;
      let baseUrl = `https://acuityscheduling.com/api/v1/appointments/${id}`;
      let options =  {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic MzAwNDQ4MDM6MGY0YjM1N2U4NzQzYzQ4YzQ2MmI3ZDljZDMxYTU2ODU='
        }
      }
      let response = await fetch(`${baseUrl}`, options);
      let userAppointmentData = await response.json();
      console.log(userAppointmentData)
      return userAppointmentData;
    }
}
