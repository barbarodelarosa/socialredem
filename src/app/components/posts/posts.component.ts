import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  @Input() posts: Post[]=[];
  @Input() enFavoritos = false;
  constructor() { }

  ngOnInit() {
    console.log(this.posts);
  }

}
