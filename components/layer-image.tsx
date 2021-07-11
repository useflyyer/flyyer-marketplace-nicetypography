import React from 'react';
import {proxy} from '@flyyer/proxy';
import {useSmartcrop} from 'use-smartcrop';

import {ObjectFit} from './fit';
import {Layer} from './layers';

export function LayerImage({
  src,
  fit,
  width,
  height,
  ...props
}: {fit?: ObjectFit} & React.ComponentProps<'img'>) {
  const backgroundSrc = src ? proxy(src) : undefined;
  const cropped = useSmartcrop(
    fit === ObjectFit.cover ? backgroundSrc : undefined,
    {
      width: Number(width),
      height: Number(height),
      minScale: 1
    }
  );

  return (
    <Layer {...props}>
      {src && (
        <img
          className="w-full h-full"
          src={fit === ObjectFit.cover ? cropped.src : backgroundSrc}
          style={{objectFit: fit}}
        />
      )}
    </Layer>
  );
}
