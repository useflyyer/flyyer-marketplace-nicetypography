import React from 'react';
import {useFitText} from '@flyyer/use-fit-text';
import clsx from 'clsx';
import {Layer} from './layers';

interface LayerDescriptionProps {
  font?: string;
  opacity?: number;
  color?: string;
}
export function LayerDescription({
  font,
  color,
  opacity,
  children,
  ...props
}: LayerDescriptionProps & React.ComponentProps<typeof Layer>) {
  const {fontSize, ref, isCalculating} = useFitText(
    {maxFontSize: 1000 /* 1000% */, resolution: 10},
    [children, font]
  );

  // Console.log({children, fontSize, font, isCalculating});

  return (
    <Layer
      className="px-6 py-6 story:py-storysafe"
      style={{fontFamily: font}}
      {...props}
    >
      <div
        ref={ref}
        className={clsx('w-full h-full', 'flex items-center justify-center', {
          'flyyer-wait': isCalculating
        })}
        style={{fontSize}}
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
