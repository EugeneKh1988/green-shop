import type { Schema, Struct } from '@strapi/strapi';

export interface PlantSizesPlantSizes extends Struct.ComponentSchema {
  collectionName: 'components_plant_sizes_plant_sizes';
  info: {
    displayName: 'PlantSizes';
    icon: 'calendar';
  };
  attributes: {
    count: Schema.Attribute.Integer;
    size: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'plant-sizes.plant-sizes': PlantSizesPlantSizes;
    }
  }
}
