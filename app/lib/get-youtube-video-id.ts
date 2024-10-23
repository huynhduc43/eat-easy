export const getYouTubeVideoId = (url: string) => {
  const regex = /[?&]v=([^&#]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
