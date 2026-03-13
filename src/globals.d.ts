interface YmFunction {
  (id: number, action: string, options?: Record<string, unknown>): void;
  a?: unknown[][];
  l?: number;
}

interface Window {
  ym?: YmFunction;
}
