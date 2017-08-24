import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import {
    ApiService,
    JwtService,
    UserService,
    SharedModule,
    MaterialModule
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    rootRouting,
    MaterialModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule
  ],
  providers: [
      ApiService,
      JwtService,
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
