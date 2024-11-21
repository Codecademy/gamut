// eslint-disable-next-line gamut/no-css-standalone, import/no-webpack-loader-syntax
import '!style-loader!css-loader!video.js/dist/video-js.css';

import { css, Global } from '@emotion/react';

const videojsStyle = css`
  // CUSTOM PERCIPIO STYLES

  .video-js .vjs-control-bar {
    height: 3.5em;
  }

  .video-js {
	 line-height: 0;
	/* overrides to big play button */
	/* control bar UI overrides */
	/* time-tooltip overrides */
	/* overrides if screen size <=420 */
	/* overrides if screen size is between 421 and 768 */
	/* remove font-size and padding if screen size <=768 */
	/* progress control overrides */
	/* time control overrides */
	/* do not display remaining time, playback-rate(speed) on control bar */
	/* time tooltip override */
	/* play progress increase font size and remove additional time tooltip */
	/* spacer overrides */
	/* volume control overrides */
	/* do not show volume vertical bar on hover on video */
}
 .video-js .vjs-tech {
	 position: absolute;
	 width: 100%;
	 height: 100%;
	 overflow: hidden;
	 cursor: pointer;
}
 .video-js.vjs-compact {
	 height: 56vh !important;
	 overflow: hidden;
}
 .video-js.vjs-compact-audio {
	 height: 100% !important;
	 padding-top: 56.25% !important;
}
 .video-js .vjs-big-play-button {
	 background: none !important;
	 background-color: none;
	 border: none !important;
	 border-radius: unset !important;
	 cursor: pointer;
	 display: block;
	 font-size: 11em;
	 height: 1em;
	 left: 50%;
	 line-height: 1em;
	 margin-left: -0.5em;
	 margin-top: -0.6em;
	 transition: all 0.4s;
	 padding: 0;
	 position: absolute;
	 top: 50%;
	 width: 1em;
	 opacity: 0.1;
}
 .video-js .vjs-big-play-button:hover, .video-js .vjs-big-play-button:focus {
	 opacity: 1 !important;
}
 .video-js .vjs-control-bar {
	 justify-content: center;
	 color: white;
	 background-color: black !important;
	 transition: visibility 0.1s, opacity 0.1s !important;
	 transition-delay: 0s !important;
}
 .video-js .vjs-progress-control:hover .vjs-time-tooltip, .video-js .vjs-progress-control:hover .vjs-progress-holder:focus .vjs-time-tooltip {
	 visibility: hidden;
}
 .video-js .vjs-mouse-display .vjs-time-tooltip {
	 visibility: visible !important;
}
 @media only screen and (max-width: 420px) {
	 .video-js .vjs-seek-button {
		 display: none !important;
		 visibility: hidden !important;
	}
	 .video-js .vjs-current-time, .video-js .vjs-time-divider, .video-js .vjs-duration {
		 display: none !important;
	}
	 .video-js .vjs-remaining-time {
		 visibility: visible !important;
		 display: block !important;
		 margin-left: -0.3em;
	}
	 .video-js #nextUpToast {
		 bottom: 70px;
		 right: 10px;
	}
}
 @media (min-width: 421px) and (max-width: 768px) {
	 .video-js .vjs-current-time, .video-js .vjs-time-divider, .video-js .vjs-duration {
		 display: block !important;
	}
}
 @media only screen and (max-width: 768px) {
	 .video-js.vjs-compact {
		 overflow: inherit !important;
	}
	 .video-js .vjs-control-bar {
		 padding: 0 !important;
		 font-size: unset !important;
	}
	 .video-js .vjs-text-track-display {
		 bottom: 6.5em;
	}
	 .video-js .vjs-time-control {
		 font-size: 1.2em !important;
		 line-height: 2.5em !important;
	}
	 .video-js .vjs-play-control .vjs-icon-placeholder {
		 margin-left: -0.5em;
	}
	 .video-js .vjs-big-play-button {
		 font-size: 7em;
	}
}
 .video-js .vjs-progress-control {
	 position: absolute;
	 right: 0;
	 left: 0;
	 width: 100%;
	 height: var(--space30);
	 padding: 0 var(--space12);
	 display: flex !important;
}
 .video-js .vjs-progress-control .vjs-progress-holder {
	 padding-left: 0;
}
 .video-js .vjs-remaining-time, .video-js .vjs-playback-rate {
	 visibility: hidden;
	 display: none;
}
 .video-js .vjs-time-control {
	 display: flex;
	 flex: 0 1 auto;
	 padding: 0.25rem !important;
	 min-width: 0 !important;
	 cursor: default;
	 line-height: 2.5em;
}
 .video-js .vjs-time-tooltip {
	 color: #222325;
	 background-color: white !important;
	 border-radius: 0.3em !important;
	 top: -2em;
	 padding: 8px;
	 font-size: 0.5em;
}
 .video-js .vjs-time-tooltip::after {
	 position: absolute;
	 top: 100%;
	 left: 50%;
	 margin-left: -6px;
	 content: '';
	 border-color: white transparent transparent transparent;
	 border-style: solid;
	 border-width: 5px;
}
 .video-js .vjs-play-progress::before {
	 font-size: 1em;
	 top: unset;
}
 .video-js .vjs-spacer {
	 display: flex;
	 flex: 1 1 auto;
	 align-self: stretch;
}
 .video-js .vjs-volume-panel {
	 cursor: pointer;
	 position: unset;
}
 .video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
	 bottom: 9em;
	 height: 10em;
	 width: 3.5em;
	 right: 3.5em;
	 display: flex;
}
 .video-js .vjs-volume-panel .vjs-volume-control .vjs-slider-vertical {
	 width: 0.4em;
	 height: 7em;
}
 .video-js .vjs-volume-panel .vjs-volume-control .vjs-slider-vertical .vjs-volume-level {
	 width: 0.4em;
}
 .video-js .vjs-volume-panel .vjs-volume-control .vjs-slider-vertical .vjs-volume-level::before {
	 font-size: 1em !important;
}
 .video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical {
	 left: -3000em;
}
/* show big play button on pause*/
 .vjs-paused {
	/* Added opaque effect on pause*/
}
 .vjs-paused .vjs-big-play-button {
	 display: block;
}
 .vjs-paused .vjs-tech {
	 opacity: 0.6;
}
/* hide big play button on play */
 .vjs-playing .vjs-big-play-button {
	 display: none;
}
/* space between control bar and the icons */
 .vjs-control-bar .vjs-button, .vjs-control-bar .vjs-time-control, .vjs-control-bar .vjs-spacer {
	 height: 38px !important;
}
 .ccMenuOpen {
	 opacity: 1 !important;
}
/* hover/focus effect for control buttons */
 .vjs-control-bar .vjs-button:hover, .vjs-control-bar .vjs-button:focus {
	 color: white !important;
	 opacity: 1 !important;
}
 .video-js.vjs-user-inactive.vjs-playing #nextUpToast, .vjs-control-bar .vjs-button:hover #nextUpToast, .vjs-control-bar .vjs-button:focus #nextUpToast {
	 bottom: 10px;
}
/* captions hiding under control bar - fix */
 .vjs-text-track-display {
	 bottom: 5.7em;
}
 .video-js.vjs-user-inactive.vjs-playing .vjs-text-track-display {
	 bottom: 0 !important;
}
 .video-js.vjs-user-inactive.vjs-playing .vjs-tech {
	 cursor: none;
}
 .vjs-text-track-cue {
	 inset: auto 0px 0px !important;
}
 .vjs-text-track-cue > div {
	 background-color: rgba(0, 0, 0, 0.5) !important;
}
/* icon overrides */
 .vjs-button {
	 opacity: 0.8;
}
 .vjs-button .vjs-icon-placeholder::before {
	 position: relative !important;
	 font-family: 'Videojs';
	 font-style: normal;
	 font-weight: normal;
	 cursor: pointer;
	 background-repeat: no-repeat;
	 line-height: 0.7em;
	 background-position: 55% calc(50% - 0px);
	 border: none !important;
	 transform: none !important;
}
/* increase icon size for volume icon*/
/* increase icon size for fullscreen icon */
/* overrides for full screen */
 .vjs-fullscreen {
	/* increase icon size for volume icon on full screen */
	/* increase icon size for fullscreen icon on full screen */
	/* default captions size for responsive full screen */
	/* full screen overrides for screen size<768 */
}
 .vjs-fullscreen .vjs-progress-holder {
	 height: 0.4em;
}
 .vjs-fullscreen .vjs-time-control {
	 line-height: 2em;
}
 .vjs-fullscreen .vjs-time-tooltip {
	 font-size: 0.4em !important;
	 top: -2em !important;
}
 .vjs-fullscreen #nextUpToast {
	 bottom: 75px !important;
}
 @media only screen and (max-width: 420px) {
	 .vjs-fullscreen .vjs-text-track-cue {
		 font-size: initial !important;
	}
}
 @media only screen and (max-width: 768px) {
	 .vjs-fullscreen .vjs-text-track-display {
		 bottom: 6.5em !important;
	}
}
 .vjs-fullscreen .vjs-time-control {
	 line-height: 1.8em;
}
/* seek button overrides */
 .vjs-seek-button.skip-back.skip-10 .vjs-icon-placeholder::before {
	 content: '' !important;
	 background-image: url('./resources/percipioPlayerIcons/backward.svg') !important;
}
/* next-up-play-button overrides */
 .vjs-next-up-play-button {
	 cursor: pointer;
}
 .vjs-next-up-play-button .vjs-icon-placeholder::before {
	 content: '' !important;
	 background-image: url('./resources/percipioPlayerIcons/next.svg') !important;
}
/* closed captions overrides */
 .vjs-subs-caps-button {
	 width: 50px !important;
}
 .vjs-subs-caps-button .vjs-icon-placeholder::before {
	 content: '' !important;
	 background-image: url('./resources/percipioPlayerIcons/cc.svg') !important;
}
/* audio description overrides */
 .vjs-audio.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
	 opacity: 0 !important;
}
 .vjs-audio-description-play-enable-button {
	 cursor: pointer;
}
 .vjs-audio-description-play-enable-button.adON .vjs-icon-placeholder::before {
	 content: '' !important;
	 background-image: url('./resources/percipioPlayerIcons/adFilled.svg') !important;
}
 .vjs-audio-description-play-enable-button.adOFF .vjs-icon-placeholder::before {
	 content: '' !important;
	 background-image: url('./resources/percipioPlayerIcons/ad.svg') !important;
}
/* display poster with replay icon on ended */
 .vjs-ended .vjs-poster {
	 display: inline-block !important;
}
 
`;
export const Videojs = () => <Global styles={videojsStyle} />;
