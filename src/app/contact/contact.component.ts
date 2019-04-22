import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { WpContent } from '../core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: WpContent;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.endLoading();

    this.contact = this.route.snapshot.data.contact;
  }

}
