import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { PresenceService } from '../../_services/presence.service';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  imports: [
    CommonModule,
    NgbModule,
    GalleryModule,
    TimeagoModule,
    MemberMessagesComponent,
  ],
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('nav', {static: true}) nav?: NgbNav;
  member: Member = {} as Member; // initialize with an empty object, and should populate from the route resolver
  images: GalleryItem[] = [];
  showGallery = false;
  messages: Message[] = [];
  active: number = 1;
  user?: User

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private messagesService: MessageService,
    public presenceService: PresenceService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    })
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member'] // the property inside the root
    })

    this.route.queryParams.subscribe({
      next: (params) => {
        if (params['tab'] && params['tab'] == 'Messages') {
          this.selectTab(4);
        }
      },
    });

    this.getImages();
  }

  ngOnDestroy(): void {
    this.messagesService.stopHubConnection();
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }

  loadPhotos() {
    this.showGallery = true;
  }

  offPhotos() {
    this.showGallery = false;
  }

  loadMessages() {
    this.showGallery = false;
    if (this.member) {
      this.messagesService.getMessageThread(this.member.userName).subscribe({
        next: (messages) => (this.messages = messages),
      });
    }
  }

  selectTab(tab: number) {
    if (this.nav) {
      this.nav.select(tab);
      if (tab == 4 && this.user) {
        this.messagesService.createHubConnection(this.user, this.member.userName);
      } else {
        this.messagesService.stopHubConnection();
      }
    }
  }
}
