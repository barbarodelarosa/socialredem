/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../environments/environment';
//import { RespuestaPosts } from '../interfaces/post.interface';
import { Post, RespuestaPosts, CategoriaPost } from '../interfaces/interfaces';
import {Platform} from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UiServiceService } from './ui-services.service';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class PostsService {

paginaPost = 0;
paginaPostBuscar=0;
post: Post;
categoriasSeleccionadas: any[]=[];


  constructor(private platform: Platform,
              private httpClient: HttpClient,
              private fileTransfer: FileTransfer,
              private uiService: UiServiceService
             ) {}

  getPosts(pull: boolean = false){

    if(pull){this.paginaPost=0;    }

    this.paginaPost ++;

      return this.httpClient.get<RespuestaPosts>(`${URL}/api/v1/read-post/?page=${this.paginaPost}`);

  }

 async crearPost(post: Post, tempImagesBase64?: any[]){


   return new Promise(resolve=>{

     this.httpClient.post<Post>(`${URL}/api/v1/create-post/`,post)
     .subscribe(async resp=>{


      // function sumar(...valores:number[]) {

        if(tempImagesBase64.length>0){

          // for(let img=0;img<tempImagesBase64.length;img++){
          // }
          for (const img of tempImagesBase64) {
            // this.uiService.alertaInformativa(img);
            await this.subirImagen(resp.id, img);
            // console.log(entry); // 1, "string", false
          }
        }
      // }


        //  console.log(resp.id);

        // if (tempImagesBase64.length>0){
        // //   // eslint-disable-next-line guard-for-in
        //  for (const img64 in tempImagesBase64) {
        //       img64++;
        //    const data={
        //      imagen:img64,
        //      post:resp.id
        //    };
        //    await this.uploadImage(data);
        //  }
        // }



         //  this.uiServices.alertaInformativa(JSON.stringify(base64Image));
        // const data={
        //   imagen:base64Image,
        //   post:1
        // };
        // this.postService.uploadImage(data).subscribe(resp=>{
        //   this.uiServices.alertaInformativa(JSON.stringify(resp));
        // },error=>{
        //   this.uiServices.alertaInformativa(JSON.stringify(error));

        // });

         resolve(true);
       },error=>{
      });

    });
  }

 uploadImage(userId: any, imageBase64: any) {
    const data={
      imagen:imageBase64,
      post:userId
    };
    this.uiService.alertaInformativa('SE VA A CREAR '+JSON.stringify(data));

    return this.httpClient.post<any>(`${URL}/api/v1/imagen/`, data);
  }




subirImagen(idUser: any | number | Blob, img: any){
  const formData = new FormData();

  formData.append('imagen',img);
  formData.append('post',idUser);


  this.httpClient.post(`${URL}/api/v1/imagen/`,formData)
       .subscribe(resp1=>{
         console.log(resp1);
  });
};
 /*
//     const options: FileUploadOptions={
//       fileKey: 'imagen',
//     };
//     const fileTransfer: FileTransferObject = this.fileTransfer.create();
//     fileTransfer.upload(img,`${URL}/api/v1/imagen/`, options )
//     .then(data=>{
//       console.log(data);
//     }).catch(err=>{
//       console.log('Error en la carga de imagenes', err);
//     });
// */
//   }

obtenerCategoriasPosts(){
  return this.httpClient.get<any[]>(`${URL}/api/v1/categoria-post/`);
}
obtenerPostPorCategorias(categoria: number){
  return this.httpClient.get<Post[]>(`${URL}/api/v1/read-post/?categoria=${categoria}`);
}



  buscarPosts(getParams: any, event?: any){

    if(!event){
      this.paginaPostBuscar =0;
    }
    this.paginaPostBuscar ++;
    console.log('Antes del length',getParams.categorias);
      if(getParams.categorias){
        // eslint-disable-next-line guard-for-in
        for(const add of getParams.categorias){
          this.categoriasSeleccionadas.push(`&categoria=${add.id}`);
        }
        console.log('Las categorias seleccionadas fueron',this.categoriasSeleccionadas.join(''));
        console.log(`${URL}/api/v1/read-post/?q=${getParams.q}${this.categoriasSeleccionadas.join('')}&page=${this.paginaPostBuscar}`);
        // eslint-disable-next-line max-len
        return this.httpClient.get<RespuestaPosts>(`${URL}/api/v1/read-post/?q=${getParams.q}${this.categoriasSeleccionadas.join('')}&page=${this.paginaPostBuscar}`);
      }
      console.log(`${URL}/api/v1/read-post/?q=${getParams.q}&page=${this.paginaPostBuscar}`);
      return this.httpClient.get<RespuestaPosts>(`${URL}/api/v1/read-post/?q=${getParams.q}&page=${this.paginaPostBuscar}`);
    }


  private ejecutarQuery(query: any){
    query =  `${URL}/api/v1/read-post/?categoria=${query}`;
    return this.httpClient.get<Post[]>(query);
  }


  likesPost(idPost: any){
    return this.httpClient.get<any[]>(`${URL}/api/v1/post/${idPost}/like/`);
  }

  reportPost(idPost: any){
    return this.httpClient.get<any[]>(`${URL}/api/v1/post/${idPost}/reports/`);
  }

  vistasPost(idPost: any){
    return this.httpClient.get<any[]>(`${URL}/api/v1/post/${idPost}/visto/`);
  }

  alcancePost(idPost: any){
    return this.httpClient.get<any[]>(`${URL}/api/v1/post/${idPost}/alcance/`);
  }

  getPostsByUser(idUser, pull: boolean = false){
    if(pull){this.paginaPost=0;}
    this.paginaPost ++;
    return this.httpClient.get<RespuestaPosts>(`${URL}/api/v1/read-post/?owner=${idUser}&page=${this.paginaPost}`);
  }

}
