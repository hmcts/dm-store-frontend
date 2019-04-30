import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  documentUrl: string;
  dmStoreFile: File;

  constructor(private httpClient: HttpClient) {}

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0 && (!this.dmStoreFile || fileList[0] !== this.dmStoreFile)) {

      this.dmStoreFile = fileList[0];

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      const formData: FormData = new FormData();
      formData.append('files', this.dmStoreFile, this.dmStoreFile.name);
      formData.append('classification', 'PUBLIC');

      this.httpClient.post<any>('/documents', formData, { headers })
          .subscribe(resp => {
            this.documentUrl = resp._embedded.documents['0']._links.self.href;
          });
    }
  }

  setDocumentUrl(documentUrl: string) {
    this.documentUrl = documentUrl;
  }
}
