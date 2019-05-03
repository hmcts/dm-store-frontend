import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DocumentMetadataComponent } from './components/document-metadata/document-metadata.component';
import { DocumentUploadComponent } from './components/document-upload.component';
import { DocumentDownloadComponent } from './components/document-download.component';
import { DocumentSearchComponent } from './components/document-search.component';
import { DocumentDeleteComponent } from './components/document-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentMetadataComponent,
    DocumentUploadComponent,
    DocumentDownloadComponent,
    DocumentSearchComponent,
    DocumentDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
