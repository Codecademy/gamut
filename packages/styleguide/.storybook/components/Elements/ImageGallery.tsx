import { Box, Text, Input, FlexBox, GridBox, Toggle } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import { IllustrationProps } from '@codecademy/gamut-illustrations';
import { PatternProps } from '@codecademy/gamut-patterns';
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
  images?: ImageItem[];
  showControls?: boolean;
  controls?: Controls;
}

const StyledText = styled(Text)`
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = [],
  showControls = true,
  controls = {},
}) => {
  const {
    columns: defaultColumns = 4,
    minColumns = 2,
    maxColumns = 4,
    imageSize: defaultImageSize = 20,
    minImageSize = 8,
    maxImageSize = 100,
  } = controls;

  const [columns, setColumns] = useState(defaultColumns);
  const [imageSize, setImageSize] = useState(defaultImageSize);
  const [imageSizeInput, setImageSizeInput] = useState(
    defaultImageSize.toString()
  );
  const [filter, setFilter] = useState('');
  const [alignment, setAlignment] = useState<'center' | 'left'>('center');

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
    setImageSizeInput(inputValue); // Always update the input display

    const value = parseInt(inputValue, 10);

    // Only update the actual imageSize if it's a valid number within range
    if (!isNaN(value) && value >= minImageSize && value <= maxImageSize) {
      setImageSize(value);
    }
  };

  const handleImageSizeBlur = () => {
    const value = parseInt(imageSizeInput, 10);

    // If the input is invalid or out of range, reset it to the current valid imageSize
    if (isNaN(value) || value < minImageSize || value > maxImageSize) {
      setImageSizeInput(imageSize.toString());
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredImages = images.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box width="100%">
      <FlexBox alignItems="center" gap={12} mb={12} p={16} pb={0}>
        <Text fontSize={14} fontWeight="bold">
          Alignment:
        </Text>
        <Toggle
          as="button"
          checked={alignment === 'center'}
          onClick={() =>
            setAlignment(alignment === 'center' ? 'left' : 'center')
          }
          label={alignment === 'center' ? 'Center' : 'Left'}
        />
      </FlexBox>
      {showControls && (
        <FlexBox alignItems="center" gap={12} mb={16} p={16} pb={0}>
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
            width={80}
          />
          <Text fontSize={14} fontWeight="bold" ml={16}>
            Image Size:
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
            width={80}
          />
          <Box flex={1} />
          <Text fontSize={14} fontWeight="bold">
            Filter:
          </Text>
          <Input
            type="text"
            placeholder="Search images..."
            value={filter}
            onChange={handleFilterChange}
            size="small"
            width={200}
          />
        </FlexBox>
      )}
      <MotionGridBox
        rowGap={8}
        gridTemplateColumns={`repeat(${columns}, 1fr)`}
        layout
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {filteredImages.length === 0 ? (
          <MotionBox
            gridColumn="1 / -1"
            textAlign="center"
            py={32}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Text fontSize={16} color="text-secondary">
              No images found...
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
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                p={4}
                alignItems={alignment === 'center' ? 'center' : 'flex-start'}
                gap={8}
                flexDirection="column"
              >
                <MotionBox
                  layout
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  display="flex"
                  border={1}
                  borderRadius="md"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                  width={imageSize + 20}
                  height={imageSize + 20}
                >
                  <Image size={imageSize} />
                </MotionBox>
                <StyledText
                  fontSize={14}
                  textAlign={alignment === 'center' ? 'center' : 'left'}
                  width={alignment === 'center' ? '100%' : 'auto'}
                >
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
