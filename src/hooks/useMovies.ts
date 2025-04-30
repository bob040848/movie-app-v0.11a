import useSWR from "swr";
import {
  getPopularMovies,
  getTrendingMovies,
  searchMovies,
  getMoviesByGenre,
  getMovieDetails,
  getMovieVideos,
} from "@/lib/api";

const fetcher = (url: string, ...args: any[]) => {
  if (url.includes("popular")) {
    return getPopularMovies(args[0]);
  }
  if (url.includes("trending")) {
    return getTrendingMovies(args[0]);
  }
  if (url.includes("search")) {
    return searchMovies(args[0], args[1]);
  }
  if (url.includes("genre")) {
    return getMoviesByGenre(args[0], args[1]);
  }
  if (url.includes("movie/")) {
    return getMovieDetails(args[0]);
  }
  if (url.includes("trending")) {
    return getMovieVideos;
  }
  return Promise.reject(new Error("Invalid URL"));
};

export function usePopularMovies(page = 1) {
  const { data, error, isLoading } = useSWR(`/movie/popular/${page}`, () =>
    getPopularMovies(page)
  );

  return {
    movies: data?.results,
    totalPages: data?.total_pages,
    isLoading,
    isError: error,
  };
}

export function useTrendingMovies(timeWindow = "day") {
  const { data, error, isLoading } = useSWR(
    `/trending/movie/${timeWindow}`,
    () => getTrendingMovies(timeWindow)
  );

  return {
    movies: data?.results,
    isLoading,
    isError: error,
  };
}

export function useMovieSearch(query: string, page = 1) {
  const { data, error, isLoading } = useSWR(
    query ? `/search/movie/${query}/${page}` : null,
    () => searchMovies(query, page)
  );

  return {
    movies: data?.results,
    totalPages: data?.total_pages,
    isLoading,
    isError: error,
  };
}

export function useMoviesByGenre(genreId: number, page = 1) {
  const { data, error, isLoading } = useSWR(
    genreId ? `/genre/${genreId}/${page}` : null,
    () => getMoviesByGenre(genreId, page)
  );

  return {
    movies: data?.results,
    totalPages: data?.total_pages,
    isLoading,
    isError: error,
  };
}

export function useMovieDetails(movieId: number) {
  const { data, error, isLoading } = useSWR(
    movieId ? `/movie/${movieId}` : null,
    () => getMovieDetails(movieId)
  );

  return {
    movie: data,
    isLoading,
    isError: error,
  };
}

export function useMovieVideos(movieId: number) {
  const { data, error, isLoading } = useSWR(
    movieId ? `/movie/${movieId}/videos` : null,
    () => getMovieVideos(movieId)
  );

  return {
    videos: data?.results,
    isLoading,
    isError: error,
  };
}
