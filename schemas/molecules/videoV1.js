/* eslint-disable */
import VideoV1UrlWithEmbedCode from "../../widgets/VideoV1UrlWithEmbedCode";

const getVideoType = (url) => {
  let $type = "YouTube";
  if (url.match(/vidyard/i) !== null) {
    $type = "Vidyard";
  }
  return $type;
};

export default {
  name: "videoV1",
  title: "Video",
  type: "object",
  inputComponent: VideoV1UrlWithEmbedCode,
  fields: [
    {
      name: "url",
      description:
        "Must be full url (e.g. https://www.youtube.com/watch?v=DHc8NJCG3Rs), shortened urls will not work",
      type: "url",
    },
    {
      name: "embedCode",
      type: "string",
    },
  ],
  preview: {
    select: {
      url: "url",
      subtitle: "url",
    },
    prepare(selection) {
      const { url, subtitle } = selection;
      const vidType = getVideoType(url);

      return {
        title: `${vidType} Video Modal`,
        subtitle,
      };
    },
  },
};
