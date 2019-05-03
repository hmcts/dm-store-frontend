import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DmStoreService } from '../dm-store-service';

@Component({
  selector: 'doc-delete',
  template: `
    <form #form="ngForm">
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-full">
          <details class="govuk-details">
            <summary class="govuk-details__summary">
              <span class="govuk-details__summary-text">Delete document</span>
            </summary>
            <div class="govuk-details__text">
              <div>
                <input class="govuk-input govuk-!-width-one-half" name="deleteUrl" type="text" ngModel>
                <button class="govuk-button govuk-button--warning" type="button"
                        (click)="deleteDocument(form.value.deleteUrl)">Delete</button>
              </div>
              <span *ngIf="(documentDeleted | async)">Document deleted</span>
            </div>
          </details>
        </div>
      </div>
    </form>
  `
})
export class DocumentDeleteComponent {

  documentDeleted: Observable<boolean>;

  constructor(private dmStoreService: DmStoreService) {}

  deleteDocument(documentUrl: string) {
    this.documentDeleted = this.dmStoreService.deleteDocument(documentUrl);
  }
}
