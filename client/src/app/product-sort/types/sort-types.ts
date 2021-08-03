
import { SortCategory } from "./sort-category";

export const SORTTYPES: SortCategory[] = [
  { title: 'Default',
    default: true,
    selected: false
  },
  { title: 'Price ascending',
    property: 'price',
    ascending: true,
    selected: false
  },
  { title: 'Price descending',
    property: 'price',
    ascending: false,
    selected: false
  },
  { title: 'Rating ascending',
    property: 'rating',
    ascending: true,
    selected: false
  },
  { title: 'Rating descending',
    property: 'rating',
    ascending: false,
    selected: false
  }
];

