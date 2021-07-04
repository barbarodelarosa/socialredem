import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { LikesPipe } from './likes.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    LikesPipe
  ],
  exports:[DomSanitizerPipe, LikesPipe, ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
