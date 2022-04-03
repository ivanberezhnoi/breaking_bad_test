import { reactive, readonly } from 'vue';
import { episodesAPI, charactersAPI, quotesAPI, deathsAPI } from '../services';

const state = reactive({
  episodes: [],
  errors: [],
  isLoading: false,
  characters: [],
  quotes: {},
  deaths: [],
  favoritesCharacters: [],
});

const actions = {
  async getAllEpisods() {
    try {
      mutations.setIsLoading(true);
      const { data } = await episodesAPI.getAllEpisodes();
      mutations.setEpisods(data);
      mutations.setIsLoading(false);
    } catch (error) {
      mutations.setError({ error, message: 'Error fetching episodes' });
    }
  },
  async getEpisodeById(id) {
    try {
      mutations.setIsLoading(true);
      const { data } = await episodesAPI.getEpisodeById(id);
      mutations.setIsLoading(false);
      return data[0];
    } catch (error) {
      mutations.setError({ error, message: 'Error fetching episode' });
    }
    return null;
  },
  async getCharactersByNames(names) {
    const savedChars = names.map(name => state.characters.find(char => char.name === name)).filter(Boolean);
    if (savedChars.length === names.length) return savedChars;

    const charsToRequest = names.filter(name => !savedChars.find(char => char.name === name));

    try {
      mutations.setIsLoading(true);
      const result = charsToRequest.map(name => {
        return charactersAPI.getCharactersByName(name);
      });
      await Promise.all(result).then(response => {
        const chars = response.map(res => res.data[0]).filter(Boolean);
        mutations.addCharacters(chars);
        mutations.setIsLoading(false);
        return chars;
      });
    } catch (error) {
      mutations.setError({ error, message: 'Error searching characters' });
    }
    return null;
  },
  async getCharactersById(id) {
    try {
      mutations.setIsLoading(true);
      const { data } = await charactersAPI.getCharactersById(id);
      mutations.addCharacters(data);
      mutations.setIsLoading(false);
    } catch (error) {
      mutations.setError({ error, message: 'Error fetching character' });
    }
  },
  async getQuotesByAuthor(author, id) {
    try {
      mutations.setIsLoading(true);
      const { data } = await quotesAPI.getQuotesByAuthor(author);
      const result = data.map(({ quote_id, quote }) => ({ quote_id, quote }));
      mutations.setQuotes(id, result);
      mutations.setIsLoading(false);
    } catch (error) {
      mutations.setError({ error, message: 'Error fetching quotes' });
    }
  },
  async getAllDeaths() {
    try {
      mutations.setIsLoading(true);
      const { data } = await deathsAPI.getAllDeaths();
      mutations.setDeaths(data);
      mutations.setIsLoading(false);
    } catch (error) {
      mutations.setError({ error, message: 'Error fetching deaths' });
    }
  },
};

const mutations = {
  setEpisods(episodes) {
    state.episodes = episodes;
  },
  setError(error) {
    state.errors.push(error);
  },
  clearErrors() {
    state.errors = [];
  },
  setIsLoading(status) {
    state.isLoading = status;
  },
  setCharacters(characters) {
    state.characters = characters;
  },
  addCharacters(characters) {
    state.characters.push(...characters);
  },
  setQuotes(author, quotes) {
    state.quotes[author] = quotes;
  },
  setDeaths(deaths) {
    state.deaths = deaths;
  },
  setFavoriteCharacters(ids) {
    state.favoritesCharacters = ids;
  },
  toggleFavorites(characterId) {
    const char = state.favoritesCharacters.find(char_id => char_id === characterId);
    if (char) {
      this.setFavoriteCharacters(state.favoritesCharacters.filter(char_id => char_id !== characterId));
    } else {
      state.favoritesCharacters.push(characterId);
    }
    localStorage.setItem('favorites', JSON.stringify(state.favoritesCharacters));
  },
};

const getters = {
  conutOfSeasons() {
    if (!state.episodes.length) return 0;
    return +state.episodes[state.episodes.length - 1].season;
  },
  getEpisodeById(id) {
    return state.episodes.find(episode => +episode.episode_id === +id);
  },
  getDetaledCharactersInfo(charactersNames) {
    return charactersNames.map(name => state.characters.find(character => character.name === name)).filter(Boolean);
  },
  getCharactersById(id) {
    return state.characters.find(character => +character.char_id === +id);
  },
  getQuotesByAuthorId(id) {
    return state.quotes[id];
  },
  getResponsibleInDeathsByName(name) {
    return state.deaths.filter(death => death.responsible === name);
  },
  getFavoriteCharacters() {
    console.log(state.favoritesCharacters.map(id => state.characters.find(character => +character.char_id === +id)).filter(Boolean))
    return state.favoritesCharacters.map(id => state.characters.find(character => +character.char_id === +id)).filter(Boolean);
  },
};

export default {
  state: readonly(state),
  mutations,
  actions,
  getters,
};
