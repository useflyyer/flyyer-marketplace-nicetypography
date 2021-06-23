import React, {useMemo} from 'react';
import {Variable as V, Validator, Static} from '@flayyer/variables';
import {TemplateProps} from '@flayyer/flayyer-types';
import {useGoogleFonts} from '@flayyer/use-googlefonts';
import {proxy} from '@flayyer/proxy';
import {useFitText} from '@flayyer/use-fit-text';
import {useSmartcrop} from 'use-smartcrop';
import clsx from 'clsx';

import '../styles/tailwind.css';

import {Layer} from '../components/layers';

enum ObjectFit {
  contain = 'contain',
  cover = 'cover',
  fill = 'fill',
  none = 'none'
}

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  title: V.String({default: 'Hello.', examples: ['Hello.']}),
  description: V.Optional(
    V.String({
      description: 'Background text'
    })
  ),
  font: V.Font({
    default: 'Pacifico',
    examples: ['Pacifico', 'Dela Gothic One', 'Heebo'],
    description: "Main text's font"
  }),
  fontSecondary: V.Font({
    default: 'Roboto',
    examples: ['Montserrat', 'Arvo'],
    description: "Background text's font"
  }),
  titleColor: V.Optional(
    V.ColorHex({default: '#111827', examples: ['#111827', '#F3F4F6']})
  ),
  titleOpacity: V.Optional(V.Number({default: 1, minimum: 0, maximum: 1})),
  titleLeading: V.Optional(V.Number({default: 0.9})),
  titleWeight: V.Optional(
    V.Number({default: 800, minimum: 100, maximum: 900, multipleOf: 100})
  ),
  descriptionColor: V.Optional(
    V.ColorHex({default: '#111827', examples: ['#111827', '#F3F4F6']})
  ),
  descriptionOpacity: V.Optional(
    V.Number({default: 0.1, minimum: 0, maximum: 1})
  ),
  background: V.Optional(
    V.Image({
      title: 'Background image URL'
    })
  ),
  backgroundFit: V.Optional(V.Enum(ObjectFit, {default: ObjectFit.cover})),
  fadeOpacity: V.Optional(V.Number({default: 0, minimum: 0, maximum: 1}))
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function MainTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables} = props;

  const {
    data: {
      background,
      backgroundFit,
      description,
      descriptionColor,
      descriptionOpacity,
      fadeOpacity,
      font,
      fontSecondary,
      title,
      titleColor,
      titleLeading,
      titleOpacity,
      titleWeight
    }
  } = validator.parse(variables);

  const longDescription = useMemo<string | null>(() => {
    if (description) {
      const n = Math.max(400 / description.length, 1);
      const array: string[] = [];
      for (let i = 0; i < n; i++) array.push(description);
      return array.join(' ');
    }

    return null;
  }, [description]);

  const backgroundSrc = background ? proxy(background) : undefined;
  const cropped = useSmartcrop(
    backgroundFit === ObjectFit.cover ? backgroundSrc : undefined,
    {
      width,
      height,
      minScale: 1
    }
  );

  const fonts = [font, fontSecondary].filter(Boolean)!;
  const googleFont = useGoogleFonts(
    fonts.map((f) => ({
      family: f,
      styles: Array.from(new Set([200, 400, 600, 800, titleWeight!]))
    }))
  );

  const {fontSize: titleFontSize, ref: titleRef} = useFitText(
    {
      maxFontSize: 1000 /* 1000% */
    },
    [title, titleLeading, titleWeight, font, googleFont.status]
  );
  const {fontSize: descriptionFontSize, ref: descriptionRef} = useFitText(
    {
      maxFontSize: 1000 /* 1000% */
    },
    [longDescription, fontSecondary, googleFont.status]
  );

  return (
    <Layer
      className={clsx('bg-gray-50', {
        dark: 0,
        'flayyer-ready': googleFont.status && cropped.status
      })}
    >
      <Layer>
        {backgroundSrc && (
          <img
            className="w-full h-full"
            src={
              backgroundFit === ObjectFit.cover ? cropped.src : backgroundSrc
            }
            style={{objectFit: backgroundFit}}
          />
        )}
      </Layer>
      <Layer className="bg-black" style={{opacity: fadeOpacity}} />
      <Layer
        className="px-6 py-6 story:py-storysafe"
        style={{fontFamily: fontSecondary}}
      >
        <div
          ref={descriptionRef}
          className={clsx('w-full h-full', 'flex items-center justify-center')}
          style={{fontSize: descriptionFontSize}}
        >
          <p
            style={{color: descriptionColor, opacity: descriptionOpacity}}
            className={clsx(
              'font-extralight text-justify tracking-widest leading-tight'
            )}
          >
            {longDescription}
          </p>
        </div>
      </Layer>
      <Layer
        className="px-6 py-6 story:py-storysafe"
        style={{fontFamily: font}}
      >
        <div
          ref={titleRef}
          className={clsx('w-full h-full', 'flex items-center justify-center')}
          style={{
            fontSize: titleFontSize,
            lineHeight: titleLeading,
            opacity: titleOpacity
          }}
        >
          <h1
            className="text-trueGray-900 text-center"
            style={{color: titleColor, fontWeight: titleWeight}}
          >
            {title}
          </h1>
        </div>
      </Layer>
    </Layer>
  );
}
