/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from '../../../environments/environment';
import { LoadingController, IonSegment } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-services.service';
import { PostsService } from '../../services/posts.service';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebasService } from '../../services/pruebas.service';



import { Camera, CameraResultType} from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';



declare let window: any;
const URL = environment.url;

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.page.html',
  styleUrls: ['./detail-user.page.scss'],
})
export class DetailUserPage implements OnInit {

  // @ViewChild(IonSegment) segment: IonSegment;
 
  tempImages = '';
  tempImagesBase64 = '';
  segmentUser: string = 'user';
  pruebas: any[]=[];
  //SINO DECLARO EL TIPO DE OBJETO USER DA ERROR AL CARGAR LA PAGINA
  usuario: User={
    username:     '',
    email:        '',
    password1:    '',
    password2:    '',
    first_name:   '',
    last_name:    '',
    presentation: '',
    seguidores:   [],
    usuario_seguidores:   [],
    amigos:       [],
    post_set:       [],
    age: 0,
    birthday: 0,
    height: 0,
    weight: 0,
  };
  urlTreePage;
  idUser;
  photo;
  
  constructor(private usuarioService: UsuarioService,
              private http: HttpClient,
              private loadingController: LoadingController,
              private uiServices: UiServiceService,
              private postService: PostsService,
              // private camera: Camera,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private pruebasService: PruebasService,
              private sanitizer: DomSanitizer
              ) {
                this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
                console.log(this.idUser);
              }
  async ngOnInit(){
    await this.getUser(this.idUser);
    // this.segmentUser = 'user';  
  }
  ionViewWillEnter(){
    this.pruebasService.getPruebasIMCByUser(this.usuario.id)
    .subscribe(resp=>{
      this.pruebas = resp.results;
      console.log(resp)
    }, error=>{console.log(error)})
  }
getUser(idUser){
  this.usuarioService.getUserById(idUser).subscribe(usuario=>{
    this.usuario=usuario;
  },error=>{
    this.uiServices.presentToast('No se pudo cargar su información de usuario');
  });
}

async userUpdate(fUserUpdate: NgForm){
    if(fUserUpdate.invalid){return;}
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      //duration: 2000
    });
    await loading.present();
    this.usuarioService.userUpdate(fUserUpdate.value)
      .subscribe(user=>{
        this.usuario = user;
      this.uiServices.presentToast('Usuario actualizado');
    },error=>{
      this.uiServices.presentToast('Ha ocurrido una error y no se pudo actualizar el usuario');
      });
    await loading.dismiss();
}

  logout(){
    this.postService.paginaPost=0;
    this.usuarioService.logout();
    this.uiServices.presentToast('Se ha cerrado la sesión');

  }
  onClick(){}

  // galeria(){
  //   const options: CameraOptions = {
  //     quality: 60,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //   };
  //   this.procesarImagen(options);
  // }
  // procesarImagen(   options: CameraOptions){
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     const base64Image = 'data:image/jpeg;base64,' + imageData;
  //     const img = window.Ionic.WebView.convertFileSrc(base64Image);
  //     this.tempImages=img;
  //     this.tempImagesBase64 =JSON.stringify(base64Image);
  //     // this.postService.uploadImage(10,base64Image);
  //     // this.postService.subirImagen(24, base64Image);
  //   }, (err) => {
  //     // Handle error
  //   });
  // }


  async camara() {

    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      height: 300,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      correctOrientation: true,
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
    // console.log('this.photo::::::',this.photo.changingThisBreaksApplicationSecurity);
    
    // // const base64Image = 'data:image/jpeg;base64,' + image.base64String;
    // // console.log('base64Image',base64Image);
    // // const img = window.Ionic.WebView.convertFileSrc(base64Image);
    // this.tempImages = this.photo;
    // this.tempImagesBase64 = JSON.stringify(this.photo.changingThisBreaksApplicationSecurity);
    // this.postService.uploadImage(10,this.photo);
    // this.postService.subirImagen(24, this.photo);
    // console.log('img',img);
    
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // var imageUrl = image.path;
    // console.log('imageUrl',imageUrl);
    
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
    // console.log('tempImages',this.tempImages);
  };

  segmentChangeDetailUser(event){
    const valueSegment = event.detail.value;
    console.log(valueSegment);
  }
}
