import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CategoriaPost, Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  listaCategorias: CategoriaPost[] = [];
  buscar: string;
  posts: Post[]=[];

  constructor(private postService: PostsService) {}
  ngOnInit(){
    this.postService.obtenerCategoriasPosts()
    .subscribe((resp: any)=>{
      this.listaCategorias.push(...resp.results);
    },err=>{
      console.log(err);
    });
  }
  buscarPost(){
    this.posts=[];
    const getParams = {
      q: this.buscar
    };
    console.log(getParams.q);
    this.postService.buscarPosts(getParams).subscribe((resp: any)=>{
      this.posts.push(...resp.results);
      console.log(resp);
    }, error=>{
      console.log(error);
    });
  }
  onSearchChange(event){
    console.log(this.buscar);
    this.buscar='';
  }

}
