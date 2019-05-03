import { Component } from '@angular/core';

@Component({
  selector: 'doc-download',
  template: `
    <form #form="ngForm">
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-full">
          <details class="govuk-details">
            <summary class="govuk-details__summary">
              <span class="govuk-details__summary-text">Fetch existing document</span>
            </summary>
            <div class="govuk-details__text">
              <div>
                <input class="govuk-input govuk-!-width-one-half" name="downloadUrl" type="text" ngModel>
                <button class="govuk-button" type="button"
                        (click)="setDownloadUrl(form.value.downloadUrl)">Get document</button>
              </div>
              <a *ngIf="downloadUrl" [href]="downloadUrl + '/binary'" target="_blank">Click to download</a>
            </div>
          </details>
        </div>
      </div>
    </form>
  `
})
export class DocumentDownloadComponent {

  private downloadUrl: string;

  constructor() {}


  setDownloadUrl(documentUrl: string) {
    this.downloadUrl = documentUrl;
  }
}
