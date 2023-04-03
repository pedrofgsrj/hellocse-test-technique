import { API_CONFIG_KEY } from "./api";
import { ApiConfig } from "./interfaces/api";

/**
 * Retrieves the TMDB API configuration stored on the localStorage.
 *
 * Returns null if the configuration is not found.
 */
const getApiConfig = (): ApiConfig | null => {
  return JSON.parse(localStorage.getItem(API_CONFIG_KEY) || "null");
};

/**
 * Returns a mapping of the available image sizes and their base URL
 */
export const getImageSizeMap = (): Record<string, string> => {
  const config = getApiConfig();
  if (!config) return {};

  const { secure_base_url, poster_sizes } = config.images;

  const initialValue: Record<string, string> = {};

  return poster_sizes.reduce((sizeMap, size) => {
    let key: string;

    // We set an arbitrary width for the "original" size
    if (size === "original") {
      key = `1200w`;
    } else {
      key = `${size.substring(1)}w`;
    }

    sizeMap[key] = `${secure_base_url}${size}`;

    return sizeMap;
  }, initialValue);
};

/**
 * Returns an array with the image urls and width descriptors to be used on the img HTML tag
 */
export const getImageSizes = (imageSizeMap: Record<string, string>, imagePath: string): string[] => {
  return Object.keys(imageSizeMap).map((size) => `${imageSizeMap[size]}${imagePath} ${size}`);
};
