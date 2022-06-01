export class UserMedia {
  constructor(
    userMediaId?: number,
    mediaURL?: string,
    mediaType?: number,
    mediaDescription?: string,
    lastUpdatedBy?: string,
    lastUpdatedAt?: Date,
    deleteFlag?: boolean
  ) {
    this.userMediaId = userMediaId;
    this.mediaURL = mediaURL;
    this.mediaType = mediaType;
    this.mediaDescription = mediaDescription;
    this.lastUpdatedBy = lastUpdatedBy;
    this.lastUpdatedAt = lastUpdatedAt;
    this.deleteFlag = deleteFlag;
  }
  userMediaId: number;
  mediaURL: string;
  mediaType: number;
  mediaDescription: string;
  lastUpdatedBy: string;
  lastUpdatedAt: Date;
  deleteFlag: boolean;
}
