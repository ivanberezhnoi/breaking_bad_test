import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.breakingbadapi.com/api/',
});

const SERIES_NAME = 'Breaking Bad';

export const charactersAPI = {
  getCharactersByName(name) {
    return instance.get(`characters?name=${name}`);
  },
  getCharactersById(id) {
    return instance.get(`characters/${id}`);
  },
};

export const episodesAPI = {
  getAllEpisodes() {
    return instance.get(`episodes?series=${SERIES_NAME}`);
  },
  getEpisodeById(id) {
    return instance.get(`episodes/${id}`);
  }
};

export const quotesAPI = {
  getQuotesByAuthor(author) {
    return instance.get(`quote?author=${author}`);
  },
};

export const deathsAPI = {
  getAllDeaths() {
    return instance.get(`deaths`);
  },
};
