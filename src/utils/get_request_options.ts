export const getRequestOptions = (url: string) => ({
  method: 'GET',
  url: url,
  headers: {
    Origin: 'https://ticktick.com'
  }
});
