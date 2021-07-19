import React from 'react';
import {useFitText} from '@flyyer/use-fit-text';
import clsx from 'clsx';

import {Layer} from './layers';
import {STROKE} from './stroke';

interface LayerTitleProps {
  font?: string;
  leading?: number;
  opacity?: number;
  color?: string;
  weight?: number;
  strokeWith?: string;
  strokeColor?: string;
}
export function LayerTitle({
  font,
  leading,
  opacity,
  color,
  weight,
  strokeWith,
  strokeColor,
  children,
  ...props
}: LayerTitleProps & React.ComponentProps<typeof Layer>) {
  const {fontSize, ref, isCalculating} = useFitText(
    {maxFontSize: 1000 /* 1000% */, resolution: 10},
    [children, leading, weight, font]
  );

  // console.log({children, fontSize, font, isCalculating});

  return (
    <Layer
      className="px-6 py-6 story:py-storysafe"
      style={{fontFamily: font, textShadow: STROKE(strokeWith, strokeColor)}}
      {...props}
    >
      <div
        ref={ref}
        className={clsx('w-full h-full', 'flex items-center justify-center', {
          'flyyer-wait': isCalculating
        })}
        style={{
          fontSize,
          lineHeight: leading,
          opacity
        }}
        {...props}
      >
        <h1
          className="text-trueGray-900 text-center text-shadow-white"
          style={{color, fontWeight: weight}}
        >
          {children}
        </h1>
      </div>
    </Layer>
  );
}
