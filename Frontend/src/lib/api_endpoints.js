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

  //payment
  payment: "/payment/",
  updatePremium: "/payment/update-premium-access",

  // streaming urls
  fetchAllStreamingVideos: `/video`,
  fetchStreamingVideo: (id) => `/video?id=${id}`,
};


export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});
export async function getBannerData() {
  const res = await api.get(ENDPOINT.discoverNowPlaying);
  const data = res?.data?.response?.results;
  return data;
}


