import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wp-content',
  templateUrl: './wp-content.component.html',
  styleUrls: ['./wp-content.component.scss']
})
export class WpContentComponent implements OnInit {

  @Input()
  content: string;

  constructor() { }

  ngOnInit() {
  }

}
