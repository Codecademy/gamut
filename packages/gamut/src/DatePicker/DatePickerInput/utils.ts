import { stringifyLocale } from '../utils/locale';

export type DatePartKind = 'month' | 'day' | 'year';

export type DateFormatLayoutItem =
  | { kind: 'field'; field: DatePartKind }
  | { kind: 'literal'; text: string };

export const getDateFormatLayout = (locale: Intl.Locale) => {
  const parts = new Intl.DateTimeFormat(stringifyLocale(locale), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(2025, 10, 15));

  const items: DateFormatLayoutItem[] = [];
  for (const part of parts) {
    if (part.type === 'month') items.push({ kind: 'field', field: 'month' });
    else if (part.type === 'day') items.push({ kind: 'field', field: 'day' });
    else if (part.type === 'year') items.push({ kind: 'field', field: 'year' });
    else if (part.type === 'literal')
      items.push({ kind: 'literal', text: part.value });
  }
  return items;
};

export const getDateFieldOrder = (layout: DateFormatLayoutItem[]) => {
  const order: DatePartKind[] = [];
  for (const item of layout) {
    if (item.kind === 'field' && !order.includes(item.field)) {
      order.push(item.field);
    }
  }
  return order.length === 3
    ? order
    : (['month', 'day', 'year'] as DatePartKind[]);
};

export const formatDateISO8601DateOnly = (date: Date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};
