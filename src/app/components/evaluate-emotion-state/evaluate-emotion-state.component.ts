import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PruebasService } from '../../services/pruebas.service';

@Component({
  selector: 'app-evaluate-emotion-state',
  templateUrl: './evaluate-emotion-state.component.html',
  styleUrls: ['./evaluate-emotion-state.component.scss'],
})
export class EvaluateEmotionStateComponent implements OnInit {

  constructor(public modalCtrl: ModalController,
              private pruebasService: PruebasService ) { }
emotions=[
  {
    icon: '../../../assets/emoticonos1-10/9-perfecto.svg',
    emotion_name: 'Perfecto',
    emotion_value: 9
  },
  {
    icon: '../../../assets/emoticonos1-10/8-excelente.svg',
    emotion_name: 'Excelente',
    emotion_value: 8
  },
  {
    icon: '../../../assets/emoticonos1-10/7-optimo.svg',
    emotion_name: 'Óptimo',
    emotion_value: 7
  },
  {
    icon: '../../../assets/emoticonos1-10/6-muy-bien.svg',
    emotion_name: 'Muy Bien',
    emotion_value: 6
  },
  {
    icon: '../../../assets/emoticonos1-10/5-bien.svg',
    emotion_name: 'Bien',
    emotion_value: 5
  },
  {
    icon: '../../../assets/emoticonos1-10/4-no-tan-bien.svg',
    emotion_name: 'No tan bien',
    emotion_value: 4
  },
  {
    icon: '../../../assets/emoticonos1-10/3-regular.svg',
    emotion_name: 'Regular',
    emotion_value: 3
  },
  {
    icon: '../../../assets/emoticonos1-10/2-mal.svg',
    emotion_name: 'Mal',
    emotion_value: 2
  },
  {
    icon: '../../../assets/emoticonos1-10/1-muy-mal.svg',
    emotion_name: 'Muy mal',
    emotion_value: 1
  }
]
  ngOnInit() {}
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  sendTestEmotion(emotion){
    console.log(emotion);
    this.pruebasService.evaluateEmotionState(emotion)
    .subscribe(resp=>{
      console.log(resp);
      this.cerrarModal();
    }, error=>{
      console.log(error);
      this.cerrarModal();
    });
  }

}
