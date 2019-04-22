import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.endLoading();
  }

}
