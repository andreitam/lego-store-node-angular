
import { Availability } from "src/app/types/availability";
import { BooleanFilterCategory } from "./boolean-filter-category";

export const BOOLEAN_FILTER_TYPES: BooleanFilterCategory[] = [
    { title : 'Availability',
      type: 'boolean',
      items: [
        { label: Availability.Availablenow, selected: false},
        { label: Availability.Coomingsoon, selected: false},
        { label: Availability.Outofstock, selected: false},
        { label: Availability.Uponorder, selected: false},
            ]
    }
];