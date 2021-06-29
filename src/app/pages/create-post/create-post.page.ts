import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post, CategoriaPost } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UiServiceService } from '../../services/ui-services.service';
import { LoadingController } from '@ionic/angular';


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


  post: Post={
    categoria:[],
    mensaje:'',
    titulo:''
  };
  imagen: File;
  constructor(private postService: PostsService,
              private router: Router,
              private camera: Camera,
              private uiServices: UiServiceService,
              public loadingController: LoadingController) { }

  ngOnInit() {
  this.postService.obtenerCategoriasPosts()
  .subscribe((resp: any)=>{
    this.listaCategorias.push(...resp.results);
  },err=>{
    console.log(err);
  });
}



  async crearPost(){
    this.uiServices.presentLoading();
    this.post.titulo = this.post.mensaje;
    // this.post.categoria.push()

    const creado = await this.postService.crearPost(this.post, this.tempImagesBase64);
    // await this.postService.uploadImage(20,this.tempImagesBase64);

    this.post.mensaje='';
    this.tempImages=[];
    this.tempImagesBase64=[];
    this.loadingController.dismiss();
    this.router.navigateByUrl('/main/tabs/tab1');
  }

  camara(){

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options);
  }
  galeria(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }
  prueba(){
  }
  procesarImagen(   options: CameraOptions){
     this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc(base64Image);
      this.tempImages.push(img);
      this.tempImagesBase64.push(JSON.stringify(base64Image));
      // this.postService.uploadImage(10,base64Image);
      // this.postService.subirImagen(24, base64Image);
    }, (err) => {
      // Handle error
    });
  }
}
