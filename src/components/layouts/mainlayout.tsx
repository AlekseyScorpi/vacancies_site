import * as React from 'react';
import { Header } from '../common/header';

export interface IMainLayoutProps {
    children: React.ReactNode
}

export function MainLayout (props: IMainLayoutProps) {
  return (
    <div className='bg-white'>
        <Header/>
        <div>
            {props.children}
        </div>
    </div>
  );
}
