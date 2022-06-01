import { Guidelinelink } from '@data/schema/lockdesk/guidelinelink';

export class Guideline {
  documentDescription: string;
  guidelineLink: Guidelinelink;
  constructor(documentDescription?: string, guidelineLink?: Guidelinelink) {
    this.documentDescription = documentDescription;
    this.guidelineLink = new Guidelinelink(
      guidelineLink.rel,
      guidelineLink.href,
      guidelineLink.action,
      guidelineLink.fileExtension
    );
  }
}
