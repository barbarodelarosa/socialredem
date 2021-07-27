/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Post } from '../interfaces/interfaces';
import { UiServiceService } from './ui-services.service';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {
  private _storage: Storage | null = null;
  favoritos: Post[] = [];
  posts: Post[] = [];
  constructor(private storage: Storage,
              private uiService: UiServiceService) {
    this.init();
    this.cargarFavoritos();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
      const tempstorage = await this.storage.create();
      this._storage = tempstorage;
  }
  async cargarFavoritos() {
     const favoritos = await this.storage.get('favoritos');
     if(favoritos){
       this.posts = favoritos;
     }
     console.log('Favoritos', this.posts);
  }

  borrarPosts( post: Post){
    this.posts = this.posts.filter(pos => pos.id !== post.id);
    this.storage.set('favoritos', this.posts);
    this.uiService.presentToast('Eliminado a Favoritos');
  }

  async guardarPost(post: Post){
    const existe = this.posts.find(pos=> pos.id === post.id);
    if(!existe){
      this.posts.unshift(post);
      this.storage.set('favoritos', this.posts);
    }
    this.uiService.presentToast('Agregado a Favoritos');
  }


}



