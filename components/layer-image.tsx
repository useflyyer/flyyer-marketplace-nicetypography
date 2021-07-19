import React from 'react';
import {proxy} from '@flyyer/proxy';
import {useSmartcrop} from 'use-smartcrop';

import clsx from 'clsx';
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
  const [cropped, cropError] = useSmartcrop(
    fit === ObjectFit.cover ? {src: backgroundSrc} : undefined,
    {
      width: Number(width),
      height: Number(height),
      minScale: 1
    }
  );
  if (cropError) {
    console.error(cropError);
  }

  return (
    <Layer {...props}>
      {src && (
        <img
          className={clsx('w-full h-full', {'flyyer-wait': !cropped})}
          // @ts-expect-error Undefined vs null
          src={fit === ObjectFit.cover ? cropped : backgroundSrc}
          style={{objectFit: fit}}
        />
      )}
    </Layer>
  );
}
