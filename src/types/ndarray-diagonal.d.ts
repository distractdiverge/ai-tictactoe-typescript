declare module 'ndarray-diagonal' {
  import { NdArray } from 'ndarray';
  
  function diagonal(array: NdArray): NdArray;
  export = diagonal;
}
