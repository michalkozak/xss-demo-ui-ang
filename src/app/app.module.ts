import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DemoObjectListComponent } from './demo-object-list/demo-object-list.component';
import { DemoObjectNewComponent } from './demo-object-new/demo-object-new.component';
import { DemoObjectDetailsComponent } from './demo-object-details/demo-object-details.component';
import { DemoObjectUploadComponent } from './demo-object-upload/demo-object-upload.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'demo-objects', pathMatch: 'full'},
      {path: 'demo-objects', component: DemoObjectListComponent},
      {path: 'demo-objects/new', component: DemoObjectNewComponent},
      {path: 'demo-objects/upload', component: DemoObjectUploadComponent},
      {path: 'demo-objects/:demoObjectId', component: DemoObjectDetailsComponent},
    ]),
    FormsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    DemoObjectListComponent,
    DemoObjectNewComponent,
    DemoObjectDetailsComponent,
    DemoObjectUploadComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
