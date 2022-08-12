export class PermissionService{
  constructor() {
    this.initialize();
  }
  permissionsReadOnlyForMLO = new Map();
  permissionsReadOnlyForLockDesk = new Map();
  permissionsReadOnlyForLockDeskLimited = new Map();
  Roles = {
    mlo: 'mlo',
    lockdesk: 'lockdesk',
    lockdeskLimited: 'lockdesk_limited',
  };
  Fields = {
    BasePrice: 'base_price',
    CorporateMargin: 'Corporate Margin',
    CompanyMargin: 'Company Margin',
    MLOMargin: 'MLO Margin',
    CustomAdjustments: 'custom_adjustment',

  };
  initialize(){

    this.permissionsReadOnlyForMLO.set(this.Fields.BasePrice, true);
    this.permissionsReadOnlyForMLO.set(this.Fields.CorporateMargin, true);
    this.permissionsReadOnlyForMLO.set(this.Fields.CompanyMargin, true);
    this.permissionsReadOnlyForMLO.set(this.Fields.MLOMargin, false);
    this.permissionsReadOnlyForMLO.set(this.Fields.CustomAdjustments, false);

    this.permissionsReadOnlyForLockDesk.set(this.Fields.BasePrice, false);
    this.permissionsReadOnlyForLockDesk.set(this.Fields.CorporateMargin, false);
    this.permissionsReadOnlyForLockDesk.set(this.Fields.CompanyMargin, false);
    this.permissionsReadOnlyForLockDesk.set(this.Fields.MLOMargin, false);
    this.permissionsReadOnlyForLockDesk.set(this.Fields.CustomAdjustments, false);

    this.permissionsReadOnlyForLockDeskLimited.set(this.Fields.BasePrice, true);
    this.permissionsReadOnlyForLockDeskLimited.set(this.Fields.CorporateMargin, true);
    this.permissionsReadOnlyForLockDeskLimited.set(this.Fields.CompanyMargin, true);
    this.permissionsReadOnlyForLockDeskLimited.set(this.Fields.MLOMargin, false);
    this.permissionsReadOnlyForLockDeskLimited.set(this.Fields.CustomAdjustments, false);


  }
  isFieldReadOnly(role : string, field : string){
    if(role === this.Roles.mlo){
      return this.permissionsReadOnlyForMLO.get(field);
    }
    if(role === this.Roles.lockdesk){
      return this.permissionsReadOnlyForLockDesk.get(field);
    }
    if(role === this.Roles.lockdeskLimited){
      return this.permissionsReadOnlyForLockDeskLimited.get(field);
    }
  }


}
