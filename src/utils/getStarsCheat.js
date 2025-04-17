export const getStars = (comments) => {
  if (comments.length === 0) return 0;
  const stars = comments.map((e) => e.stars);
  const count = stars.reduce((prev, ne) => {
    return prev + ne;
  }, 0);
  return count / comments.length;
};
