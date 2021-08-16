import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pop-over-emotion',
  templateUrl: './pop-over-emotion.component.html',
  styleUrls: ['./pop-over-emotion.component.scss'],
})
export class PopOverEmotionComponent implements OnInit {
  @Input() name: string;
  
  constructor() { }

  ngOnInit() {
    console.log(this.name);
  }

}
