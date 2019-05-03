import { Component } from '@angular/core';

@Component({
  selector: 'doc-root',
  template: `
    <div class="govuk-width-container">
      <main class="govuk-main-wrapper govuk-!-margin-left-5">
        <h1 class="govuk-heading-l">{{ title }}</h1>
        <div class="govuk-!-margin-left-5">
          <doc-upload></doc-upload>
          <doc-download></doc-download>
          <doc-metadata></doc-metadata>
          <doc-search></doc-search>
          <doc-delete></doc-delete>
        </div>
      </main>
    </div>
  `
})
export class AppComponent {

  title = 'Document Store Frontend application'

  constructor() {}

}
