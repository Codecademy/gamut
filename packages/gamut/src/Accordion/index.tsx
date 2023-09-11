import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Anchor, Box, FlexBox, Rotation, Text } from '..';

type SetStateWithCallbackType<T> = (
  state: SetStateAction<T>,
  callback?: ((state: T) => void) | undefined
) => void;

// This hook is identical to the normal `useState`, but you can have the setter take a
// callback function that will be executed with the updated state each time the setter is called.
export const useStateWithCallback = <T extends {}>(
  initialState: T
): [T, SetStateWithCallbackType<T>] => {
  const [state, setState] = useState<T>(initialState);
  const callbackRef = useRef<(state: T) => void>();

  // Saves the callback before calling setState as normal.
  const setStateWithCallback = useCallback(
    (state: SetStateAction<T>, callback?: (state: T) => void) => {
      callbackRef.current = callback;
      setState(state);
    },
    []
  );

  // As soon as the state gets changed and processed,
  // this will call the callback with the updated state.
  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = undefined;
    }
  }, [state]);

  return [state, setStateWithCallback];
};

export const useToggle = (
  initialState: boolean,
  onToggle?: (state: boolean) => void
): [boolean, () => void] => {
  const [state, setStateWithCallback] = useStateWithCallback<boolean>(
    initialState
  );

  const toggle = useCallback(
    () => setStateWithCallback((prevState) => !prevState, onToggle),
    [setStateWithCallback, onToggle]
  );

  return [state, toggle];
};

const StyledAnchor = styled(Anchor)`
  &:hover,
  &:focus {
    color: ${theme.colors.text};
  }
`;

const ExpandInCollapseOut: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <motion.div
      initial="collapsed"
      exit="collapsed"
      animate="expanded"
      style={{ overflow: 'hidden' }}
      variants={{
        expanded: { height: 'auto' },
        collapsed: { height: 0 },
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export interface AccordionProps {
  /**
   * Aria label for the expand/collapse link
   */
  ariaLabel: string;

  /**
   * React element to render within the expand/collapse link
   */
  renderHeader: ReactElement;

  /**
   * React element to render when accordion is expanded
   */
  renderExpanded: ReactElement;

  /**
   * Optional custom text to display instead of the chevron arrow icon
   */
  customText?: { expanded: string; collapsed: string };

  /**
   * Whether the accordion should start off with the expanded state
   */
  initiallyExpanded?: boolean;

  /**
   * Called when the expand/collapse link is clicked
   *
   * @param isExpanded - New expanded state the accordion will transition to
   */
  onExpandedOrCollapsed?: (isExpanded: boolean) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  customText,
  renderHeader,
  initiallyExpanded,
  ariaLabel,
  renderExpanded,
  onExpandedOrCollapsed,
}) => {
  const [isExpanded, toggleIsExpanded] = useToggle(!!initiallyExpanded);

  return (
    <FlexBox flexDirection="column" width="100%">
      <StyledAnchor
        aria-label={
          customText
            ? isExpanded
              ? `${ariaLabel} ${customText.expanded}`
              : `${ariaLabel} ${customText.collapsed}`
            : ariaLabel
        }
        aria-expanded={isExpanded}
        onClick={() => {
          toggleIsExpanded();
          onExpandedOrCollapsed?.(isExpanded);
        }}
        variant="interface"
        width="100%"
        py={{ _: 16, sm: 32 }}
        px={{ _: 0, sm: 64, lg: 0 }}
        m={4}
      >
        <FlexBox
          flexDirection={{ _: 'column', sm: 'row' }}
          justifyContent="space-between"
          center
        >
          {renderHeader}
          {customText ? (
            <Text minWidth={100} aria-hidden pt={{ _: 24, sm: 0 }}>
              {isExpanded ? customText.expanded : customText.collapsed}
            </Text>
          ) : (
            <Rotation rotated={isExpanded}>
              <ArrowChevronDownIcon color="text-disabled" />
            </Rotation>
          )}
        </FlexBox>
      </StyledAnchor>

      <AnimatePresence>
        {isExpanded && (
          <ExpandInCollapseOut>
            <Box role="region" aria-label={`${ariaLabel} expanded`}>
              {renderExpanded}
            </Box>
          </ExpandInCollapseOut>
        )}
      </AnimatePresence>
    </FlexBox>
  );
};
