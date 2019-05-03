import { Component, Input } from '@angular/core';
import { DmStoreService } from '../dm-store-service';

@Component({
  selector: 'doc-upload',
  template: `
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-full">
        <details class="govuk-details">
          <summary class="govuk-details__summary">
            <span class="govuk-details__summary-text">Upload new document(s)</span>
          </summary>
          <div class="govuk-details__text">
            <dl class="govuk-summary-list">
              <div class="govuk-summary-list__row">
                <dd class="govuk-summary-list__value">
                    <input type="file" multiple class="govuk-file-upload" 
                       (change)="fileChange($event)" accept=".pdf,.doc,.docx">
                </dd>
              </div>
              <div *ngFor="let uploadUrl of uploadUrls" class="govuk-summary-list__row">
                <dd class="govuk-summary-list__value">
                  <span class="govuk-label">{{ uploadUrl }}</span>
                </dd>
              </div>
            </dl>
          </div>
        </details>
      </div>
    </div>
  `
})
export class DocumentUploadComponent {

  uploadUrls: string[];
  filesToUpload: FileList;

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
}
