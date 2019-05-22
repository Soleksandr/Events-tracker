class Persister {
  public persistData (key: string, data: any) {
    localStorage.setItem(key, data);
  }

  public removeData (key: string) {
    localStorage.removeItem(key);
  }

  public getData (key: string) {
    return localStorage.getItem(key);
  }
}

export default new Persister();