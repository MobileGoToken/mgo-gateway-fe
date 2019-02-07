import axios from 'axios';
import { cacheAdapterEnhancer, Cache } from 'axios-extensions';

type HttpOpts = {
  baseURL?: string,
  retryRequests?: boolean,
  retryCount?: number,
  cacheAge?: number,
  timeout?: number,
};

const DEFAULT_CONFIG: HttpOpts = {
  timeout: 60 * 1000,
  responseType: 'json',
  retryRequests: true,
  cacheAge: 0,
  retryCount: 2,
};

const parseArgs = args => {
  let [url, data, opts] = args;

  if (typeof args[0] !== 'string') {
    /* eslint-disable */
    let d = args[0];
    url = d.url;
    data = d.data;
    opts = d.opts;
    /* eslint-enable */
  }

  return { url, data, opts };
};

class Http {
  http: axios;
  token: string = '';

  config: HttpOpts;

  constructor(opts: HttpOpts = {}) {
    this.config = Object.assign({}, DEFAULT_CONFIG, opts);

    this.http = axios.create({
      baseURL: '/',
      timeout: this.config.timeout,
      // headers: { 'Cache-Control': 'no-cache' },
    });

    this.addInterceptors();
  }

  addInterceptors() {
    this.responseInterceptors();
  }

  responseInterceptors() {
    this.http.interceptors.response.use(
      response => response,
      error => {
        if (
          error.config &&
          error.response &&
          error.response.status >= 500 &&
          this.config.retryRequests
        ) {
          /*eslint-disable */

          if (
            !error.config.__retryCount ||
            error.config.__retryCount < this.config.retryCount
          ) {
            error.config.__isRetryRequest = true;
            error.config.__retryCount = error.config.__retryCount
              ? error.config.__retryCount + 1
              : 1;

            console.log('[HTTP] Retrying request');
            /* eslint-enable */

            return this.request(error.config);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  /**
   * Proxy methods for this.request
   * Every method accaptes URL, DATA, OPTS and can be called in 2 ways:
   *
   * Http.get(MY_URL)
   * Http.get(MY_URL, {firstName: Casidy, lastName: Blagojevic }, {cache: true});
   * Http.get({
   *  url: MY_URL,
   *  data: { firstName: Casidy, lastName: Blagojevic },
   *  opts: { cache: true }
   * }):
   *
   */

  get(...args) {
    const { url, data, opts } = parseArgs(args);

    return this.request('GET', url, data, opts);
  }

  post(...args) {
    const { url, data, opts } = parseArgs(args);

    return this.request('POST', url, data, opts);
  }

  put(...args) {
    const { url, data, opts } = parseArgs(args);

    return this.request('PUT', url, data, opts);
  }

  delete(...args) {
    const { url, data, opts } = parseArgs(args);

    return this.request('DELETE', url, data, opts);
  }

  /**
   *
   * Basic request
   *
   * @param type - If first param is a full axios config then every other param will be ignored and only config will
   * be passed to axios
   *
   * @param url
   * @param data
   * @param opts
   * @returns {Promise<*>}
   */
  async request(
    type: string | Object,
    url: string,
    data?: any = {},
    opts? = {},
  ) {
    try {
      let options = {};

      if (typeof type === 'string') {
        options = {
          method: type.toLowerCase(),
          url,
          ...opts,
        };

        if (options.method === 'get') {
          options.params = data;
        } else {
          options.data = data;
        }
      } else {
        options = type;
      }

      const response = await this.http(options);

      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Add interceptors
   *
   * @param type
   * @param success
   * @param error
   */
  interceptors(
    type: 'request' | 'response',
    success: () => void,
    error: () => void,
  ) {
    // return this.interceptorsMap[type].push({ success, error });

    return this.http.interceptors[type].use(success, error);
  }

  /**
   * Update config
   *
   * @param conf
   * @returns {HttpOpts|Http.config}
   */
  setConfig(conf: HttpOpts) {
    this.config = Object.assign(this.config, conf);

    this.http.defaults.baseURL = this.config.baseURL;
    this.http.defaults.adapter = cacheAdapterEnhancer(
      axios.defaults.adapter,
      false,
      'cache',
      new Cache({ maxAge: this.config.cacheAge }),
    );

    this.http.defaults.timeout = this.config.timeout;

    return this.config;
  }
}

export default new Http();
