/**
 * This function generates Sanity string objects that can be used to define a dropdown list
 * of pixel values (eg, for section padding).
 *
 * @param start
 * @param end
 * @param step
 * @return array of Sanity string objects
 */
export const pixelRange = (start, end, step) => {
  const pixels = [];

  for (let i = start; i <= end; i += step) {
    pixels.push({
      title: `${i} pixels`,
      value: `${i}px`,
    });
  }

  return pixels;
};

export default pixelRange;
