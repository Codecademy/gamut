import { Box, Text, Input, FlexBox, GridBox } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import { IllustrationProps } from '@codecademy/gamut-illustrations';
import { PatternProps } from '@codecademy/gamut-patterns';
import { css, timingValues } from '@codecademy/gamut-styles';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';

const MotionGridBox = motion.create(GridBox);
const MotionFlexBox = motion.create(FlexBox);
const MotionBox = motion.create(Box);

type SupportedComponentProps =
  | GamutIconProps
  | IllustrationProps
  | PatternProps;

interface ImageItem {
  name: string;
  image: React.ComponentType<SupportedComponentProps>;
}

interface Controls {
  columns?: number;
  minColumns?: number;
  maxColumns?: number;
  imageSize?: number;
  minImageSize?: number;
  maxImageSize?: number;
}

interface ImageGalleryProps {
  images: Record<string, React.ComponentType<SupportedComponentProps>>;
  showControls?: boolean;
  controls?: Controls;
  imageType?: 'icon' | 'illustration' | 'pattern';
}

const StyledText = styled(Text)(
  css({
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  })
);

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = [],
  showControls = true,
  controls = {},
  imageType = 'icon',
}) => {
  const {
    columns: defaultColumns = 5,
    minColumns = 2,
    maxColumns = 5,
    imageSize: defaultImageSize = 20,
    minImageSize = 8,
    maxImageSize = 100,
  } = controls;

  const processedImages: ImageItem[] = Object.entries(images).map(
    ([name, image]) => ({ name, image })
  );

  const [columns, setColumns] = useState(defaultColumns);
  const [imageSize, setImageSize] = useState(defaultImageSize);
  const [imageSizeInput, setImageSizeInput] = useState(
    defaultImageSize.toString()
  );
  const [filter, setFilter] = useState('');

  const handleColumnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= minColumns && value <= maxColumns) {
      setColumns(value);
    }
  };

  const handleImageSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setImageSizeInput(inputValue);

    const value = parseInt(inputValue, 10);

    if (!isNaN(value) && value >= minImageSize && value <= maxImageSize) {
      setImageSize(value);
    }
  };

  const handleImageSizeBlur = () => {
    const value = parseInt(imageSizeInput, 10);

    if (isNaN(value) || value < minImageSize || value > maxImageSize) {
      setImageSizeInput(imageSize.toString());
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredImages = processedImages.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box width="100%">
      {showControls && (
        <FlexBox center gap={12} mb={16} p={16} pb={0}>
          <Text fontSize={14} fontWeight="bold">
            Columns:
          </Text>
          <Input
            type="number"
            min={minColumns}
            max={maxColumns}
            value={columns}
            onChange={handleColumnsChange}
            size="small"
          />
          <Text
            fontSize={14}
            fontWeight="bold"
            ml={16}
            textTransform="capitalize"
          >
            {imageType} size:
          </Text>
          <Input
            type="number"
            min={minImageSize}
            max={maxImageSize}
            step="4"
            value={imageSizeInput}
            onChange={handleImageSizeChange}
            onBlur={handleImageSizeBlur}
            size="small"
          />
          <Box flex={1} />
          <FlexBox center row gap={12}>
            <Text fontSize={14} fontWeight="bold">
              Filter:
            </Text>
            <Input
              type="text"
              placeholder={`Search ${imageType}s...`}
              value={filter}
              onChange={handleFilterChange}
              size="small"
            />
          </FlexBox>
        </FlexBox>
      )}
      <MotionGridBox
        rowGap={8}
        gridTemplateColumns={`repeat(${columns}, 1fr)`}
        layout
        transition={{ duration: timingValues.slow / 1000, ease: 'easeInOut' }}
      >
        {filteredImages.length === 0 ? (
          <MotionBox
            gridColumn="1 / -1"
            textAlign="center"
            py={32}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: timingValues.slow / 1000,
              ease: 'easeInOut',
            }}
          >
            <Text fontSize={16} color="text-secondary">
              No {imageType} found...
            </Text>
          </MotionBox>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredImages.map(({ name, image: Image }) => (
              <MotionFlexBox
                key={name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: timingValues.fast / 1000,
                  ease: 'easeInOut',
                }}
                p={4}
                alignItems="flex-start"
                gap={8}
                flexDirection="column"
              >
                <MotionBox
                  layout
                  transition={{
                    duration: timingValues.fast / 1000,
                    ease: 'easeInOut',
                  }}
                  display="flex"
                  border={1}
                  borderRadius="md"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                  width={imageSize + 20}
                  height={imageSize + 20}
                >
                  <Image width={imageSize} height={imageSize} />
                </MotionBox>
                <StyledText fontSize={14} textAlign="left" width="auto">
                  {name}
                </StyledText>
              </MotionFlexBox>
            ))}
          </AnimatePresence>
        )}
      </MotionGridBox>
    </Box>
  );
};
