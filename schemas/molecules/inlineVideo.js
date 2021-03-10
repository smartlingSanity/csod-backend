import { localizePreview } from '../utils';
import validation from '../utils/validation';

const getVideoType = (url) => {
  let $type = 'YouTube';
  if (url.match(/vidyard/i) !== null) {
    $type = 'Vidyard';
  }
  return $type;
};

export default {
  name: 'inlineVideo',
  title: 'Inline Video',
  type: 'object',
  fields: [
    {
      name: 'videoURL',
      title: 'Video URL',
      type: 'video',
      validation: Rule => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Video Thumbnail',
      type: 'localeCsodImage',
      validation: Rule => Rule.custom(validation.requiredByLocale),
    },
  ],
  preview: {
    select: {
      video: 'videoURL',
    },
    prepare: localizePreview((selection) => {
      const { video } = selection;
      return {
        title: `Inline ${getVideoType(video.url)} Video`,
        subtitle: video.url,
      };
    }),
  },
};
