import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
//import { RespuestaPosts } from '../interfaces/post.interface';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import {Platform} from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UiServiceService } from './ui-services.service';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class PostsService {

paginaPost = 0;
post: Post;
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

 async crearPost(post, tempImagesBase64?: any[]){


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

 uploadImage(userId, imageBase64) {
    const data={
      imagen:imageBase64,
      post:userId
    };
    this.uiService.alertaInformativa('SE VA A CREAR '+JSON.stringify(data));

    return this.httpClient.post<any>(`${URL}/api/v1/imagen/`, data);
  }




subirImagen(idUser, img: any){
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
}
