import { Column, ColumnProps } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const columns = [
  { size: 12 },
  ...new Array(2).fill({ size: 6 }),
  ...new Array(3).fill({ size: 4 }),
  ...new Array(4).fill({ size: 3 }),
  ...new Array(6).fill({ size: 2 }),
  ...new Array(12).fill({ size: 1 }),
];

export const gapColumns = [
  { size: 12 },
  ...new Array(2).fill({ size: 6 }),
  ...new Array(3).fill({ size: 4 }),
];

export const rowColumns = new Array(12).fill({ size: 3 });

export const offsetColumns = [
  { offset: 2, size: 4 },
  { size: 2 },
  { size: 2 },
  { size: 4 },
  { size: 8 },
  { offset: { _: 6, md: 4, lg: 2 }, size: 6 },
  { offset: { _: 0, md: 4 }, size: 6 },
];

export const rowspanColumns = [
  new Array(12).fill({ size: 3 }),
  {
    3: 3,
    2: 2,
    4: 3,
    0: 4,
  },
] as const;

export const renderColumnChildren = (
  arr: { size: ColumnProps['size']; offset?: ColumnProps['offset'] }[],
  id: string,
  span?: Record<number, ColumnProps['rowspan']>
) => {
  return arr.map((props, i) => (
    <Column
      key={`${id}-${i * 1}`}
      {...props}
      rowspan={span ? span[i] : undefined}
    >
      <Example>{`${props?.size?.toString()}`}</Example>
    </Column>
  ));
};

export const Example = styled.div(
  css({
    minHeight: '3rem',
    bg: 'navy',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
);

export const RowExample = styled(Example)(css({ mb: 16 }));
