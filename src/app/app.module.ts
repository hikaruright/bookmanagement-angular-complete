import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {TooltipModule} from 'ngx-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes, Router } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { DetailComponent } from './detail/detail.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'list', component: ListComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}, //404 page
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ListComponent,
    RegisterComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes), // RouterModule
    TooltipModule.forRoot(), //Bootstrapを使用
    FormsModule, // フォームを使用する
    ReactiveFormsModule, // リアクティブフォームの利用
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
