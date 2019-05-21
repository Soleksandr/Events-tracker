export const asyncCall = <T>(promise: Promise<T>) =>
  promise
    .then(data => ({ data, error: null }))
    .catch(error => ({ error, data: null }));