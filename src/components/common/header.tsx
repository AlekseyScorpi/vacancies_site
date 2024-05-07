import * as React from 'react';
export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
  return (
    <div className="py-8 bg-blue-500 px-24 flex justify-center">
        <div className="font-semibold text-neutral-100 text-3xl flex items-center justify-center">Генерация текста вакансий</div>
    </div>
  );
}
