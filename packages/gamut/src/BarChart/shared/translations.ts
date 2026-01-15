export type BarChartTranslations = {
  sortLabel: string;
  sortOptions: {
    none: string;
    labelAsc: string;
    labelDesc: string;
    valueAsc: string;
    valueDesc: string;
  };
  accessibility: {
    gainedNowAt: string; // Template: "{value} {unit} gained - now at {value} {unit} in {label}"
    inLabel: string; // Template: "{value} {unit} in {label}"
    inOnly: string; // Template: "{value} {unit} in "
  };
  locale: string; // For Intl.NumberFormat, e.g., 'en', 'es', 'fr'
};

export const defaultBarChartTranslations: BarChartTranslations = {
  sortLabel: 'Order by:',
  sortOptions: {
    none: 'None',
    labelAsc: 'Label (A-Z)',
    labelDesc: 'Label (Z-A)',
    valueAsc: 'Value (Low-High)',
    valueDesc: 'Value (High-Low)',
  },
  accessibility: {
    gainedNowAt: 'gained - now at',
    inLabel: 'in',
    inOnly: 'in ',
  },
  locale: 'en',
};
