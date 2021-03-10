// eslint-disable
import client from 'part:@sanity/base/client';

const clientProductMap = {
  client_entity_venturacountyfiredepartment: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance'],
  },
  client_entity_rsm: {
    products: ['product_entity_cornerstone_recruiting', 'product_entity_cornerstone_learning', 'product_entity_cornerstone_performance'],
  },
  client_entity_towncountrymarkets: {
    products: ['product_entity_cornerstone_learning'],
  },
  client_entity_fossil: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance', 'product_entity_cornerstone_contentanytime'],
  },
  client_entity_sylvanlearning: {
    products: ['product_entity_cornerstone_learning'],
  },
  client_entity_thefriedkingroup: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_contentanytime'],
  },
  client_entity_teamrubicon: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance'],
  },
  client_entity_walgreens: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance'],
  },
  client_entity_pennstatehealth: {
    products: ['product_entity_cornerstone_learning'],
  },
  client_entity_commvault: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance', 'product_entity_cornerstone_contentanytime'],
  },
  client_entity_wendys: {
    products: ['product_entity_cornerstone_learning'],
  },
  client_entity_canon: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance'],
  },
  client_entity_organicvalley: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance', 'product_entity_cornerstone_recruiting'],
  },
  client_entity_hyatt: {
    products: ['product_entity_cornerstone_performance'],
  },
  client_entity_universityoftennessee: {
    products: ['product_entity_cornerstone_learning'],
  },
  client_entity_kentuckypersonnelcabinet: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance', 'product_entity_cornerstone_recruiting'],
  },
  client_entity_newbelgiumbrewing: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance', 'product_entity_cornerstone_recruiting'],
  },
  client_entity_turner: {
    products: ['product_entity_cornerstone_learning', 'product_entity_cornerstone_performance'],
  },
};

const productCategoryEntities = [
  {
    _type: 'productCategoryEntity',
    csodId: 'product_category_careers',
    displayName: 'Cornerstone Careers',
    shortDescription: 'Cornerstone Careers',
    products: {
      linked: 'product_entity_cornerstone_careers',
    },
  },
  {
    _type: 'productCategoryEntity',
    csodId: 'product_category_content',
    displayName: 'Cornerstone Content',
    shortDescription: 'Cornerstone Content',
    products: {
      linked: 'product_entity_cornerstone_contentanytime',
    },
  },
  {
    _type: 'productCategoryEntity',
    csodId: 'product_category_development',
    displayName: 'Cornerstone Development',
    shortDescription: 'Cornerstone Development',
    products: {
      linked: 'product_entity_cornerstone_development',
    },
  },
  {
    _type: 'productCategoryEntity',
    csodId: 'product_category_hr',
    displayName: 'Cornerstone HR',
    shortDescription: 'Cornerstone HR',
    products: {
      linked: 'product_entity_cornerstone_hr',
    },
  },
  {
    _type: 'productCategoryEntity',
    csodId: 'product_category_learning',
    displayName: 'Cornerstone Learning',
    shortDescription: 'Cornerstone Learning',
    products: {
      linked: 'product_entity_cornerstone_learning',
    },
  },
  {
    _type: 'productCategoryEntity',
    csodId: 'product_category_performance',
    displayName: 'Cornerstone Performance',
    shortDescription: 'Cornerstone Performance',
    products: {
      linked: 'product_entity_cornerstone_performance',
    },
  },
  {
    _type: 'productCategoryEntity',
    csodId: 'product_category_recruiting',
    displayName: 'Cornerstone Recruiting',
    shortDescription: 'Cornerstone Recruiting',
    products:
    {
      linked: 'product_entity_cornerstone_recruiting',
    },
  },
];


