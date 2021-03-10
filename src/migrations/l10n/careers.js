const client = require('part:@sanity/base/client');

async function run() {
  try {
    const { allCareersPage, searchBar } = await client.fetch(`//groq
    {
      "allCareersPage": *[_type=="allCareersPage"][0],
      "searchBar": *[_type=="searchBar"][0]
    }
    `);

    const mapLink = link => ({
      ...link,
      _type: 'externalLinkV1',
    });

    const tx = client.transaction();

    const sliderPatch = client.patch(allCareersPage._id).set({
      careersSlider: {
        ...allCareersPage.careersSlider,
        slides: allCareersPage.careersSlider.slides.map(slide => ({
          ...slide,
          blockContent: {
            ...slide.blockContent,
            _type: 'textBlockContentV1',
          },
        })),
      },
    });
    tx.patch(sliderPatch);

    const disclaimerPatch = client.patch(allCareersPage._id).set({
      disclaimer: {
        ...allCareersPage.disclaimer,
        _type: 'blockContentSectionV1',
      },
    });
    tx.patch(disclaimerPatch);

    const featuresPatch = client.patch(allCareersPage._id).set({
      features: allCareersPage.features.map(feature => ({
        ...feature,
        link: {
          ...feature.link,
          _type: 'linkV1',
          link: feature.link.link.map(mapLink),
        },
      })),
    });
    tx.patch(featuresPatch);

    const videButtonPatch = client.patch(allCareersPage._id).set({
      videoButton: {
        ...allCareersPage.videoButton,
        _type: 'videoButtonV1',
        video: {
          ...allCareersPage.videoButton.video,
          _type: 'videoV1',
        },
      },
    });
    tx.patch(videButtonPatch);

    const buttonPatch = client.patch(searchBar._id).set({
      button: {
        ...searchBar.button,
        _type: 'buttonV1',
        link: {
          ...searchBar.button.link,
          _type: 'linkV1',
          link: searchBar.button.link.link.map(mapLink),
        },
      },
    });
    tx.patch(buttonPatch);

    const result = await tx.commit();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();
