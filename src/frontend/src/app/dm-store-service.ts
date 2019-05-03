import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Metadata } from './components/document-metadata/document-metadata.interface';

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
    formData.append('metadata[type]', 'civil');
    formData.append('metadata[jurisdiction]', 'probate');

    return this.httpClient.post<any>('/documents', formData, { headers })
        .pipe(
            map(resp => resp._embedded.documents
                .flatMap(document => this.formatUrl(document._links.self.href))
            ),
        );
  }

  findDocuments(searchCriteria: { name: string, value: string }): Observable<string[]> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post<any>('/documents/filter', searchCriteria, { headers })
        .pipe(
            map(resp => resp._embedded.documents
                .flatMap(document => this.formatUrl(document._links.self.href))
            ),
        );
  }

  findUsersDocuments(): Observable<string[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.post<any>('/documents/owned', {}, { headers })
        .pipe(
            map(resp => resp._embedded.documents
                .flatMap(document => this.formatUrl(document._links.self.href))
            ),
        );
  }

  getDocumentMetadata(documentUrl: string): Observable<Metadata> {
    return this.httpClient.get<Metadata>(documentUrl);
  }

  deleteDocument(documentUrl: string): Observable<boolean> {
    return this.httpClient.delete(documentUrl)
        .pipe(map(() => true));
  }

  formatUrl(url: string): string {
    return url.replace(/http.*\/documents\//, `/documents/`);
  }
}
