import * as ndarray from 'ndarray';

// TODO: Extract to stand-alone package similar to @types/ndarray

export function clone(array:ndarray) : ndarray;
export function malloc(shape:number[], dtype:string) : ndarray;
export function free(array:ndarray) : void;
export function zeros(shape:number[], dtype?:string):ndarray;
export function ones(shape:number[], dtype?:string):ndarray;
export function eye(shape:number[], dtype?:string):ndarray;