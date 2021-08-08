

import { RangeFilterCategory } from "./range-filter-category";
import { Unit } from "./unit";

export const RANGE_FILTER_TYPES: RangeFilterCategory[] = [
    { title: 'Price',
    type: 'range',
    items: [
      {minValue: 0, maxValue: 25, unit: Unit.CurrencyDollar, selected: false},
      {minValue: 25, maxValue: 75, unit: Unit.CurrencyDollar, selected: false},
      {minValue: 75, maxValue: 100, unit: Unit.CurrencyDollar, selected: false},
      {minValue: 100, maxValue: Infinity, unit: Unit.CurrencyDollar, selected: false}
    ],
  },
  { title: 'Age',
    type: 'range',
    items: [
      {minValue: 2, maxValue: 3, unit: Unit.Age, selected: false},
      {minValue: 4, maxValue: 5, unit: Unit.Age, selected: false},
      {minValue: 6, maxValue: 8, unit: Unit.Age, selected: false},
      {minValue: 9, maxValue: 12, unit: Unit.Age, selected: false},
      {minValue: 13, maxValue: 17, unit: Unit.Age, selected: false},
      {minValue: 18, maxValue: Infinity, unit: Unit.Age, selected: false}
    ]
  },
  { title: 'Piece Count',
    type: 'range',
    items: [
      {minValue: 1, maxValue: 99, unit: Unit.Pieces, selected: false},
      {minValue: 100, maxValue: 249, unit: Unit.Pieces, selected: false},
      {minValue: 250, maxValue: 499, unit: Unit.Pieces, selected: false},
      {minValue: 500, maxValue: 999, unit: Unit.Pieces, selected: false},
      {minValue: 1000, maxValue: Infinity, unit: Unit.Pieces, selected: false}
    ]
  }
];
