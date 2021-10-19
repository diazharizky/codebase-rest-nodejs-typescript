import https from 'https'
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { ErrorX } from './error'

class Request {
  serviceName: string;
  client: AxiosInstance;

  constructor(serviceName: string, cfg: AxiosRequestConfig) {
    this.serviceName = serviceName
    this.client = axios.create(cfg)
  }

  async request<T = any>(cfg: AxiosRequestConfig): Promise<[T, ErrorX?]> {
    let err: ErrorX | undefined
    let res: AxiosResponse | undefined
    const agent = new https.Agent({ rejectUnauthorized: false })
    cfg.httpsAgent = agent
    cfg.headers = cfg.headers || {}
    try {
      res = await this.client.request(cfg)
    } catch (e) {
      err = new ErrorX('Unknown error')
      if (isAxiosError(e)) {
        err.message = e.message
        err.serviceName = this.serviceName
        if (e.response) {
          err.code = e.response.status
          if (typeof e.response.data === 'string') {
            err.message = e.response.data
          } else {
            err.data = e.response.data
          }
        } else if (e.request) {
          err.code = 500
          err.message = 'The request was made but no response was received.'
        } else {
          err.code = 500
        }
      }
    }
    return [!res ? null : res.data, err]
  }

  get<T = any>(path: string, cfg?: AxiosRequestConfig) {
    let fixdCfg: AxiosRequestConfig = { method: 'get', url: path }
    fixdCfg = !cfg ? fixdCfg : { ...fixdCfg, ...cfg }
    return this.request<T>(fixdCfg)
  }

  post<T = any>(path: string, data: any, cfg?: AxiosRequestConfig) {
    let fixdCfg: AxiosRequestConfig = { method: 'post', url: path, data }
    fixdCfg = !cfg ? fixdCfg : { ...fixdCfg, ...cfg }
    fixdCfg.headers = fixdCfg.headers || {}
    if (!fixdCfg.headers['Content-Type']) {
      if (typeof data === 'string') {
        fixdCfg.headers = {
          ...fixdCfg.headers,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      } else if (typeof data === 'object') {
        fixdCfg.headers = {
          ...fixdCfg.headers,
          'Content-Type': 'application/json',
        }
      }
    }
    return this.request<T>(fixdCfg)
  }

  put<T = any>(path: string, data: any, cfg?: AxiosRequestConfig) {
    let fixdCfg: AxiosRequestConfig = { method: 'put', url: path, data }
    fixdCfg = !cfg ? fixdCfg : { ...fixdCfg, ...cfg }
    fixdCfg.headers = fixdCfg.headers || {}
    if (!fixdCfg.headers['Content-Type']) {
      if (typeof data === 'string') {
        fixdCfg.headers = {
          ...fixdCfg.headers,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      } else if (typeof data === 'object') {
        fixdCfg.headers = {
          ...fixdCfg.headers,
          'Content-Type': 'application/json',
        }
      }
    }
    return this.request<T>(fixdCfg)
  }

  del<T = any>(path: string, cfg?: AxiosRequestConfig) {
    let fixdCfg: AxiosRequestConfig = { method: 'delete', url: path }
    fixdCfg = !cfg ? fixdCfg : { ...fixdCfg, ...cfg }
    return this.request<T>(fixdCfg)
  }
}

const isAxiosError = (e: unknown): e is AxiosError => {
  return (e as AxiosError).message !== undefined
}

export default Request
