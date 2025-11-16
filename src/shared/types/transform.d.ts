export interface ITransform {
  transformations?: {
    resize?: {
      width?: number;
      height?: number;
    };
    crop?: {
      width?: number;
      height?: number;
      x?: number;
      y?: number;
    };
    rotate?: number;
    format?: string;
    filter?: {
      grayscale?: boolean;
      sepia?: boolean;
    };
  };
}
