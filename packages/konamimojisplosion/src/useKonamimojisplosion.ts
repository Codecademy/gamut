import { emojisplosions, EmojisplosionsHandler } from 'emojisplosion';
import KonamiCode from 'konami-code-js';
import { useEffect, useRef } from 'react';

export const useKonamimojisplosion = (onActivate?: () => void) => {
  const explosions = useRef<EmojisplosionsHandler | undefined>();

  useEffect(() => {
    const konamiCode = new KonamiCode(() => {
      if (explosions.current) {
        explosions.current.cancel();
        explosions.current = undefined;
      } else {
        explosions.current = emojisplosions();
        onActivate?.();
      }
    });

    return () => {
      explosions.current?.cancel();
      konamiCode.disable();
    };
  }, [onActivate]);
};
