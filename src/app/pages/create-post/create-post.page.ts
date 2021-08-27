import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post, CategoriaPost } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
// import { CameraOptions } from '@ionic-native/camera/ngx';
// Camera
import { UiServiceService } from '../../services/ui-services.service';
import { LoadingController, Platform } from '@ionic/angular';
// import { Plugins } from '@capacitor/core';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';

// import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto };


// const { Camera, Filesystem, Storage } = Plugins;

declare let window: any;

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  @ViewChild('quantity') quantity: ElementRef;
  tempImages: string[] = [];
  tempImagesBase64: string[] = [];
  selectedOption='Categoria 1';
  categoriaSeleccionadas: any[];
  listaCategorias: CategoriaPost[] = [];
  photo: any;


  post: Post={
    categoria:[],
    mensaje:'',
    titulo:''
  };
  imagen: File;
  constructor(private postService: PostsService,
              private router: Router,
              // private camera: Camera,
              private uiServices: UiServiceService,
              public loadingController: LoadingController,
              private platform: Platform,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
  this.postService.obtenerCategoriasPosts()
  .subscribe((resp: any)=>{
    this.listaCategorias.push(...resp.results);
  },err=>{
    console.log(err);
  });
}



  async crearPost(){
    for (const key of this.categoriaSeleccionadas) {
      console.log(key.id);
      this.post.categoria.push(key.id);
    }

    this.uiServices.presentLoading();
    this.post.titulo = this.post.mensaje;
    const creado = await this.postService.crearPost(this.post, this.tempImagesBase64);
    // await this.postService.uploadImage(20,this.tempImagesBase64);

    this.post.mensaje='';
    this.tempImages=[];
    this.tempImagesBase64=[];
    this.loadingController.dismiss();
    this.router.navigateByUrl('/main/tabs/tab1');
  }

  // camara(){

    // Camera.getPhoto();
    // const options: CameraOptions = {
    //   quality: 60,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: this.camera.PictureSourceType.CAMERA
    // };
    // this.procesarImagen(options);
  // }
  galeria(){
    // const options: CameraOptions = {
    //   quality: 60,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // };
    // this.procesarImagen(options);
  }
  prueba(){
  }
  // procesarImagen(   options: CameraOptions){
  //   //  this.camera.getPicture(options).then((imageData) => {
  //   //   // imageData is either a base64 encoded string or a file URI
  //   //   // If it's base64 (DATA_URL):
  //   //   const base64Image = 'data:image/jpeg;base64,' + imageData;
  //   //   const img = window.Ionic.WebView.convertFileSrc(base64Image);
  //   //   this.tempImages.push(img);
  //   //   this.tempImagesBase64.push(JSON.stringify(base64Image));
  //   //   // this.postService.uploadImage(10,base64Image);
  //   //   // this.postService.subirImagen(24, base64Image);
  //   // }, (err) => {
  //   //   // Handle error
  //   // });
  // }

  // const takePicture = async () =>
  async camara() {

    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      // source: CameraSource.Prompt
    });
    // const image = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: true,
    //   resultType: CameraResultType.Base64,
    //   saveToGallery: true,
    // });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    console.log('this.photo', this.photo);
    console.log('this.photo::::::',this.photo.changingThisBreaksApplicationSecurity);
    
    // const base64Image = 'data:image/jpeg;base64,' + image.base64String;
    // console.log('base64Image',base64Image);
    // const img = window.Ionic.WebView.convertFileSrc(base64Image);
    this.tempImages.push(this.photo);
    this.tempImagesBase64.push(JSON.stringify(this.photo.changingThisBreaksApplicationSecurity));
    // console.log('img',img);
    
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // var imageUrl = image.path;
    // console.log('imageUrl',imageUrl);
    
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
    console.log('tempImages',this.tempImages);
  };


}
