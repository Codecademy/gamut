import { emojisplosions } from 'emojisplosion';
import KonamiCode from 'konami-code-js';
import { useEffect, useRef } from 'react';
export var useKonamimojisplosion = function useKonamimojisplosion(onActivate) {
  var explosions = useRef();
  useEffect(function () {
    var konamiCode = new KonamiCode(function () {
      if (explosions.current) {
        explosions.current.cancel();
        explosions.current = undefined;
      } else {
        explosions.current = emojisplosions();
        onActivate === null || onActivate === void 0 ? void 0 : onActivate();
      }
    });
    return function () {
      var _explosions$current;

      (_explosions$current = explosions.current) === null || _explosions$current === void 0 ? void 0 : _explosions$current.cancel();
      konamiCode.disable();
    };
  }, [onActivate]);
};