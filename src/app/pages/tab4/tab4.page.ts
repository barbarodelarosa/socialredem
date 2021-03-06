/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from '../../../environments/environment';
import { LoadingController, PopoverController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-services.service';
import { PostsService } from '../../services/posts.service';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Post, User, RespuestaPosts } from '../../interfaces/interfaces';
import { PruebasService } from '../../services/pruebas.service';
import { Router } from '@angular/router';
import { PopOverEmotionComponent } from '../../components/pop-over-emotion/pop-over-emotion.component';



import { Camera, CameraResultType} from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';


declare let window: any;
const URL = environment.url;

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  tempImages = '';
  tempImagesBase64 = '';
  postsByUser: Post[]=[];
  habilitado=true;
  nextResult=false;
  numPages=1;
  numPageActual=0;
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
    age: 0,
    birthday: 0,
    height: 0,
    weight: 0,
  };
  segmentUser: string = 'user';
  emotions = [];
  photo;
  constructor(private usuarioService: UsuarioService,
              private http: HttpClient,
              private loadingController: LoadingController,
              private uiServices: UiServiceService,
              private postService: PostsService,
              // private camera: Camera,
              private pruebasService: PruebasService,
              private router: Router,
              private popOver: PopoverController,
              private sanitizer: DomSanitizer
              ) {}
  async ngOnInit(){
    this.uiServices.presentLoading();

    await this.getUser();

  }
  // El codigo pesado para cuando va a cargar la pagina va aqui
  ionViewWillEnter(){
    this.pruebasService.getPruebasIMCByUser(this.usuario.id)
    .subscribe(resp=>{
      this.pruebas = resp.results;
      console.log(resp)
    }, error=>{console.log(error)});

    this.uiServices.dismiss();
  }
  ionViewDidEnter(){
    this.getEmotion();
    console.log('Estamos en DidEnter');
  }
  getEmotion(){
    this.pruebasService.getEmotionStateByUser(this.usuario.id)
    .subscribe(resp_emotions=>{
      this.emotions = resp_emotions.results;
      console.log(this.emotions);
      this.emotions = this.emotions.slice(0,6);
      console.log(this.emotions);
    }, err=>{
      console.log(err);
    })
  }
getUser(){
  this.usuarioService.getUser().subscribe(usuario=>{
    this.usuario=usuario;
  },error=>{
    this.uiServices.presentToast('No se pudo cargar su informaci??n de usuario');
  });
}

async userUpdate(fUserUpdate: NgForm){
    if(fUserUpdate.invalid){return;}
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      //duration: 2000
    });
    await loading.present();
    console.log('Valores de usuario', this.usuario);
    this.usuarioService.userUpdate(this.usuario)
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
    this.uiServices.presentToast('Se ha cerrado la sesi??n');

  }

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
  //     imageData is either a base64 encoded string or a file URI
  //     If it's base64 (DATA_URL):
  //     const base64Image = 'data:image/jpeg;base64,' + imageData;
  //     const img = window.Ionic.WebView.convertFileSrc(base64Image);
  //     this.tempImages=img;
  //     this.tempImagesBase64 =JSON.stringify(base64Image);
  //     this.postService.uploadImage(10,base64Image);
  //     this.postService.subirImagen(24, base64Image);
  //   }, (err) => {
  //     Handle error
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
    this.usuario.avatar = this.photo;
    this.tempImagesBase64 = JSON.stringify(this.photo.changingThisBreaksApplicationSecurity);
    // this.postService.uploadImage(10,this.photo);
    // this.postService.subirImagen(24, this.photo);
    // console.log('img',img);
    console.log('this.tempImages',this.tempImages);
    console.log('this.tempImagesBase64',this.tempImagesBase64);
    
    this.usuarioService.userUpdate(this.usuario, this.tempImagesBase64).subscribe(resp=>{
      console.log(resp);
      this.usuario = resp;
    }, err=>{
      this.uiServices.presentToast("No se pudo actualizar la imagen");
      console.log(err);
    }
    )
    
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
  editarPerfil(){
    console.log('Navigate');
    this.router.navigateByUrl('edit-user');
  }
  // postsUser(event?){
  //   this.postService.getPostsByUser(this.usuario.id).subscribe((resp:RespuestaPosts)=>{
  //     this.postsByUser.push(...resp.results);
    
  //     console.log(this.postsByUser[5].post_imagen[0].imagen);
  //     if(event){
  //       event.target.complete();
  //       console.log('Habilitado->',resp.results.length);
  //       console.log('resp.num_pages',resp.num_pages);
  //       console.log('resp.page_number',resp.page_number);
  //       if(resp.num_pages === resp.page_number){
  //         event.target.disabled=false;
  //         // this.habilitado = false;
  //       }
  //     }
  //   });
  // }
  // nextPost(event?){
  //   if(this.nextResult === true){
  //     this.postsUser(event)
  //   }
  // }
  // getPruebasIMCByUser(id){
  //   this.pruebasService.getPruebasIMCByUser(id)
  //   .subscribe(resp=>{
  //     this.pruebas = resp.results;
  //     console.log(resp)
  //   }, error=>{console.log(error)})
  // }

  async detailEmoticono(event, emotion){
    console.log(emotion);
    
    const popOver = await this.popOver.create({
        
        component: PopOverEmotionComponent,
        componentProps: {name : emotion.emotion_name},
        event,
        mode: 'ios'
    });
    await popOver.present();

  }
}

