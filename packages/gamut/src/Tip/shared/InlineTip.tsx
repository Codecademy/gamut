import { useCallback, useState } from 'react';

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
  closeOnClick,
  escapeKeyPressHandler,
  id,
  inheritDims,
  info,
  isTipHidden,
  loading,
  narrow,
  overline,
  contentRef,
  truncateLines,
  type,
  username,
  wrapperRef,
  zIndex,
}) => {
  const isHoverType = type === 'tool' || type === 'preview';
  const [isSuppressed, setIsSuppressed] = useState(false);

  const handleClick = useCallback(() => {
    if (closeOnClick) setIsSuppressed(true);
  }, [closeOnClick]);

  const handleUnsuppress = useCallback(() => setIsSuppressed(false), []);

  // Skip synthetic enter/leave fired when a child changes visibility (relatedTarget stays inside the wrapper).
  const handleMouseEnterAndLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const related = e.relatedTarget as Node | null;
      if (related && e.currentTarget.contains(related)) return;
      setIsSuppressed(false);
    },
    []
  );

  const InlineTipWrapper = isHoverType ? ToolTipWrapper : InfoTipWrapper;
  const InlineTipBodyWrapper = isHoverType
    ? ToolTipContainer
    : InfoTipContainer;
  const inlineWrapperProps = isHoverType
    ? { 'data-tooltip-body': '' }
    : { hideTip: isTipHidden };
  const tipWrapperProps = isHoverType
    ? { inheritDims, suppress: isSuppressed }
    : {};
  const tipBodyAlignment = getAlignmentStyles({ alignment, avatar, type });
  const isHorizontalCenter = tipBodyAlignment === 'horizontalCenter';

  const target = (
    <TargetContainer
      height={inheritDims ? 'inherit' : undefined}
      ref={wrapperRef}
      width={inheritDims ? 'inherit' : undefined}
      onBlur={isHoverType ? handleUnsuppress : undefined}
      onClick={isHoverType ? handleClick : undefined}
      onKeyDown={escapeKeyPressHandler}
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
        horizNarrow={narrow && isHorizontalCenter}
        id={id}
        ref={contentRef}
        role={type === 'tool' ? 'tooltip' : undefined}
        tabIndex={type === 'info' ? -1 : undefined}
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
    <InlineTipWrapper
      {...(tipWrapperProps as any)}
      onMouseEnter={isHoverType ? handleMouseEnterAndLeave : undefined}
      onMouseLeave={isHoverType ? handleMouseEnterAndLeave : undefined}
    >
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
