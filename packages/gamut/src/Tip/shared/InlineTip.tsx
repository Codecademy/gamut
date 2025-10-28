import { InfoTipContainer } from '../InfoTip/styles';
import { PreviewTipContents, PreviewTipShadow } from '../PreviewTip/elements';
import { ToolTipContainer } from '../ToolTip/elements';
import {
  InfoTipWrapper,
  TargetContainer,
  TipBody,
  ToolTipWrapper,
} from './elements';
import { getAlignmentStyles } from './styles/composeVariantsUtils';
import { narrowWidth } from './styles/styles';
import { TipWrapperProps } from './types';

export const InlineTip: React.FC<TipWrapperProps> = ({
  alignment,
  avatar,
  children,
  escapeKeyPressHandler,
  id,
  inheritDims,
  info,
  isTipHidden,
  loading,
  narrow,
  overline,
  truncateLines,
  type,
  username,
  wrapperRef,
  zIndex,
}) => {
  const isHoverType = type === 'tool' || type === 'preview';

  const InlineTipWrapper = isHoverType ? ToolTipWrapper : InfoTipWrapper;
  const InlineTipBodyWrapper = isHoverType
    ? ToolTipContainer
    : InfoTipContainer;
  const inlineWrapperProps = isHoverType ? {} : { hideTip: isTipHidden };
  const tipWrapperProps = isHoverType ? ({ inheritDims } as const) : {};
  const tipBodyAlignment = getAlignmentStyles({ alignment, avatar, type });
  const isHorizontalCenter = tipBodyAlignment === 'horizontalCenter';

  const target = (
    <TargetContainer
      height={inheritDims ? 'inherit' : undefined}
      ref={wrapperRef}
      width={inheritDims ? 'inherit' : undefined}
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
      {...inlineWrapperProps}
    >
      <TipBody
        alignment={tipBodyAlignment}
        aria-hidden={isHoverType}
        color="currentColor"
        id={id}
        maxWidth={narrow && isHorizontalCenter ? '64px' : undefined}
        role={type === 'tool' ? 'tooltip' : undefined}
        width={narrow && !isHorizontalCenter ? narrowWidth : 'max-content'}
        zIndex="auto"
      >
        {type === 'preview' ? (
          <>
            <PreviewTipContents
              avatar={avatar}
              info={info}
              loading={loading}
              overline={overline}
              truncateLines={truncateLines}
              username={username}
            />
            <PreviewTipShadow alignment={alignment} zIndex={zIndex} />
          </>
        ) : (
          info
        )}
      </TipBody>
    </InlineTipBodyWrapper>
  );

  return (
    <InlineTipWrapper {...tipWrapperProps}>
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
