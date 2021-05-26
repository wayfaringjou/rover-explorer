import config from '../config/api';

export const activeRover = ({ name = '', data = null } = {}) => ({
  name,
  data,
  async fetchData(queries = [], subPath = '') {
    const parsedQuery = queries.join('&');
    try {
      const response = await fetch(`${config.API_BASEPATH}/rovers/${this.name}${subPath}${queries.length ? '?' : ''}${parsedQuery}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=utf-8' },
      });

      if (response.status !== 200) {
        throw new Error({ status: response.status, error: response.error });
      }
      const payload = await response.json();
      return payload;
    } catch (error) {
      return { error };
    }
  },
  async setRoverData() {
    try {
      const { rover, error } = await this.fetchData();

      if (error) throw error;
      this.data = { ...rover };
      return this.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  displayRoverData(keys = []) {
    if (keys.length) {
      if (this.data) {
        if (!(keys in this.data)) {
          const wrongKeys = keys.filter((key) => !(key in this.data));
          throw new Error(`Missing in data: ${wrongKeys.join(', ')}`);
        }
        return keys
          .reduce((selected, key) => (this.data[key]
            ? { ...selected, [key]: this.data[key] } : selected), {});
      }
    }
    return this.data;
  },
});
