import TinyURL from 'tinyurl';
import { store } from './../redux/store';

export default async function madeShortUrl(url) {
  const state = store?.getState();
  const longURL = url + '#' + JSON.stringify(state);
  const shortURL = await TinyURL.shorten(longURL);
  return shortURL;
}
