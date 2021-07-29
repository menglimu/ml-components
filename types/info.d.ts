import { CreateElement, VNode } from "vue/types/umd";

interface InfoProps<D = AnyObj> {
  title?: string;
  width?: string;
  columns: InfoColumn<D>[];
  data: D;
}

interface InfoColumn<D = AnyObj> {
  /** label名 */
  label?: string;
  /** 数据key名 */
  prop?: string;

  /** 数据项的总宽度 */
  width?: string;
  /** 数据项的类名 */
  className?: string;
  /** 格式处理函数 */
  formatter?: (value: string, data: D) => string | VNode | Element;
  /** 自定义显示 */
  render?: (h: CreateElement, item: InfoColumn<D>) => VNode | Element;
}
