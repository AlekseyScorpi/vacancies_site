import * as React from 'react';
import {RotateLoader } from 'react-spinners';
export interface ILoaderProps {
}

export function Loader (props: ILoaderProps) {
  return (
    <RotateLoader color="#3B82F6" size={30} speedMultiplier={0.5}/>
  );
}
