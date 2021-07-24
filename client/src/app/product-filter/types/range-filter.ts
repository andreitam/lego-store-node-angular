import { Unit } from "./unit";

export interface RangeFilter {
  minValue: number;
  maxValue: number | null;
  unit: Unit;
  selected: boolean;
}
