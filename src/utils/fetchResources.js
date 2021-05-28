import config from '../config/api';

export const activeRover = ({ name = '', data = null } = {}) => ({
  name,
  data,
  async fetchData(subPath = '', queries = [], page = null) {
    const parsedQuery = queries.join('&');
    let payload;
    try {
      const response = await fetch(`${config.API_BASEPATH}/rovers/${this.name}${subPath}${queries.length ? '?' : ''}${parsedQuery}${page !== null ? `&page=${page}` : ''}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=utf-8' },
      });

      if (response.status !== 200) {
        // console.error(await response.json());
        payload = await response.json();

        throw new Error(payload.error);
      }

      payload = await response.json();
      return payload;
    } catch (error) {
      return { error };
    }
  },
  async setRoverData() {
    try {
      const roverInfo = await this.fetchData();
      if (roverInfo.error) throw roverInfo.error;
      this.data = { ...roverInfo.rover };

      const roverManifest = await this.fetchData('/manifest');
      if (roverInfo.error) throw roverInfo.error;
      this.data = { ...this.data, ...roverManifest };
      return this.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getData(keys = []) {
    if (keys.length) {
      if (this.data) {
        if (!(keys in this.data)) {
          const wrongKeys = keys.filter((key) => !(key in this.data));
          throw new Error(`Missing in data: ${wrongKeys.join(', ')}`);
        }
        const parsedData = keys
          .reduce((selected, key) => (this.data[key]
            ? { ...selected, [key]: this.data[key] } : selected), {});

        if (Object.keys(parsedData).length === 1) return Object.values(parsedData)[0];

        return parsedData;
      }
    }
    return this.data;
  },
});