const productEntities = {
  product_entity_cornerstone_learning: {
    _type: 'productEntity',
    csodId: 'product_entity_cornerstone_learning',
    company: 'cornerstone',
    displayName: 'Cornerstone Learning',
    shortDescription: 'Cornerstone Learning',
  },
  product_entity_cornerstone_performance: {
    _type: 'productEntity',
    csodId: 'product_entity_cornerstone_performance',
    company: 'cornerstone',
    displayName: 'Cornerstone Performance',
    shortDescription: 'Cornerstone Performance',
  },
  product_entity_cornerstone_recruiting: {
    _type: 'productEntity',
    csodId: 'product_entity_cornerstone_recruiting',
    company: 'cornerstone',
    displayName: 'Cornerstone Recruiting',
    shortDescription: 'Cornerstone Recruiting',
  },
  product_entity_cornerstone_contentanytime: {
    _type: 'productEntity',
    csodId: 'product_entity_cornerstone_contentanytime',
    company: 'cornerstone',
    displayName: 'Cornerstone Content Anytime',
    shortDescription: 'Cornerstone Content Anytime',
  },
  product_entity_cornerstone_development: {
    _type: 'productEntity',
    csodId: 'product_entity_cornerstone_development',
    company: 'cornerstone',
    displayName: 'Cornerstone Development',
    shortDescription: 'Cornerstone Development',
  },
  product_entity_cornerstone_careers: {
    _type: 'productEntity',
    csodId: 'product_entity_cornerstone_careers',
    company: 'cornerstone',
    displayName: 'Cornerstone Careers',
    shortDescription: 'Cornerstone Careers',
  },
  product_entity_cornerstone_hr: {
    _type: 'productEntity',
    csodId: 'product_entity_cornerstone_hr',
    company: 'cornerstone',
    displayName: 'Cornerstone HR',
    shortDescription: 'Cornerstone HR',
  },
};

const fetchAllEntities = () => client.fetch(`
*[_type in [
    "industryEntity",
    "productEntity",
    "clientEntity",
    "quoteEntity",
    "productCategoryEntity",
  ]
]{
  "id":_id,
}
`);

const fetchClientEntities = () => client.fetch(`
*[!(_id match "drafts*") 
  && _type == "clientPage"
 && sections[][_type == "clientSlantBanner"]
 ]{
  "_type": "clientEntity",
  "csodId":"client_entity_"+title,
'displayName':title,
'clientLogoColor':sections[defined(fixedSideBar)].fixedSideBar[defined(logo)].logo[0],
'quotes':[],
'clientIndustries':[],
'clientProducts':[], 
}
`);
const fetchIndustryEntities = () => client.fetch(
  `*[!(_id match "drafts*") && _type == "industrypage"]{
  "_type":"industryEntity",
  "csodId":"industry_entity_"+title,
'displayName':title,
'industryImage':sections[defined(fixedSideBar)].fixedSideBar[defined(logo)].logo[0],
}
`,
);
const fetchQuoteEntitiesFromHomepage = () => client.fetch(
  `*[!(_id match "drafts*") && defined(clientCarouselSection)].clientCarouselSection[defined(carouselClients)]{
"quoteEntities": carouselClients[]{
"_type":"quoteEntity",
  'quoteText':clientQuote,
'author':quoteAuthor,
'authorJobTitle':authorTitle,
'quoteImage':clientDrawing,
'imageOrientation':"horizontal",
}
}
`,
);
const fetchQuoteEntitiesFromAllClientsPage = () => client.fetch(
  `*[!(_id match "drafts*") && defined(allClientsSlantBanner)].allClientsSlantBanner[defined(clientCarouselCard)].clientCarouselCard{
  "_type":"quoteEntity",
  'quoteText':clientQuote,
'author':quoteAuthor,
'authorJobTitle':authorTitle,
'quoteImage':clientDrawing,
'imageOrientation':"horizontal",
}
`,
);
const fetchQuoteEntitiesFromProductPage = () => client.fetch(
  `
*[!(_id match "drafts*") 
  && _type == "suitepage"
 ]{
   "quoteEntities": coalesce(sections[][_type == "multiSection"]{
       "quoteEntities":sections[][_type == "clientCarouselSection"]{
      "quoteEntities": carouselClients[]{
      "_type":"quoteEntity",
          'quoteText':clientQuote,
          'author':quoteAuthor,
          'authorJobTitle':authorTitle,
          'quoteImage':clientDrawing,
          'imageOrientation':"horizontal",
          }
      }[0].quoteEntities
 }[].quoteEntities[0],
sections[][_type == "multiSection"]{
       "quoteEntities":sections[][_type == "clientCarouselSection"]{
      "quoteEntities": carouselClients[]{
      "_type":"quoteEntity",
          'quoteText':clientQuote,
          'author':quoteAuthor,
          'authorJobTitle':authorTitle,
          'quoteImage':clientDrawing,
          'imageOrientation':"horizontal",
          }
      }[0].quoteEntities
 }[].quoteEntities[1]
),
    "quoteEntities":sections[][_type == "clientCarouselSection"]{
      "quoteEntities": carouselClients[]{
      "_type":"quoteEntity",
          'quoteText':clientQuote,
          'author':quoteAuthor,
          'authorJobTitle':authorTitle,
          'quoteImage':clientDrawing,
          'imageOrientation':"horizontal",
          }
      }[0].quoteEntities
}
`,

);

