// TODO: Extract to stand-alone package similar to @types/ndarray
declare module 'ndarray-scratch' {

    import { NdArray } from 'ndarray';

    export function clone(array:NdArray) : NdArray;
    export function malloc(shape:number[], dtype:string) : NdArray;
    export function free(array:NdArray) : void;
    export function zeros(shape:number[], dtype?:string):NdArray;
    export function ones(shape:number[], dtype?:string):NdArray;
    export function eye(shape:number[], dtype?:string):NdArray;
}