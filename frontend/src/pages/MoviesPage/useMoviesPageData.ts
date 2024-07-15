import {useEffect, useState} from "react";
import {Movie} from "../../types";
import {callGet} from "../../api/ApiService.tsx";

export const useMoviesPageData = (page: number = 0) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [movies, setMovies] = useState<Array<Movie>>([])
  const [totalMovies, setTotalMovies] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const response = await callGet(`/movies?page=${page}`)
      const body = await response.json();
      setMovies((prevMovies) => {
        const uniqueObjects: any = {};
        prevMovies.forEach((movie: Movie) => {
          uniqueObjects[movie.id] = movie;
        });
        body.movies.forEach((movie: Movie) => {
          uniqueObjects[movie.id] = movie;
        });
        return Object.values(uniqueObjects);
      });
      setTotalMovies(body.totalMovies);
      setLoading(false)
    }

    fetchData()
  }, [page]);

  return {
    loading,
    movies,
    totalMovies
  }
}