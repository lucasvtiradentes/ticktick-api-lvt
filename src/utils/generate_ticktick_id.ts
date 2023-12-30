export const generateTicktickId = () => {
  const characters = '0123456789qwertyuiopasdfghjklzxcvbnm';
  return Array.from({ length: 24 }).reduce((id) => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return id + characters[randomIndex];
  }, '');
};
