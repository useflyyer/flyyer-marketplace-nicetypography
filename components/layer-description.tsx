import React, {DependencyList} from 'react';
import {useFitText} from '@flayyer/use-fit-text';
import clsx from 'clsx';
import {Layer} from './layers';

interface LayerDescriptionProps {
  font?: string;
  opacity?: number;
  color?: string;
  dependencies?: DependencyList;
}
export function LayerDescription({
  font,
  color,
  opacity,
  children,
  dependencies,
  ...props
}: LayerDescriptionProps & React.ComponentProps<typeof Layer>) {
  const {fontSize: descriptionFontSize, ref: descriptionRef} = useFitText(
    {
      maxFontSize: 1000 /* 1000% */
    },
    [children, font, ...(dependencies || [])]
  );

  return (
    <Layer
      className="px-6 py-6 story:py-storysafe"
      style={{fontFamily: font}}
      {...props}
    >
      <div
        ref={descriptionRef}
        className={clsx('w-full h-full', 'flex items-center justify-center')}
        style={{fontSize: descriptionFontSize}}
      >
        <p
          style={{color, opacity}}
          className={clsx(
            'font-extralight text-justify tracking-widest leading-tight'
          )}
        >
          {children}
        </p>
      </div>
    </Layer>
  );
}
