import Vue, { DirectiveOptions } from "vue";
import { MlForm } from "./form";
import { MlTable } from "./table";

interface MlComponents {
  install: (vue: typeof Vue, options: AnyObj) => void;
  MlForm: MlForm;
  MlTable: MlTable;
  // MlEcharts,
  // MlEchartsLineArea,
  // MlEchartsPieRate,
  // MlCascader
}

export default mlComponents;
export const mlComponents: MlComponents;
export const globalTooltip: DirectiveOptions;
export const clickPreventRe: DirectiveOptions;
export const clickOutside: DirectiveOptions;
export const clickSubmit: DirectiveOptions;
