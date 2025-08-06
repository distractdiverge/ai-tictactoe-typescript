declare module 'ndarray-show' {
  import { NdArray } from 'ndarray';
  
  function show(array: NdArray): string;
  export = show;
}
