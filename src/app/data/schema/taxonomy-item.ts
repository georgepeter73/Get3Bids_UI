export class TaxonomyItem {
  id: string;
  key: string;
  value: string;
  description: string;
  description1: string;
  description2: string;
  thumbnail: string;

  constructor(
    id,
    key,
    value,
    description,
    description1,
    description2,
    thumbnail
  ) {
    this.id = id;
    this.key = key;
    this.value = value;
    this.description = description;
    this.description1 = description1;
    this.description2 = description2;
    this.thumbnail = thumbnail;
  }
}
