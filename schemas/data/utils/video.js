module.exports = {
  getEmbedCodeForUrl: (url) => {
    let embedCode = false;
    const isVidyard = url.match(/vidyard/gi);
    const isVimeo = url.match(/vimeo/gi);

    if (isVidyard) {
      // vidyard videos.
      const vidyardParts = url.match(/^.+\/(\w+)/);
      const uuid = vidyardParts[1];
      const vidyardUrl = `//play.vidyard.com/${uuid}.html?v=3.1.1&autoplay=0`;

      embedCode = `<iframe class="video-iframe vidyard-video" src="${vidyardUrl}" data-url="${vidyardUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (isVimeo) {
      // vimeo videos.
      const vimeoParts = url.match(/^.+\/(\w+)/);
      const videoId = vimeoParts[1];
      const vimeoUrl = `//player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;

      embedCode = `<iframe class="video-iframe vimeo-video" src="${vimeoUrl}" frameborder="0" allow="accelerometer; autoplay; fullscreen" allowfullscreen></iframe>`;
    } else {
      // youtube videos
      // urls matching this format: https://www.youtube.com/watch?v=bpT23CxJCig
      let _url = `${url.replace('watch?v=', 'embed/')}`;

      // urls matching this format: https://youtu.be/4Ppni_z0fyI
      const isShortYoutubeUrl = url.match(/(^.+tu\.be)\/(\w+)/);
      if (isShortYoutubeUrl) {
        _url = `//www.youtube.com/embed/${isShortYoutubeUrl[2]}`;
      }

      // generate iframe with proper url
      embedCode = `<iframe class="video-iframe youtube-video" src="${_url}?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen autoplay=false></iframe>`;
    }

    return embedCode;
  },
};
