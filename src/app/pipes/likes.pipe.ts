import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'likes'
})
export class LikesPipe implements PipeTransform {

  valueLike = '';
  constructor(private domSanitizer: DomSanitizer){}

  transform(liked: boolean): any {
    if(liked){
      this.valueLike = 'color: red';
    }else{
      this.valueLike = 'color: gray';
    }
    return this.domSanitizer.bypassSecurityTrustStyle(this.valueLike);
  }

}


// export class DomSanitizerPipe implements PipeTransform {

//   transform(img: string): any {
//     const domImg = `background-image: url('${img}')`;
//     return this.domSanitizer.bypassSecurityTrustStyle(domImg);
//   }

// }
