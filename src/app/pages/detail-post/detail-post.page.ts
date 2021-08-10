import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
// import { ActionSheetController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.page.html',
  styleUrls: ['./detail-post.page.scss'],
})
export class DetailPostPage implements OnInit {
idPost;
post: Post = {};
// Ojo se declara una variable como promesa para qyue
//  cuando esta se resuelva se pueda cargar el componente
postOk: Promise<boolean>;
enFavoritos = false;
messages = [
  {
    user: 'simon',
    createdAt: 1554090856000,
    msg: 'Message 1'
  },
  {
    user: 'simon',
    createdAt: 1554090856000,
    msg: 'Message 2'
  },
  {
    user: 'alex',
    createdAt: 1554090856000,
    msg: 'Message 3 Message 3 Message 3 Message 3 Message 3'
  },
];

currentUser;
newMsg = '';
maxRows = 4;
minRows = 2;
@ViewChild(IonContent) content: IonContent;
constructor(private activatedRoute: ActivatedRoute,
            private postService: PostsService,
            private navCtrl:  NavController,
            private router: Router
             ) {
  this.idPost = this.activatedRoute.snapshot.paramMap.get('id');
  }



  async ngOnInit() {
    this.getPostById(this.idPost);
    
  }

  getPostById(idPost){
    this.postService.getPostsById(idPost).subscribe((resp:Post)=>{
      this.post = resp;
      // this.currentUser = 1;

      console.log('El post',this.post);
      //Util para poder cargar el componente post
      this.postOk = Promise.resolve(true);
    },err=>{
      console.log(err);
    });
  }

  sendMessage(){
    this.postService.commentPost(this.post.id, this.newMsg)
    .subscribe(resp=>{
      console.log(resp);

      // this.post.post_comentario.push(resp);
      // this.router.navigate([this.router.url])
      // window.location.reload();
      this.ngOnInit();
    });
    // this.messages.push({
    //   user: 'alex',
    //   createdAt: new Date().getTime(),
    //   msg: this.newMsg
    // });
    this.newMsg = '';


    setTimeout(()=>{
      this.content.scrollToBottom(200);
    });
  }

  detailUser(idUser){
    this.navCtrl.navigateForward(`detail-user/${idUser}`);
  }

}
