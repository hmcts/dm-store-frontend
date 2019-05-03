import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DmStoreService } from '../dm-store-service';

@Component({
  selector: 'doc-search',
  template: `
    <form #form="ngForm">
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-full">
          <details class="govuk-details">
            <summary class="govuk-details__summary">
              <span class="govuk-details__summary-text">Search for documents</span>
            </summary>
            <div class="govuk-details__text">
              <div>
                <input class="govuk-input govuk-!-width-one-quarter govuk-!-margin-right-1" name="name" type="text" ngModel>
                <input class="govuk-input govuk-!-width-one-quarter govuk-!-margin-right-1" name="value" type="text" ngModel>
                <button class="govuk-button govuk-button--secondary" type="button"
                        (click)="findDocuments(form.value)">Find documents</button>
              </div>
              <div>
                <button class="govuk-button" type="button"
                        (click)="findUserDocuments()">Find user's documents</button>
              </div>
              <div *ngFor="let documentUrl of (documentsFound | async)" class="govuk-summary-list__row">
                <dd class="govuk-summary-list__value">
                  <span class="govuk-label">{{ documentUrl }}</span>
                </dd>
              </div>
            </div>
          </details>
        </div>
      </div>
    </form>
  `
})
export class DocumentSearchComponent {

  documentsFound: Observable<any>;

  constructor(private dmStoreService: DmStoreService) {}

  findDocuments(searchCriteria: any) {
    this.documentsFound = this.dmStoreService.findDocuments(searchCriteria);
  }

  findUserDocuments() {
    this.documentsFound = this.dmStoreService.findUsersDocuments();
  }
}
