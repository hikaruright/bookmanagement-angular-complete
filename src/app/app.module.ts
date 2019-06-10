import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import {TooltipModule} from 'ngx-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes, Router } from '@angular/router';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ListHeaderComponent } from './list/list-header/list-header.component';
import { GlobalErrorHandler } from 'src/service/error-handler';

// RotueModule => URLパスとの紐付けを行う
const appRoutes: Routes = [
  {path: 'login', component: LoginComponent}, 
  {path: 'list', component: ListComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}, // 404 page
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ListComponent,
    RegisterComponent,
    DetailComponent,
    EditComponent,
    ListHeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes), // RouterModule
    TooltipModule.forRoot(), // Bootstrapを使用
    FormsModule, // フォームを使用する
    ReactiveFormsModule, // リアクティブフォームの利用
    HttpClientModule, // HTTPクライアントの利用
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