const uuidv4 = require('uuid/v4');

const re = /[^0-9a-zA-Z\_]/gi;

const categoryEntities = {};


const generateProductEntities = async (transaction) => {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const [entityName, productEntity] of Object.entries(productEntities)) {
      await transaction.create(productEntity);
    }
    await transaction.commit({ returnDocuments: true }).then((docs) => {
      docs.map((doc) => {
        const entityKey = doc.csodId;
        productEntities[entityKey] = doc;
      });
    });
  } catch (e) {
    console.error(e);
  }
};

const generateProductCategoryEntities = async (transaction) => {
  try {
    productCategoryEntities.map(async (entity) => {
      if (entity.hasOwnProperty('products')) {
        const productEntityKey = entity.products.linked;
        if (productEntities[productEntityKey]) {
          const productEntity = productEntities[productEntityKey];
          entity.products = [{
            _type: 'reference',
            _key: uuidv4(),
            _ref: productEntity._id,
          }];
        }
      }
      await transaction.create(entity);
    });

    await transaction.commit({ returnDocuments: true }).then((docs) => {
      docs.map((doc) => {
        const entityKey = doc.csodId;
        categoryEntities[entityKey] = doc;
      });
    });
  } catch (e) {
    console.error(e);
  }
};

const generateIndustryEntities = async (transaction) => {
  try {
    const industries = await fetchIndustryEntities();

    industries.map((industry) => {
      industry.csodId = industry.csodId.toLocaleLowerCase().replace(re, '');
      transaction.create(industry);
      return industry;
    });
  } catch (e) {
    console.error(e);
  }
};


const generateQuoteEntitiesFromHomepage = async (transaction) => {
  try {
    const quotes = await fetchQuoteEntitiesFromHomepage();
    quotes.map((quote) => {
      quote.quoteEntities.map((entity) => {
        transaction.create(entity);
        return entity;
      });
      return quote;
    });
  } catch (e) {
    console.error(e);
  }
};

const generateQuoteEntitiesFromAllClientsPage = async (transaction) => {
  try {
    const quotes = await fetchQuoteEntitiesFromAllClientsPage();
    quotes.map((quote) => {
      transaction.create(quote);
      return quote;
    });
  } catch (e) {
    console.error(e);
  }
};


const generateQuoteEntitiesFromProductPage = async (transaction) => {
  try {
    const quotes = await fetchQuoteEntitiesFromProductPage();
    quotes.map((quote) => {
      quote.quoteEntities.map((entity) => {
        transaction.create(entity);
        return entity;
      });
      return quote;
    });
  } catch (e) {
    console.error(e);
  }
};

const generateClientEntities = async (transaction) => {
  try {
    const clientEntities = await fetchClientEntities();
    clientEntities.map((clientEntity) => {
      const csodId = clientEntity.csodId.toLocaleLowerCase().replace(re, '');
      clientEntity.csodId = csodId;
      if (clientProductMap[csodId]) {
        clientEntity.clientProducts = clientProductMap[csodId].products.map((product) => {
          if (productEntities[product]) {
            return {
              _type: 'reference',
              _key: uuidv4(),
              _ref: productEntities[product]._id,
            };
          }
        });
      }
      transaction.create(clientEntity);
      return clientEntity;
    });
  } catch (e) {
    console.error(e);
  }
};

const deleteAllEntities = async (transaction) => {
  try {
    const entities = await fetchAllEntities();
    entities.map(async (entity) => {
      try {
        await transaction.delete(entity.id).commit();
        console.log('deleting ', entity.id);
        return entity;
      } catch (e) {
        console.error(e);
      }
    });
  } catch (e) {
    console.error(e);
  }
};


const commitTransactions = async (transaction) => {
  const committed = await transaction.commit({
    returnIds: true,
  });
  console.log(committed);
};


const generateEntities = async (transaction) => {
  await generateProductEntities(transaction);
  transaction.reset();
  await generateProductCategoryEntities(transaction);
  transaction.reset();
  await generateIndustryEntities(transaction);
  await generateQuoteEntitiesFromHomepage(transaction);
  await generateQuoteEntitiesFromAllClientsPage(transaction);
  await generateQuoteEntitiesFromProductPage(transaction);
  await generateClientEntities(transaction);
  await commitTransactions(transaction);
};

const transaction = client.transaction();


// deleteAllEntities(transaction);
transaction.reset();
generateEntities(transaction);
