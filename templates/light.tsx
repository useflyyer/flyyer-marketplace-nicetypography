import React, {useMemo} from 'react';
import {Variable as V, Validator, Static} from '@flyyer/variables';
import {TemplateProps} from '@flyyer/types';
import {useGoogleFonts} from '@flyyer/use-googlefonts';
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
  twColors.coolGray[900],
  twColors.red[600],
  twColors.orange[600],
  twColors.amber[500],
  twColors.yellow[400],
  twColors.lime[500],
  twColors.green[700],
  twColors.emerald[600],
  twColors.teal[600],
  twColors.cyan[600],
  twColors.blue[700],
  twColors.indigo[600],
  twColors.violet[600],
  twColors.pink[600]
];

/**
 * Export to enable variables UI on Flyyer.io
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
    examples: ['Pacifico', 'Lobster', 'Dela Gothic One', 'Bitter'],
    description: "Main text's font"
  }),
  fontSecondary: V.Optional(
    V.Font({
      default: 'Roboto',
      examples: ['Montserrat', 'Arvo'],
      description: "Background text's font"
    })
  ),
  titleColor: V.ColorHex({default: colors[0], examples: colors}),
  titleLeading: V.Optional(V.Number({default: 0.95})),
  titleWeight: V.Optional(
    V.Number({default: 800, minimum: 100, maximum: 900, multipleOf: 100})
  )
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function LightTemplate(props: TemplateProps<Variables>) {
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

  const fonts = [font, fontSecondary].filter<string>(Boolean as any)
  const googleFont = useGoogleFonts(
    fonts.map((f) => ({
      family: f,
      styles: Array.from(new Set([200, 400, 600, 800, titleWeight!]))
    }))
  );

  return (
    <Layer
      className={clsx('bg-gray-50', {
        dark: 0,
        'flyyer-ready': googleFont.status
      })}
    >
      <LayerDescription
        font={fontSecondary}
        opacity={1}
        color="#F3F4F6"
        dependencies={[googleFont.status]}
      >
        {longDescription}
      </LayerDescription>
      <LayerTitle
        leading={titleLeading}
        font={font}
        color={titleColor}
        weight={titleWeight}
        strokeColor="white"
        strokeWith="10px"
        dependencies={[googleFont.status]}
      >
        {title}
      </LayerTitle>
    </Layer>
  );
}
