/* eslint-disable */
import VideoUrlWithEmbedCode from "../../widgets/VideoUrlWithEmbedCode.jsx";
import { localizePreview } from "../utils/index.js";
import validation from "../utils/validation";
/* eslint-enable */

const getVideoType = (url) => {
  let $type = 'YouTube';
  if (url.match(/vidyard/i) !== null) {
    $type = 'Vidyard';
  }
  return $type;
};

export default {
  name: 'video',
  title: 'Video',
  type: 'object',
  inputComponent: VideoUrlWithEmbedCode,
  fields: [
    {
      name: 'url',
      description:
        'Must be full url (e.g. https://www.youtube.com/watch?v=DHc8NJCG3Rs), shortened urls will not work',
      type: 'localeUrl',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
    {
      name: 'embedCode',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare: localizePreview((selection) => {
      const { url } = selection;
      const vidType = getVideoType(url);

      return {
        title: `${vidType} Video Modal`,
        subtitle: url,
      };
    }),
  },
};
