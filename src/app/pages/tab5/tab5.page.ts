import { Component } from '@angular/core';
import { DatalocalService } from '../../services/datalocal.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  slidesOpt = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };
  constructor(public dataLocalService: DatalocalService) {
  }

}
