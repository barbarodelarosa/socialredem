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
  post_comentario?: any[];
  post_imagen?: PostImagen[];
  titulo?: string;
  mensaje?: string;
  coordenadas?: any;
  imagen?: any;
  creado?: string;
  actualizado?: string;
  votos?: number;
  compartido?: number;
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

