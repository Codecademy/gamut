/**
 * Consumer-style type-check: validates that Gamut's emitted .d.ts accept
 * RefObject<T | null> from useRef<T>(null) when consumed with React 18/19.
 * Run: tsc --noEmit -p packages/gamut/consumer-typecheck (after building gamut).
 */
import { useRef } from 'react';

import { Box, Text, TextArea } from '../dist';

export function ConsumerRefs() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <Text as="h1" ref={titleRef}>
        Title
      </Text>
      <Box ref={alertRef}>Alert</Box>
      <TextArea ref={inputRef} />
    </>
  );
}
