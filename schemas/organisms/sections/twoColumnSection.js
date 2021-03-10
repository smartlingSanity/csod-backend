import SectionPreview from '../../../src/components/SectionPreview/SectionPreview';
import { parseAsset } from '../../../src/components/SectionPreview/helpers';
import { localizePreview } from '../../utils/index';

export default {
  name: 'twoColumnSection',
  title: 'Two Column Section',
  type: 'object',
  fields: [
    {
      name: 'sectionStyles',
      title: 'Section Styles',
      type: 'sectionStyles',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'localeCsodImage',
    },
    {
      name: 'leftBlock',
      title: 'Left Column',
      type: 'csodColumn',
    },
    {
      name: 'rightBlock',
      title: 'Right Column',
      type: 'csodColumn',
    },
  ],
  preview: {
    select: {
      _type: '_type',
      rightBlock: 'rightBlock',
      leftBlock: 'leftBlock',
      background: 'sectionStyles.backgroundSection[0]',
    },
    prepare: localizePreview(({
      rightBlock, leftBlock, _type, background,
    }) => {
      const isTextColumn = block => [
        'textBlock',
        'textBlockContent',
        'textBlockWithIconRowSection',
      ].includes(block.columnBlocks[0]._type);

      const textColumn = [rightBlock, leftBlock]
        .filter(block => Boolean(block))
        .filter(block => isTextColumn(block))
        .map(block => block.columnBlocks[0]);
      const mediaColumn = [rightBlock, leftBlock]
        .filter(block => Boolean(block))
        .filter(block => !isTextColumn(block))
        .map(block => block.columnBlocks[0]);

      const parseHeading = (txtCol) => {
        const DEFAULT_TEXT = 'No heading text found';

        if (!Array.isArray(txtCol) || txtCol.length === 0) {
          return DEFAULT_TEXT;
        }
        switch (txtCol[0]._type) {
          case 'textBlock':
            return txtCol[0].headingText;
          case 'textBlockContent':
            return txtCol[0].heading;
          default:
            return DEFAULT_TEXT;
        }
      };
      return {
        title: parseHeading(textColumn),
        subtitle: _type,
        media: parseAsset(mediaColumn),
        background,
      };
    }),
    component: SectionPreview,
  },
};
