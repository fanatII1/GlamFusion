import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { CalendarHandlingService } from './calendar-handling.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors : { origin: '*'}})
export class CalendarHandlingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly calendarHandlingService: CalendarHandlingService) {}

  @WebSocketServer() 
  server: Server;
  private connectedClient;

  handleConnection(@ConnectedSocket() client: Socket) {
    // console.log(`Client connected: ${client.id}`);
    // client.join(client.id);
    client.emit('welcome', 'Welcome to the WebSocket server!');
    this.connectedClient = client;
  }

  returnConnectedClient(){
    return this.connectedClient;
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
