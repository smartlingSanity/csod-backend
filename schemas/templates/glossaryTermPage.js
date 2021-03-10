import { routeField, sectionsField, enabledLocaleField } from '../sharedFields';
import productTypeField from '../entities/productEntity/productType';
import validation from '../utils/validation';
import { localizePreview } from '../utils/index';

export default {
  name: 'glossaryTermPage',
  title: 'Term Detail',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    enabledLocaleField(),
    routeField(),
    {
      name: 'relatedLink',
      title: 'Related Link',
      type: 'link',
    },
    sectionsField(['blockContentSection']),
    productTypeField,
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'productType',
    },
    prepare: localizePreview(selection => selection),
  },
};
