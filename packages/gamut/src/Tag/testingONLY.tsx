import { MiniCheckCircleIcon, MiniChevronDownIcon, MiniChevronUpIcon,MiniKebabMenuIcon, MiniPinIcon, MiniRemoveCircleIcon, MiniStarIcon } from '@codecademy/gamut-icons';

import { Box, FlexBox } from '../Box';
import { Tag } from './index';

// WILL DELETE THIS FILE AFTER REVIEW
const Tester = () => (
  <FlexBox column>
      <FlexBox row>
        <Box mx={4}>
          <Tag variant='readOnly' icon={MiniStarIcon} >Gotcha!</Tag>
        </Box>
        <Box mx={4}>
          <Tag onDismiss={() => null} variant='selection' icon={MiniPinIcon} >Tag!</Tag>
        </Box>
        <Box mx={4}>
          <Tag variant='navigation' href="" icon={MiniCheckCircleIcon} >You&apos;re it!</Tag>
        </Box>
        <Box mx={4}>
          <Tag onClick={() => null} variant='suggestion' icon={MiniRemoveCircleIcon}>No tagbacks!</Tag>
        </Box>
      </FlexBox>
      <FlexBox row mt={12}>
        <Box mx={4}>
          <Tag size="large" variant='readOnly' icon={MiniChevronDownIcon}>Duck,</Tag>
        </Box>
        <Box mx={4}>
          <Tag onDismiss={() => null} size="large" variant='selection' icon={MiniChevronDownIcon}>Duck,</Tag>
        </Box>
        <Box mx={4}>
          <Tag size="large" variant='navigation' href="" icon={MiniKebabMenuIcon}>Duck...</Tag>
        </Box>
        <Box mx={4}>
          <Tag onClick={() => null} size="large" variant='suggestion'  icon={MiniChevronUpIcon}>Goose!</Tag>
        </Box>
    </FlexBox>
    {/* TS Tests: */}
    {/* READONLY */}
    {/* ✅ has onDismiss <Tag onDismiss={() => null} variant='readOnly' icon={MiniStarIcon} >Gotcha!</Tag> */}
    {/* ✅ has disabled <Tag disabled variant='readOnly' icon={MiniStarIcon} >Gotcha!</Tag> */}
    {/* ✅ has href <Tag href="" variant='readOnly' icon={MiniStarIcon} >Gotcha!</Tag> */}
    {/* ✅ has onClick <Tag onClick={() => null} variant='readOnly' icon={MiniStarIcon} >Gotcha!</Tag> */}
    {/* SELECTION */}
    {/* ✅ missing onDismiss <Tag variant='selection' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* ✅ has onClick <Tag onClick={() => null} onDismiss={() => null} variant='selection' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* ✅ has href (incompatabile with href) <Tag href="/" onDismiss={() => null} variant='selection' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* ✅ disabled works <Tag disabled onDismiss={()=> null} variant='selection' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* NAVIGATION */}
    {/* ✅ missing href <Tag variant='navigation' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* ✅ can accept onClick <Tag onClick={() => null} href="" variant='navigation' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* ✅ err with onDismiss <Tag onDismiss={() => null} href="" variant='navigation' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* ✅ disabled works <Tag disabled href="" variant='navigation' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* SUGGESTION */}
    {/* ✅ missing onClick <Tag variant='suggestion' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* ✅ errs with href <Tag onClick={() => null} href="" variant='suggestion' icon={MiniPinIcon} >Tag!</Tag> */}
    {/* BUT NOT THE RIGHT ERROR!! */}
    {/* ✅ err with onDismiss <Tag onDismiss={() => null} onClick={() => {'es'}} variant='suggestion' icon={MiniPinIcon} >Tag!</Tag> */}
  </FlexBox>

)
