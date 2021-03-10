export const parseAsset = (mediaArray) => {
  if (!mediaArray || !Array.isArray(mediaArray) || mediaArray.length === 0) {
    return null;
  }

  const [media] = mediaArray;

  if (
    typeof media === 'undefined'
    || (media.asset && media.asset._ref && media.asset._ref.search('-pdf') !== -1)
  ) {
    return null;
  }

  switch (media._type) {
    case 'csodImage':
      return media.asset;
    case 'productScreenAnimation':
      return media.placeholder.asset;
    case 'downloadAsset':
      return media.preview.asset;
    case 'localeCsodImage':
      return media;
    default:
      return null;
  }
};

export default {
  parseAsset,
};
