import { css } from '@codecademy/gamut-styles';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const slide = keyframes({
  from: { left: -6000, right: 6000 },
  to: { left: 6000, right: -6000 },
});

const Shimmer = styled.div<{ duration: number }>(({ duration }) =>
  css({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'clip',
    borderRadius: 'md',
    '::before': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      content: '',
      animation: `${slide} 6s linear ${duration}ms infinite`,
      // background: linear-gradient(
      //   to right,
      //   transparent 0%,
      //   var(--color-white-300) 50%,
      //   transparent 100%
      // );
    },
  })
);

export interface FeatureShimmerProps {
  animationDuration: number;
  animationDelay: number;
}

export const FeatureShimmer: React.FC<FeatureShimmerProps> = ({
  animationDuration,
  animationDelay,
}) => {
  return <Shimmer duration={animationDuration} />;
};
