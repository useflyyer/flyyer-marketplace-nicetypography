import React, {DependencyList} from 'react';
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
  dependencies?: DependencyList;
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
  dependencies,
  ...props
}: LayerTitleProps & React.ComponentProps<typeof Layer>) {
  const {fontSize: titleFontSize, ref: titleRef} = useFitText(
    {
      maxFontSize: 1000 /* 1000% */
    },
    [children, leading, weight, font, ...(dependencies || [])]
  );

  return (
    <Layer
      className="px-6 py-6 story:py-storysafe"
      style={{fontFamily: font, textShadow: STROKE(strokeWith, strokeColor)}}
      {...props}
    >
      <div
        ref={titleRef}
        className={clsx('w-full h-full', 'flex items-center justify-center')}
        style={{
          fontSize: titleFontSize,
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
