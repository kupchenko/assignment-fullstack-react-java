import {useEffect, useState} from "react";
import {Comment, Movie} from "../../types";
import {callGet} from "../../api/ApiService.tsx";

export const useMovieData = (movieId: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [movie, setMovie] = useState<Movie>()
  const [comments, setComments] = useState<Array<Comment>>([])
  const fetchData = async () => {
    setLoading(true)
    let [movieResponse, commentsResponse] = await Promise.all([
      callGet(`/movies/${movieId}`),
      callGet(`/movies/${movieId}/comments`)
    ]);
    const movie = await movieResponse.json();
    const commentsBody = await commentsResponse.json();
    setMovie(movie);
    setComments(commentsBody.comments);
    setLoading(false)
  }

  useEffect(() => {
    if (!movieId) return;
    fetchData()
  }, []);

  return {
    loading,
    movie,
    comments,
    fetchData
  }
}