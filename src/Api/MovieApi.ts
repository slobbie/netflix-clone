const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_API_KEY = process.env.REACT_APP_API_KEY;

export const getMovies = () => {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${MOVIE_API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());
};

export const upcomingMovie = () => {
  return fetch(
    `${BASE_URL}/movie/upcoming?api_key=${MOVIE_API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
};

export const topMovies = () => {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${MOVIE_API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
};

export const getMovieDetail = (movieId: string) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=ko-KR`
  ).then((response) => response.json());
};

export function similarMovie(movieId: string) {
  return fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${MOVIE_API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
export function similarTv(tvId: string) {
  return fetch(
    `${BASE_URL}/tv/${tvId}/similar?api_key=${MOVIE_API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export const getMoviesTrailer = (movieId?: string) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}`
  ).then((response) => response.json());
};
