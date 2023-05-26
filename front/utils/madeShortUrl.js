import TinyURL from 'tinyurl';
import { store } from './../redux/store';

export default async function madeShortUrl(url) {
  const state = store?.getState();
  // console.log('url', url)
  // console.log('JSON.stringify(state)', JSON.stringify(state))
  const longURL = url + '#' + JSON.stringify(state);
  const shortURL = await TinyURL.shorten(longURL);
  return shortURL;
}
