const client = require('part:@sanity/base/client');
const groq = require('groq');

const convertExternalLink = (externalLink) => {
  const externalLinkCopy = { ...externalLink };

  if (externalLinkCopy._type === 'externalLink') {
    externalLinkCopy._type = 'externalLinkV1';
  }
  if (externalLinkCopy.externalLink.startsWith('www')) {
    externalLinkCopy.externalLink = `https://${externalLinkCopy.externalLink}`;
  }
  return externalLinkCopy;
};

async function run() {
  const query = groq`*[_type=="redirect"]`;
  const redirects = await client.fetch(query);
  const tx = client.transaction();

  redirects.forEach((redirect) => {
    const newRedirect = {
      ...redirect,
      from: convertExternalLink(redirect.from),
      to: redirect.to.map((to) => {
        if (to._type === 'externalLink') {
          return convertExternalLink(to);
        }
        return to;
      }),
    };
    tx.createOrReplace(newRedirect);
  });
  const result = await tx.commit();
  console.log(result);
}

run();
