import {UserMlo} from '@data/schema/user/user-mlo';

export class UserMedia{

  userMediaId : number;
  userId : number;
  mediaURL: string;
  mediaType: number;
  mediaDescription: string;
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
  deleteFlag: boolean;
  mediaId : number;
  userDTO : UserMlo;


}
