import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DmStoreService } from '../../dm-store-service';
import { Metadata } from './document-metadata.interface';

@Component({
  selector: 'doc-metadata',
  templateUrl: 'document-metadata.component.html'
})
export class DocumentMetadataComponent {

  metadata: Observable<Metadata>;

  constructor(private dmStoreService: DmStoreService) {}

  getDocumentMetadata(documentUrl: string) {
    this.metadata = this.dmStoreService.getDocumentMetadata(documentUrl);
  }
}
