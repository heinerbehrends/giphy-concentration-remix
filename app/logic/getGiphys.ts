import { GiphyFetch, SearchOptions } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { duplicateElements, shuffleArray } from './gameLogic';

const API_KEY = process.env.API_KEY;
const gf = new GiphyFetch(API_KEY!);

export function getURL(giphObj: IGif) {
  return giphObj.images.fixed_height.url;
}

// type guard function for NodeJS Errors
function isError(something: any): something is Error {
  return something instanceof Error;
}

export async function getUrls(searchTerm: string) {
  try {
    const options: SearchOptions = { sort: 'recent', limit: 12, rating: 'g' };

    const result = await gf.search(searchTerm, options);
    console.log(result.data[0].images);
    if (result.data.length < 12) {
      throw new Error('There are not enough results for the search term.');
    }
    const URLs = result.data.map(getURL);
    const preparedUrls = shuffleArray(duplicateElements(URLs));

    return { preparedUrls, error: null };
  } catch (error) {
    if (isError(error)) {
      return { error: error.message, preparedUrls: null };
    }
  }
}
