import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { StartPageComponent } from './start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    DocumentUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: StartPageComponent },
      { path: 'document-upload', component: DocumentUploadComponent }
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
