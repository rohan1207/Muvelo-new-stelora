/**
 * Cloudinary Configuration and Helper Functions
 * (copied from React frontend for visual parity)
 */

const CLOUD_NAME = 'dvofgrucv';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

export const getCloudinaryImageUrl = (publicId, options = {}) => {
  const {
    quality = 'auto:good',
    format = 'auto',
    width = 'auto',
    crop = 'scale',
    ...rest
  } = options;

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    `w_${width}`,
    `c_${crop}`,
  ];

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined) {
      transformations.push(`${key}_${value}`);
    }
  });

  return `${BASE_URL}/image/upload/${transformations.join(',')}/${publicId}`;
};

export const getCloudinaryVideoUrl = (publicId, options = {}) => {
  const {
    quality = 'auto:good',
    format = 'auto',
    width = 'auto',
    ...rest
  } = options;

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    `w_${width}`,
  ];

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined) {
      transformations.push(`${key}_${value}`);
    }
  });

  return `${BASE_URL}/video/upload/${transformations.join(',')}/${publicId}`;
};

export default {
  getCloudinaryImageUrl,
  getCloudinaryVideoUrl,
  CLOUD_NAME,
};

