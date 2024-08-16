import { InfoTipContainer } from '../InfoTip/styles';
import { PreviewTipContents, PreviewTipShadow } from '../PreviewTip/elements';
import { ToolTipContainer } from '../ToolTip/elements';
import {
  InfoTipWrapper,
  TargetContainer,
  TipBody,
  ToolTipWrapper,
} from './elements';
import { narrowWidth } from './styles';
import { TipWrapperProps } from './types';
import { getInlineAlignment } from './utils';

export const InlineTip: React.FC<TipWrapperProps> = ({
  alignment,
  avatar,
  username,
  overline,
  children,
  escapeKeyPressHandler,
  id,
  info,
  isTipHidden,
  type,
  narrow,
  wrapperRef,
  zIndex,
}) => {
  const isToolType = type === 'tool' || type === 'preview';
  const isPreviewType = type === 'preview';

  const InlineTipWrapper = isToolType ? ToolTipWrapper : InfoTipWrapper;
  const InlineTipBodyWrapper = isToolType ? ToolTipContainer : InfoTipContainer;
  const InlineWrapperProps = isToolType ? {} : { hideTip: isTipHidden };
  const tipBodyAlignment = getInlineAlignment({ alignment, avatar, type });

  const target = (
    <TargetContainer
      ref={wrapperRef}
      onKeyDown={
        escapeKeyPressHandler ? (e) => escapeKeyPressHandler(e) : undefined
      }
    >
      {children}
    </TargetContainer>
  );

  const tipBody = (
    <InlineTipBodyWrapper
      alignment={alignment}
      zIndex={zIndex ?? 1}
      {...InlineWrapperProps}
    >
      <TipBody
        alignment={tipBodyAlignment}
        color="currentColor"
        id={id}
        width={narrow ? narrowWidth : undefined}
        zIndex="auto"
        aria-hidden={isToolType}
      >
        {isPreviewType ? (
          <>
            <PreviewTipContents
              avatar={avatar}
              info={info}
              username={username}
              overline={overline}
            />
            <PreviewTipShadow
              aria-hidden
              alignment={alignment}
              zIndex={zIndex}
            />
          </>
        ) : (
          info
        )}
      </TipBody>
    </InlineTipBodyWrapper>
  );

  return (
    <InlineTipWrapper>
      {alignment.includes('top') ? (
        <>
          {tipBody}
          {target}
        </>
      ) : (
        <>
          {target}
          {tipBody}
        </>
      )}
    </InlineTipWrapper>
  );
};
