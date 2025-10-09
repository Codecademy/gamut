import {
  Alert,
  Box,
  Card,
  FillButton,
  FlexBox,
  GridBox,
  IconButton,
  List,
  ListRow,
  Markdown,
  StrokeButton,
  Text,
  TextButton,
} from '@codecademy/gamut';
import {
  MiniArrowLeftIcon,
  MiniArrowRightIcon,
  MiniRibbonIcon,
  SearchIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/RTL',
  parameters: {
    docs: {
      description: {
        component:
          'Examples demonstrating Gamut components with Right-to-Left (RTL) languages like Arabic.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Arabic text samples
const arabicText = {
  heading: 'مرحباً بك في منصة Codecademy',
  paragraph:
    'هذا مثال على كيفية عمل مكونات Gamut مع النصوص العربية. النص العربي يُقرأ من اليمين إلى اليسار، مما يتطلب معالجة خاصة للتخطيط والتصميم.',
  button: 'انقر هنا',
  listItem1: 'تعلم البرمجة',
  listItem2: 'تطوير المهارات',
  listItem3: 'بناء المشاريع',
  alert: 'هذه رسالة تنبيه باللغة العربية',
  cardTitle: 'بطاقة باللغة العربية',
  cardContent:
    'محتوى البطاقة يوضح كيفية عرض النصوص العربية بشكل صحيح في مكونات Gamut.',
};

const RTLContainer: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => (
  <Box border={1} borderColor="gray-300" borderRadius="md" p={24}>
    <Text as="h3" fontSize={18} fontWeight="bold" mb={16}>
      {title}
    </Text>
    <Box dir="rtl">{children}</Box>
  </Box>
);

export const Typography: Story = {
  render: () => (
    <RTLContainer title="Typography Components">
      <FlexBox column gap={16}>
        <Text as="h1" fontSize={26} fontWeight="bold">
          {arabicText.heading}
        </Text>
        <Text fontSize={16} lineHeight="base">
          {arabicText.paragraph}
        </Text>
        <Text color="text-secondary" fontSize={14}>
          نص أصغر باللغة العربية
        </Text>
      </FlexBox>
    </RTLContainer>
  ),
};

export const Buttons: Story = {
  render: () => (
    <RTLContainer title="Button Components">
      <FlexBox gap={16} wrap>
        <FillButton variant="primary">{arabicText.button}</FillButton>
        <StrokeButton variant="secondary">{arabicText.button}</StrokeButton>
        <TextButton>{arabicText.button}</TextButton>
        <IconButton icon={SearchIcon} tip="بحث" />
      </FlexBox>
    </RTLContainer>
  ),
};

export const ButtonsWithIcons: Story = {
  render: () => (
    <RTLContainer title="Buttons with Icons (RTL-aware)">
      <FlexBox gap={16} wrap>
        <FillButton icon={MiniArrowLeftIcon} iconPosition="left">
          زر مع أيقونة يسار
        </FillButton>
        <StrokeButton icon={MiniArrowRightIcon} iconPosition="right">
          زر مع أيقونة يمين
        </StrokeButton>
        <TextButton icon={MiniRibbonIcon} iconPosition="left">
          زر نص مع أيقونة
        </TextButton>
      </FlexBox>
    </RTLContainer>
  ),
};

export const Lists: Story = {
  render: () => (
    <RTLContainer title="List Components">
      <List>
        <ListRow>{arabicText.listItem1}</ListRow>
        <ListRow>{arabicText.listItem2}</ListRow>
        <ListRow>{arabicText.listItem3}</ListRow>
      </List>
    </RTLContainer>
  ),
};

export const Cards: Story = {
  render: () => (
    <RTLContainer title="Card Components">
      <Card>
        <Text as="h3" fontSize={18} fontWeight="bold" mb={12}>
          {arabicText.cardTitle}
        </Text>
        <Text fontSize={16}>{arabicText.cardContent}</Text>
      </Card>
    </RTLContainer>
  ),
};

export const Alerts: Story = {
  render: () => (
    <RTLContainer title="Alert Components">
      <FlexBox column gap={16}>
        <Alert type="general">{arabicText.alert}</Alert>
        <Alert type="success">تم بنجاح! هذه رسالة نجاح باللغة العربية.</Alert>
        <Alert type="notice">
          تحذير: هذا مثال على رسالة تحذير باللغة العربية.
        </Alert>
        <Alert type="error">
          خطأ: حدث خطأ ما. هذه رسالة خطأ باللغة العربية.
        </Alert>
      </FlexBox>
    </RTLContainer>
  ),
};

export const Layouts: Story = {
  render: () => (
    <RTLContainer title="Layout Components">
      <FlexBox column gap={16}>
        <Text fontSize={16} fontWeight="bold">
          FlexBox Layout:
        </Text>
        <FlexBox gap={16} wrap>
          <Box bg="blue-0" borderRadius="sm" p={16}>
            <Text>عنصر 1</Text>
          </Box>
          <Box bg="green-0" borderRadius="sm" p={16}>
            <Text>عنصر 2</Text>
          </Box>
          <Box bg="pink-0" borderRadius="sm" p={16}>
            <Text>عنصر 3</Text>
          </Box>
        </FlexBox>

        <Text fontSize={16} fontWeight="bold" mt={16}>
          GridBox Layout:
        </Text>
        <GridBox gap={16} gridTemplateColumns="repeat(3, 1fr)">
          <Box bg="red-0" borderRadius="sm" p={16}>
            <Text>شبكة 1</Text>
          </Box>
          <Box bg="yellow-0" borderRadius="sm" p={16}>
            <Text>شبكة 2</Text>
          </Box>
          <Box bg="pink-0" borderRadius="sm" p={16}>
            <Text>شبكة 3</Text>
          </Box>
        </GridBox>
      </FlexBox>
    </RTLContainer>
  ),
};

export const MarkdownExample: Story = {
  render: () => (
    <RTLContainer title="Markdown Component">
      <Markdown
        text={`
# عنوان رئيسي باللغة العربية

هذا مثال على **نص عربي** في مكون Markdown.

## قائمة باللغة العربية:
- عنصر القائمة الأول
- عنصر القائمة الثاني
- عنصر القائمة الثالث

### رابط
[رابط إلى Codecademy](https://www.codecademy.com)

> هذا اقتباس باللغة العربية يوضح كيفية عمل مكون Markdown مع النصوص العربية.
        `}
      />
    </RTLContainer>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <RTLContainer title="Mixed Arabic and English Content">
      <FlexBox column gap={16}>
        <Text fontSize={16}>Mixed content: مرحباً Hello العربية English</Text>
        <Text fontSize={16}>Numbers: ١٢٣ 456 ٧٨٩</Text>
        <Text fontSize={16}>
          Mixed direction: مرحباً Hello العربية English مرحباً
        </Text>
        <FillButton variant="primary">Submit / إرسال</FillButton>
      </FlexBox>
    </RTLContainer>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <Box p={24}>
      <Text as="h2" fontSize={26} fontWeight="bold" mb={24}>
        Complete RTL Example - Arabic Interface
      </Text>

      <FlexBox column dir="rtl" gap={24}>
        {/* Header */}
        <Box bg="blue-0" borderRadius="md" p={16}>
          <Text as="h1" color="blue-500" fontSize={18} fontWeight="bold">
            {arabicText.heading}
          </Text>
          <Text fontSize={16} mt={8}>
            {arabicText.paragraph}
          </Text>
        </Box>

        {/* Navigation */}
        <FlexBox gap={16} wrap>
          <FillButton size="small" variant="primary">
            الرئيسية
          </FillButton>
          <StrokeButton size="small" variant="secondary">
            الدورات
          </StrokeButton>
          <TextButton size="small">الملف الشخصي</TextButton>
          <IconButton icon={SearchIcon} tip="بحث" />
        </FlexBox>

        {/* Content Cards */}
        <GridBox
          gap={16}
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        >
          <Card>
            <Text as="h3" fontSize={16} fontWeight="bold" mb={12}>
              تعلم البرمجة
            </Text>
            <Text fontSize={14} mb={16}>
              ابدأ رحلتك في تعلم البرمجة مع دوراتنا التفاعلية
            </Text>
            <FillButton size="small" variant="primary">
              ابدأ الآن
            </FillButton>
          </Card>

          <Card>
            <Text as="h3" fontSize={16} fontWeight="bold" mb={12}>
              تطوير المهارات
            </Text>
            <Text fontSize={14} mb={16}>
              طور مهاراتك التقنية مع مشاريع عملية
            </Text>
            <StrokeButton size="small" variant="secondary">
              عرض الدورات
            </StrokeButton>
          </Card>
        </GridBox>

        {/* Alert */}
        <Alert type="general">
          💡 نصيحة: يمكنك تغيير لغة الواجهة من إعدادات الحساب
        </Alert>

        {/* List */}
        <Box>
          <Text as="h3" fontSize={16} fontWeight="bold" mb={12}>
            الميزات الرئيسية:
          </Text>
          <List>
            <ListRow>دورات تفاعلية باللغة العربية</ListRow>
            <ListRow>مشاريع عملية لتطبيق ما تعلمته</ListRow>
            <ListRow>شهادات معتمدة عند إكمال الدورات</ListRow>
            <ListRow>مجتمع من المتعلمين والمطورين</ListRow>
          </List>
        </Box>
      </FlexBox>
    </Box>
  ),
};
