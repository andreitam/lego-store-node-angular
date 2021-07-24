import { Unit } from "./unit";

export interface RangeFilter {
  minValue: number;
  maxValue: number;
  unit: Unit;
  selected: boolean;
}
