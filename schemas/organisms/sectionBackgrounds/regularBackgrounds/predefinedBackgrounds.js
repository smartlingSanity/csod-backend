import backgroundSettingsGenerator from '../utils/sectionBackgroundGenerator/sectionBackgroundGenerator';

export const grayBox = backgroundSettingsGenerator(
  {
    name: 'grayBox',
    title: 'Gray Box',
  },
);

export const grayBoxBottomSlant = backgroundSettingsGenerator(
  {
    name: 'grayBoxBottomSlant',
    title: 'Gray Box - Bottom Slant',
  },
);

export const grayBoxDoubleSlant = backgroundSettingsGenerator(
  {
    name: 'grayBoxDoubleSlant',
    title: 'Gray Box - Double Slant',
  },
);

export const grayBoxTopSlant = backgroundSettingsGenerator(
  {
    name: 'grayBoxTopSlant',
    title: 'Gray Box - Top Slant',
  },
);

export const grayCurves = backgroundSettingsGenerator(
  {
    name: 'grayCurves',
    title: 'Gray Curves',
  },
);

export default {
  grayBox,
  grayBoxBottomSlant,
  grayBoxDoubleSlant,
  grayBoxTopSlant,
  grayCurves,
};
