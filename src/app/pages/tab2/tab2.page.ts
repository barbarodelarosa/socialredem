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
  categoria: []=[];
  posts: Post[]=[];
  categoriaSeleccionadas: any;
  habilitado = true;
  categoriaAdd=[];


  constructor(private postService: PostsService) {}
  ngOnInit(){
    this.postService.obtenerCategoriasPosts()
    .subscribe((resp: any)=>{
      this.listaCategorias.push(...resp.results);
    },err=>{
      console.log(err);
    });
  }
  buscarPost(event?){
    if(!event){
      this.posts=[];
    }
    if(!this.buscar){
      this.buscar='';
    }
    const getParams = {
      q: this.buscar,
      categorias: this.categoriaSeleccionadas
    };
    console.log(getParams.q);
    console.log(getParams.categorias);
    this.postService.buscarPosts(getParams, event).subscribe((resp: any)=>{
      this.posts.push(...resp.results);
      console.log(resp);
      if(event){
        event.target.complete();
        if(resp.results.length < 10){
          console.log(resp.results.length);
          this.habilitado = false;
        }
      }
    }, error=>{
      console.log(error);
    });
  }
  onSearchChange(event){
    console.log(this.buscar);
    this.buscar='';
  }


}
