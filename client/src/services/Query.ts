import axios, { AxiosRequestConfig } from "axios";

export interface IApiResponse<T = {}> {
  body: {
    data: T;
    error?: any;
  };
  ok: boolean;
  statusCode: number;
}

class Query {
  public get = <T = any>(url: string) => {
    return this.fetch<T>({ url });
  }

  public post = <T = any>(url: string, data: object) => {
    return this.fetch<T>({
      url,
      method: "POST",
      data,
    });
  }

  public put = <T = any>(url: string, data: object) => {
    return this.fetch<T>({
      url,
      method: "PUT",
      data,
    });
  }

  public delete = <T = any>(url: string) => {
    return this.fetch<T>({
      url,
      method: "DELETE",
    });
  }

  private fetch<T>(options: AxiosRequestConfig): Promise<T> {
    return axios(options)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export const query = new Query();
