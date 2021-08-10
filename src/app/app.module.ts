import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/interceptor.service';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { Base64 } from '@ionic-native/base64/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ],
  providers: [
              HttpClientModule,
              Camera,
              FileTransfer,
              Base64,
              SocialSharing,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: HeaderInterceptor,
                multi: true
              },
              { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
