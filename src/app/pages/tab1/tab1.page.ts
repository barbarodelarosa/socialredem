import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[]=[]
  ok: any={};
  habilitado=true;

  constructor(private postService: PostsService) {}


  ngOnInit(){
    this.siguientes();

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
 
}
