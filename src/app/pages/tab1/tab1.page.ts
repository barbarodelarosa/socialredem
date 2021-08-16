import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';
import { CategoriaPost } from '../../interfaces/interfaces';
import { IonSegment, LoadingController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-services.service';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[]=[];
  ok: any={};
  habilitado=true;
  categorias: CategoriaPost[]= [];
  segmento;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild(IonSegment) segment: IonSegment;
  constructor(private postService: PostsService,
    private uiService: UiServiceService,
    private loadingCtrl: LoadingController) {
    }
    
    
async ngOnInit(){
  this.uiService.presentLoading();
  this.siguientes();
  this.postService.obtenerCategoriasPosts()
  .subscribe((resp: any)=>{
    this.categorias.push(...resp.results);
  },error=>{
    console.log(error);
  });
}
ionViewDidEnter(){
  this.uiService.dismiss();
}

  siguientes(event?, pull: boolean=false){

    this.postService.getPosts(pull).subscribe(resp=>{
      this.posts.push(...resp.results);
      console.log(this.posts);
      if(event){
        event.target.complete();
        if(resp.results.length < 10){
          console.log(resp.results.length);
          this.habilitado = false;
        }
      }
    });
  }

  recargar(event?){
    this.siguientes(event, true);
    this.habilitado=true;
    this.posts=[];

  }
  segmentCategorias(event){
    console.log(event.detail.value);
    this.segmento = event.detail.value;
    this.posts=[];
    this.postService.obtenerPostPorCategorias(event.detail.value)
    .subscribe((resp: any)=>{
      this.posts.push(...resp.results);
    });
  }
}
