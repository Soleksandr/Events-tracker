class Persister {
  public persistData (key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeData (key: string) {
    localStorage.removeItem(key);
  }

  public getData (key: string) {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(key));
  }
}

export default new Persister();