// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   MessageBody,
//   OnGatewayInit,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway()
// export class EventGateway implements OnGatewayInit {
//   @WebSocketServer() server: Server;

//   afterInit() {
//     console.log('WebSocket Gateway Initialized');
//   }

//   @SubscribeMessage('eventCreated')
//   handleEventCreated(@MessageBody() data: string): void {
//     this.server.emit('eventCreated', data);
//   }
// }
import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // Called when the gateway is initialized
  afterInit() {
    console.log('Gateway Initialized');
  }

  // Called when a new client connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Called when a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Emitting real-time event to all connected clients
  emitEvent(eventName: string, data: any) {
    this.server.emit(eventName, data);
  }
}
