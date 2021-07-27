import https from 'https'
import * as axios from 'axios'

class RequestError extends Error {
  code: number | undefined;

  constructor(message: string, code?: number) {
    super(message)
    this.code = code
  }
}

// tslint:disable-next-line: max-classes-per-file
class Request {
  serviceName: string;
  client: axios.AxiosInstance;

  constructor(serviceName: string, conf: axios.AxiosRequestConfig) {
    this.serviceName = serviceName
    this.client = axios.default.create(conf)
  }

  async request(conf: axios.AxiosRequestConfig) {
    const agent = new https.Agent({ rejectUnauthorized: false })
    conf.httpsAgent = agent
    conf.headers = conf.headers || {}
    let err: RequestError | undefined
    let res: axios.AxiosResponse | undefined
    try {
      res = await this.client.request(conf)
    } catch (e) {
      err = new RequestError(e)
      if (e.response) {
        err.code = e.response.status
        err.message = e.response.data
      } else if (e.request) {
        err.code = 500
        err.message = 'The request was made but no response was received'
      } else {
        err.code = 500
      }
    }
    return [!res ? null : res.data, err]
  }

  get(path: string, conf?: axios.AxiosRequestConfig) {
    let finalConf: axios.AxiosRequestConfig = { method: 'GET', url: path }
    finalConf = !conf ? finalConf : { ...finalConf, ...conf }
    return this.request(finalConf)
  }

  post<T>(
    path: string,
    payload: JSON | string | T,
    conf?: axios.AxiosRequestConfig
  ) {
    let finalConf: axios.AxiosRequestConfig = {
      method: 'POST',
      url: path,
      data: payload,
    }
    finalConf = !conf ? finalConf : { ...finalConf, ...conf }
    finalConf.headers = finalConf.headers || {}
    if (!finalConf.headers['Content-Type']) {
      if (typeof payload === 'string') {
        finalConf.headers = {
          ...finalConf.headers,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      } else if (typeof payload === 'object') {
        finalConf.headers = {
          ...finalConf.headers,
          'Content-Type': 'application/json',
        }
      }
    }
    return this.request(finalConf)
  }

  put<T>(
    path: string,
    payload: JSON | string | T,
    conf?: axios.AxiosRequestConfig
  ) {
    let finalConf: axios.AxiosRequestConfig = {
      method: 'PUT',
      url: path,
      data: payload,
    }
    finalConf = !conf ? finalConf : { ...finalConf, ...conf }
    finalConf.headers = finalConf.headers || {}
    if (!finalConf.headers['Content-Type']) {
      if (typeof payload === 'string') {
        finalConf.headers = {
          ...finalConf.headers,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      } else if (typeof payload === 'object') {
        finalConf.headers = {
          ...finalConf.headers,
          'Content-Type': 'application/json',
        }
      }
    }
    return this.request(finalConf)
  }

  del(path: string, conf?: axios.AxiosRequestConfig) {
    let finalConf: axios.AxiosRequestConfig = { method: 'DELETE', url: path }
    finalConf = !conf ? finalConf : { ...finalConf, ...conf }
    return this.request(finalConf)
  }
}

export default Request
