/* eslint-disable @typescript-eslint/naming-convention */
export interface RespuestaPosts {
  count?: number;
  num_pages?: number;
  page_number?: number;
  page_size?: number;
  next_link?: string;
  previous_link?: any;
  results?: Post[];
}

export interface Post {
  id?: number;
  owner?: OwnerPost;
  categoria?: CategoriaPost[];
  post_comentario?: ComentarioPost[];
  post_imagen?: PostImagen[];
  titulo?: string;
  mensaje?: string;
  coordenadas?: any;
  imagen?: any;
  creado?: string;
  actualizado?: string;
  votos?: number;
  compartido?: number;
  likes?: any[];
  vistas?: number;
  precio?: number;
}

export interface CategoriaPost {
  id?: number;
  nombre?: string;
  imagen?: any;
  creado?: string;
  actualizado?: string;
}

export interface OwnerPost {
  id?: number;
  avatar?: string;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}


export interface PostImagen {
  id?: number;
  enlace?: any;
  imagen?: string;
  texto?: any;
  creado?: string;
  post?: number;
}

export interface RespuestaLogin {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  detail?: any; // este es solo para que no de error en el servicio
  pk?: number;
  id?: number;
  username: string;
  email: string;
  avatar?: string;
  password1: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  presentation?: string;
  seguidores?: any[];
  amigos?: any[];
  usuario_seguidores?: any[];
  post_set?: any[];
  age?: number,
  birthday?: number,
  height?: number,
  weight?: number,
}

export interface ComentarioPost {
  id?: string;
  texto?: string;
  votos?: string;
  creado?: string;
  compartido?: string;
  owner?: any;
  likes?: any[];
  post?: Post;
}