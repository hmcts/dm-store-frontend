import { Component } from '@angular/core';
import { DmStoreService } from './dm-store-service';
import { Observable } from 'rxjs';
import { Metadata } from './document-metadata.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  uploadUrls: string[];
  downloadUrl: string;
  filesToUpload: FileList;
  documentMetadata: Observable<Metadata>;

  constructor(private dmStoreService: DmStoreService) {}

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0 && (!this.filesToUpload || fileList !== this.filesToUpload)) {

      this.filesToUpload = fileList;

      this.dmStoreService.uploadDocument(this.filesToUpload)
          .subscribe(documentUrls => {
            this.uploadUrls = documentUrls;
          });
    }
  }

  setDownloadUrl(documentUrl: string) {
    this.downloadUrl = documentUrl;
  }

  getDocumentMetadata(documentUrl: string) {
    this.documentMetadata = this.dmStoreService.getDocumentMetadata(documentUrl);
  }
}
