import { TaxonomyItem } from './taxonomy-item';
export class Taxonomy {
  id: string;
  type: string;
  description: string;
  taxonomyItems: TaxonomyItem[];

  constructor(id, type, description, taxonomyItems) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.taxonomyItems = [];
    this.taxonomyItems = taxonomyItems.map(taxonomyItem => {
      return new TaxonomyItem(
        taxonomyItem.taxonomyItemId,
        taxonomyItem.itemKey,
        taxonomyItem.itemValue,
        taxonomyItem.itemDesc,
        taxonomyItem.itemDesc1,
        taxonomyItem.itemDesc2,
        taxonomyItem.thumbnail
      );
    });
  }
}
