import {
  ColorMode,
  coreTheme,
  createEmotionCache,
  GamutProvider,
} from '@codecademy/gamut-styles';

const DemoWrapper: React.FC = ({ children }) => {
  return (
    <GamutProvider
      cache={createEmotionCache({ speedy: false })}
      theme={coreTheme}
    >
      <ColorMode mode="light">{children}</ColorMode>
    </GamutProvider>
  );
};

export default DemoWrapper;
