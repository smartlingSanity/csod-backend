import client from 'part:@sanity/base/client'; /* eslint-disable-line */
import _ from 'lodash/fp'; /* eslint-disable-line import/no-unresolved */
import { suiteTypeField } from '../sharedFields';
import { getLocale } from '../../config/intlConfig';
import { localizePreview } from '../utils';

export default {
  name: 'clientFixedSideBar',
  title: 'Client Fixed Side Bar',
  type: 'object',
  fields: [
    {
      name: 'hide',
      title: 'Use this sidebar',
      description: 'If enabled, this sidebar will be used instead of the new sidebar below',
      type: 'boolean',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'localeCsodImage',
    },
    {
      name: 'headingText',
      title: 'Heading',
      type: 'localeString',
      description: 'example: Products Used',
    },
    {
      name: 'align',
      title: 'Alignment',
      description: 'Choose if the heading will be aligned left or center',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'productsUsed',
      title: 'Products Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: suiteTypeField.options.list,
      },
      layout: 'checkbox',
      validation: Rule => [
        Rule.required().custom((sections, context) => {
          if (!context.document.sections[0].fixedSideBarV1.clientEntity
            && context.document.sections[0].fixedSideBar.productsUsed.length < 1) return 'Please choose at least one product!';
          return true;
        }),
        Rule.custom(productsUsedByThisClient => client.fetch(
          `*[_type == "menu" ]{ 
                  "products": menuDrawers[] {
                    "suites" : menuSections[_type == 'suiteSection'] {
                      suiteSectionItems
                    }
                  }
                }`,
        ).then((menu) => {
          const { dataset } = client.config();
          if (getLocale(dataset) === 'us') return true;
          if (!menu[0]) return 'No menu items';
          const productsInMenuKeys = menu[0].products
            .filter(product => _.getOr(false, 'suites[0].suiteSectionItems', product))
            .map(nestedSuiteSection => _.getOr([], 'suites[0].suiteSectionItems', nestedSuiteSection))[0]
            .map(productUsed => productUsed.suiteType);

          const invalidProducts = productsUsedByThisClient
            .reduce(
              (acc, prodUsedByThisClient) => (productsInMenuKeys.includes(prodUsedByThisClient)
                ? acc : acc.concat(prodUsedByThisClient)), [],
            );

          const prettyInvalidProducts = invalidProducts.map(
            invProd => suiteTypeField.options.list
              .filter(suiteTypeObj => suiteTypeObj.value === invProd)[0]
              .title,
          );

          return prettyInvalidProducts.length === 0 ? true
            : `You have selected Products that aren't 
              displayed in the Main Menu. Please add "${prettyInvalidProducts.join('","')}" 
              to the Main Menu`;
        }))],
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button',
    },
  ],
  preview: {
    select: {
      logo: 'logo',
    },
    prepare: localizePreview((selection) => {
      const { logo } = selection;
      return {
        title: 'Customer Fixed Side Bar',
        media: logo,
      };
    }),
  },
};
