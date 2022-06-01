export class Guidelinelink {
  rel: string;
  href: string;
  action: string;
  fileExtension: string;
  constructor(
    rel: string,
    href: string,
    action: string,
    fileExtension: string
  ) {
    this.rel = rel;
    this.href = href;
    this.action = action;
    this.fileExtension = fileExtension;
  }
}
