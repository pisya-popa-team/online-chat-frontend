import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MessageComponent } from '../../shared/components/message/message.component';
import { IMessage } from '../../entities/message';
import { NgForOf, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';
import endingByNum from '../../shared/helpers/endingByNum';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MessageComponent, NgForOf, FormsModule, NgIf],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit, AfterViewInit, AfterViewChecked {
  usersCount = 0;
  messages: IMessage[] = [];
  route = inject(ActivatedRoute);
  webSocketService = inject(WebsocketService);
  roomsService = inject(RoomsService);
  private stateSubject = new BehaviorSubject({
    title: '',
    description: '',
    link: '',
    linkName: '',
  });
  state$ = this.stateSubject.asObservable();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.webSocketService.currentRoomID = Number(params.get('id'));
    });

    this.webSocketService.connect(this.webSocketService.currentRoomID);

    this.roomsService
      .getMessages(this.webSocketService.currentRoomID)
      .subscribe((response) => {
        response.messages?.forEach((message) =>
          this.webSocketService.addMessage(message),
        );
      });

    this.webSocketService.messages$.subscribe((messages) => {
      this.messages = messages;
    });

    this.scrollToBottom();
  }

  isCurrentUser(senderID: number): boolean {
    let currentUser = localStorage.getItem('user');
    let currentID = currentUser ? JSON.parse(currentUser).ID : -1;

    return senderID === currentID;
  }

  closeSocket() {
    this.webSocketService.close();
  }

  ngAfterViewInit(): void {
    this.usersCount = this.roomsService.currentRoomCount;

    let usersCountSuffix = endingByNum(this.usersCount, [
      'юзер',
      'юзера',
      'юзеров',
    ]);

    this.stateSubject.next({
      title: `Рум #${this.webSocketService.currentRoomID}`,
      description: `в руме сейчас ${this.usersCount} ${usersCountSuffix}`,
      link: '/',
      linkName: '← К списку румов',
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
