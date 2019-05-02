import { Component, Input } from '@angular/core';
import { Metadata } from './document-metadata.interface';

@Component({
  selector: 'app-document-metadata',
  template: `
    <dl *ngIf="metadata" class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">document name</dt>
        <dd class="govuk-summary-list__value">{{ metadata.originalDocumentName }}</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">type</dt>
        <dd class="govuk-summary-list__value">{{ metadata.mimeType }}</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">classification</dt>
        <dd class="govuk-summary-list__value">{{ metadata.classification }}</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">created on</dt>
        <dd class="govuk-summary-list__value">{{ metadata.createdOn }}</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">modified on</dt>
        <dd class="govuk-summary-list__value">{{ metadata.modifiedOn }}</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">size</dt>
        <dd class="govuk-summary-list__value">{{ metadata.size }} bytes</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">roles</dt>
        <dd class="govuk-summary-list__value">{{ metadata.roles }}</dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">metadata</dt>
        <dd class="govuk-summary-list__value">{{ metadata.metadata | json }}</dd>
      </div>
    </dl>
  `
})
export class DocumentMetadataComponent {

  @Input() metadata: Metadata;
  constructor() {}
}
