import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Metadata } from './document-metadata.interface';

@Injectable({
  providedIn: 'root',
})
export class DmStoreService {

  constructor(private httpClient: HttpClient) {}

  uploadDocument(fileList: FileList): Observable<string[]> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();

    for (let index=0; index < fileList.length; index++) {
      formData.append('files', fileList[index], fileList[index].name);
    }
    formData.append('classification', 'PUBLIC');

    return this.httpClient.post<any>('/documents', formData, { headers })
        .pipe(
            map(resp => resp._embedded.documents
                .flatMap(document => this.formatUrl(document._links.self.href))
            ),
        );
  }

  getDocumentMetadata(documentUrl: string): Observable<Metadata> {
    return this.httpClient.get<Metadata>(documentUrl);
  }

  formatUrl(url: string): string {
    return url.replace(/http.*\/documents\//, `/documents/`);
  }
}
