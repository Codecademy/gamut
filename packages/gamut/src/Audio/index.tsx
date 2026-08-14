import { PlayerSrc, TrackProps } from '@vidstack/react';
import { DefaultLayoutTranslations } from '@vidstack/react/types/vidstack';
import { forwardRef } from 'react';

import { useIsMounted } from '../utils';
import { VidstackAudioPlayer } from './lib/VidstackAudioPlayer';

/** Imperative handle: lets a parent seek the player (e.g. click-a-line-to-jump). */
export interface AudioHandle {
  seek: (seconds: number) => void;
}

export type AudioProps = {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onReady?: () => void;
  /**
   * Fires as playback progresses with the current time in seconds. Lets a parent
   * (e.g. a transcript) follow along without owning the media element.
   */
  onTimeUpdate?: (currentTimeSeconds: number) => void;
  /**
   * Width of the player. Defaults to filling its container.
   */
  width?: number;
  /**
   * Height of the player. The audio layout is a compact control bar, so this is
   * rarely needed.
   */
  height?: number;
  audioTitle?: string;
  controls?: boolean;
  /**
   * The main source for the audio file or streaming URL.
   * @example
   * <Audio audioUrl='https://example.com/episode.mp3' />
   * Or with type
   * <Audio audioUrl={{ src: 'https://example.com/episode.mp3', type: 'audio/mpeg' }} />
   */
  audioUrl: PlayerSrc;
  /**
   * Optional text track data (captions, chapters or a transcript).
   * @example
   * <Audio textTracks={[{ label: 'English', src: '/eng.vtt', kind: 'captions', language: 'en-US' }]} />
   *
   * @see https://vidstack.io/docs/player/api/text-tracks/?styling=default-theme#managing-tracks
   */
  textTracks?: TrackProps[];
  /**
   * Translations for the player's default layout labels.
   * @example
   * <Audio translations={{ Play: 'Play Episode' }} />
   */
  translations?: Partial<DefaultLayoutTranslations>;
  /**
   * Determines if the default provider/browser controls are shown.
   * @default false
   */
  showDefaultProviderControls?: boolean;
};

/**
 * Audio player built on Vidstack's `MediaPlayer` + `DefaultAudioLayout`, themed
 * with Gamut tokens and custom icons/controls — the audio sibling of `Video`.
 * Renders client-side only (Vidstack needs the DOM).
 */
export const Audio = forwardRef<AudioHandle, AudioProps>((props, ref) => {
  const isMounted = useIsMounted();

  return <>{isMounted && <VidstackAudioPlayer ref={ref} {...props} />}</>;
});

Audio.displayName = 'Audio';
