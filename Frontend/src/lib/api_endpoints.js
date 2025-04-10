import axios from "axios";

export const ENDPOINT = {
  // auth
  login: "/auth/login",
  signup: "/auth/signup",
  // logout , user pending
  user: "/user",
  logout: "/auth/logout",
  forgetpassword: "/auth/forgetpassword",
  resetPassword: "/auth/resetPassword",

  //discover
  discoverNowPlaying: "/discover/now-playing",
  discoverTrending: "/discover/trending",
  discoverTopRated: "/discover/top-rated",
  discoverUpcoming: "/discover/upcoming",
  // movies
  fetchActionMovies: `/movies/action`,
  fetchComedyMovies: `/movies/comedy`,
  fetchHorrorMovies: `/movies/horror`,
  fetchRomanceMovies: `/movies/romance`,
  fetchAnimeMovies: `/movies/anime`,

  //tv shows
  fetchActionTvShows: `/tv/action`,
  fetchComedyTvShows: `/tv/comedy`,
  fetchCrimeTvShows: `/tv/crime`,
  fetchDramaTvShows: `/tv/drama`,
  fetchMysteryTvShows: `/tv/mystery`,

  //eextra data
  getMovieDetails: (id) => `/movies/details?id=${id}`,
  getTvShowsDetails: (id) => `/tv/details?id=${id}`,

  //user
  addToWishlist: "/user/wishlist",
  getWishlist: "/user/wishlist",
  deleteFromWishlist: "/user/wishlist",

  //payment
  payment: (planType) => `/payment/order?plan_type=${planType}`,
  updatePremium: "/payment/updatepremium",

  // streaming urls
  fetchAllStreamingVideos: `/videos`,
  fetchStreamingVideo: (id) => `/videos/watch?id=${id}`,
  fetchVideoThumbnail: (id) => `/videos/thumbnail?id=${id}`,
};

export const PosterFetcher = (path) => {
  return "https://image.tmdb.org/t/p/original" + path;

} 

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  // credentials
  withCredentials: true,
});

//By clicking the banner get the id of that banner.
export function getWatchURL(vidId, mediaType, poster_path) {
  const prefix = mediaType === "tv" ? "tv" : "movies";
  return `${prefix}/watch?id=${vidId}&poster_path=${poster_path}`;
}

export const getStreamingVideoThumbanial = (id) => API_BASE_URL + ENDPOINT.fetchVideoThumbnail(id);



