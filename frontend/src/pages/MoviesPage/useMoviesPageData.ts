import {useEffect, useState} from "react";
import {Movie} from "../../types";

export const useMoviesPageData = (page: number = 0) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [movies, setMovies] = useState<Array<Movie>>([])
  const [totalMovies, setTotalMovies] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    console.log('Loading...', page)
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/movies?page=${page}`)
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