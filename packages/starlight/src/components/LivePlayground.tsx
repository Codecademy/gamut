import {
  CTAButton,
  FillButton,
  IconButton,
  StrokeButton,
  TextButton,
} from '@codecademy/gamut';
import {
  MiniArrowRightIcon,
  MiniStarIcon,
  SearchIcon,
} from '@codecademy/gamut-icons';
import { useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import { GamutCanvas } from './GamutCanvas';

/** Components and helpers available inside the editable code. */
const scope = {
  CTAButton,
  FillButton,
  IconButton,
  MiniArrowRightIcon,
  MiniStarIcon,
  SearchIcon,
  StrokeButton,
  TextButton,
  useState,
};

/**
 * An editable live example: the code below the preview can be modified and
 * the preview re-renders on every keystroke. The code is evaluated as a JSX
 * expression with Gamut's button components in scope.
 * Mount with `client:only="react"` (see GamutCanvas).
 */
export const LivePlayground = ({ code }: { code: string }) => (
  <LiveProvider code={code.trim()} scope={scope}>
    <GamutCanvas>
      <LivePreview />
    </GamutCanvas>
    <LiveEditor
      style={{
        border: '1px solid var(--sl-color-gray-5)',
        borderRadius: '0.5rem',
        fontFamily: 'var(--__sl-font-mono, monospace)',
        fontSize: '0.8125rem',
      }}
    />
    <LiveError
      style={{
        background: 'var(--sl-color-red-low)',
        borderRadius: '0.5rem',
        color: 'var(--sl-color-red-high)',
        fontFamily: 'var(--__sl-font-mono, monospace)',
        fontSize: '0.8125rem',
        marginTop: '0.5rem',
        padding: '0.75rem',
        whiteSpace: 'pre-wrap',
      }}
    />
  </LiveProvider>
);
