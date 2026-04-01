import {
  WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket,
  OnGatewayConnection, OnGatewayDisconnect, WsException
} from '@nestjs/websockets';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { TrackingService } from './tracking.service';
import { CreateBusLocationDto } from './dto/create-bus-location.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true, // Supprime les champs non définis dans le DTO
    transform: true,
    exceptionFactory: (errors) => new WsException(errors),
  }),
)
@WebSocketGateway({
  namespace: 'tracking',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // creation d'un vrai serveur websocket

  constructor(private readonly trackingService: TrackingService) { }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('updateLocation')
  async handleLocationUpdate(
    @MessageBody() data: CreateBusLocationDto,
    @ConnectedSocket() client: Socket,
  ) {
    // save data to database
    const savedLocation = await this.trackingService.saveLocation(data);

    // broadcast the location automatically to all  connected clients
    // emiting the 'locationUpdated' with the saved object
    console.log(savedLocation);
    this.server.emit('locationUpdated', savedLocation); // broadcoast savedlocatio => des clients socket 

    return { status: 'success', location: savedLocation };
  }

  @SubscribeMessage('getLatestLocations')
  async handleGetLatestLocations(
    @MessageBody() data: { busId: string; limit?: number },
  ) {
    const history = await this.trackingService.getLatestLocations(
      data.busId,
      data.limit ?? 20,
    );

    //  chronological order for frontend polyline rendering
    return [...history].reverse();
  }
}
