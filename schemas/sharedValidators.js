const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/;

const decodeAssetId = (id) => {
  const [, assetId, dimensions, format] = pattern.exec(id);
  const [width, height] = dimensions.split('x').map(v => parseInt(v, 10));

  return {
    assetId,
    dimensions: { width, height },
    format,
  };
};

export const validateImage = (image, imageRequirements) => {
  if (!image) return true;
  const { dimensions } = decodeAssetId(image.asset._ref);
  if (dimensions.width <= imageRequirements.width) {
    return `Image must be at least ${imageRequirements.width} pixels wide`;
  }
  if (dimensions.height <= imageRequirements.height) {
    return `Image must be at least ${imageRequirements.height} pixels tall`;
  }
  return true;
};

export default {
  validateImage,
};
