import { HeaderListItem } from './elements';
import { FloatingHeaderItems, HeaderItem } from './types';

export const mapItemsToElement = <T extends HeaderItem<T>[]>(
  items: T,
  side: 'left' | 'right'
) => {
  return items.map((item, index) => {
    const { margin, component: Component, id } = item;

    return (
      <HeaderListItem
        key={id}
        mr={margin}
        ml={side === 'right' && index === 0 ? 'auto' : margin}
      >
        <Component {...item.props} />
      </HeaderListItem>
    );
  });
};

export const mapFloatingItemsToElement = (items: FloatingHeaderItems) => {
  return items.map((item) => <>{item}</>);
};
