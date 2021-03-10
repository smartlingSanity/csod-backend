const client = require('part:@sanity/base/client');
const { getOr } = require('lodash/fp');
const { localize, baseStringTypeMap } = require('./utils');

async function run() {
  try {
    const { eventsPages, events } = await client.fetch(`//groq
      {
				"eventsPages":*[_type=="eventsPage"],
				"events":*[_type=="event"],
			}
    `);

    const tx = client.transaction();
    eventsPages.forEach((eventsPage) => {
      const localizeEventsPages = localize(eventsPage, baseStringTypeMap);
      tx.createOrReplace({ ...localizeEventsPages, enabledLocale: 'all' });
    });

    events.forEach((event) => {
      const eventLink = getOr('', 'link.link.0.externalLink', event);

      if (eventLink) {
        const linkPatch = client.patch(event._id).set({
          url: eventLink,
          enabledLocale: 'us',
        });
        tx.patch(linkPatch);
      }
    });
    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
