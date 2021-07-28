export class UserMedia{
  constructor(userMediaId?: number, userId?: number, mediaUrl?: string, mediaType?: number, mediaDescription?: string,
              lastUpdatedAt?: Date, lastUpdatedBy?: string, deleteFlag?: boolean) {
    this.userMediaId = userMediaId;
    this.userId = userId;
    this.mediaUrl = mediaUrl;
    this.mediaType = mediaType;
    this.mediaDescription = mediaDescription;
    this.lastUpdatedAt = lastUpdatedAt;
    this.lastUpdatedBy = lastUpdatedBy;
    this.deleteFlag = deleteFlag;
  }
  userMediaId : number;
  userId : number;
  mediaUrl: string;
  mediaType: number;
  mediaDescription: string;
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
  deleteFlag: boolean;


}
