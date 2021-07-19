import React, {useMemo} from 'react';
import {Variable as V, Validator, Static} from '@flyyer/variables';
import {TemplateProps} from '@flyyer/types';
import {GoogleFontsStatus, useGoogleFonts} from '@flyyer/use-googlefonts';
import clsx from 'clsx';
import twColors from 'tailwindcss/colors';

import '../styles/tailwind.css';

import {useLongText} from '../hooks/use-long-text';
import {Layer} from '../components/layers';
import {LayerImage} from '../components/layer-image';
import {LayerTitle} from '../components/layer-title';
import {LayerDescription} from '../components/layer-description';
import {ObjectFit} from '../components/fit';

const colors: string[] = [
  twColors.gray[100],
  twColors.pink[400],
  twColors.cyan[400],
  twColors.green[400],
  twColors.yellow[300],
  twColors.blue[500]
];

/**
 * Export to enable variables UI on Flyyer.io
 */
export const schema = V.Object({
  title: V.String({default: 'Bye.', examples: ['Bye.']}),
  description: V.Optional(
    V.String({
      description: 'Background text'
    })
  ),
  font: V.Font({
    default: 'Bebas Neue',
    examples: ['Bebas Neue', 'Bitter', 'Dela Gothic One', 'Heebo'],
    description: "Main text's font"
  }),
  fontSecondary: V.Optional(
    V.Font({
      default: 'Roboto',
      examples: ['Montserrat', 'Arvo'],
      description: "Background text's font"
    })
  ),
  titleColor: V.ColorHex({
    default: colors[0],
    examples: colors
  }),
  titleLeading: V.Optional(V.Number({default: 0.95})),
  titleWeight: V.Optional(
    V.Number({default: 800, minimum: 100, maximum: 900, multipleOf: 100})
  )
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function DarkTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables} = props;

  const {
    data: {
      description,
      font,
      fontSecondary,
      title,
      titleColor,
      titleLeading,
      titleWeight
    }
  } = validator.parse(variables);

  const longDescription = useLongText(description);

  const fonts = [font, fontSecondary].filter<string>(Boolean as any);
  const googleFont = useGoogleFonts(
    fonts.map((f) => ({
      family: f,
      styles: Array.from(new Set([200, 400, 600, 800, titleWeight!]))
    }))
  );

  return (
    <Layer
      className={clsx('bg-trueGray-900' /* #171717 */, {
        dark: 0,
        'flyyer-wait': googleFont.status === GoogleFontsStatus.LOADING
      })}
    >
      {googleFont.status !== GoogleFontsStatus.LOADING && (
        <LayerDescription font={fontSecondary} opacity={1} color="#3F3F46">
          {longDescription}
        </LayerDescription>
      )}
      {googleFont.status !== GoogleFontsStatus.LOADING && (
        <LayerTitle
          leading={titleLeading}
          font={font}
          color={titleColor}
          weight={titleWeight}
          strokeWith="2px"
          strokeColor="#171717"
        >
          {title}
        </LayerTitle>
      )}
    </Layer>
  );
}
