import { localizePreview } from '../../utils';
import validation from '../../utils/validation';

export default {
  name: 'option',
  title: 'Option',
  type: 'object',
  fields: [
    {
      name: 'textLabel',
      title: 'Text Label',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale).error('Label is required'),
    },
    {
      name: 'value',
      title: 'Value',
      type: 'localeString',
      description: 'If different from text label (ex: if value is in English and text label is in another language)',
    },
    {
      name: 'sfid',
      title: 'Campaign ID / SFID',
      type: 'string',
      description: 'Optional SFID to be used for the form (can also set SFID in form)',
    },
  ],
  preview: {
    select: {
      title: 'textLabel',
      subtitle: 'sfid',
    },
    prepare: localizePreview((selection) => {
      const { title, subtitle } = selection;
      const subtitleToShow = (subtitle != undefined ? `SFID: ${subtitle}` : 'no SFID assigned');

      return {
        title,
        subtitle: subtitleToShow,
      };
    }),
  },
};
