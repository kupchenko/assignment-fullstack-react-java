import {useMovieData} from "./useMoviesPageData.ts";
import {useParams} from "react-router-dom";
import {Spinner} from "../../components/Spinner/intex.tsx";
import {CommentInput} from "../../components/CommentInput";
import {Breadcrump} from "../../components/Breadcrump";
import {MovieDescription} from "./MovieDescription";
import {MovieComments} from "./MovieComments";
import {callPost} from "../../api/ApiService.tsx";

export const MovieDetails = () => {
  const {movieId} = useParams();
  const {movie, loading, comments, fetchData} = useMovieData(movieId);
  if (loading || !movie) {
    return <Spinner/>
  }

  async function postComment(content: string) {
    const body = {
      content
    }
    await callPost(`/movies/${movieId}/comments`, body);
    await fetchData();
  }

  return (
    <>
      <Breadcrump items={[<a href="/movies">Top 250</a>, movie.name]}/>
      <MovieDescription movie={movie}/>
      <MovieComments comments={comments}/>
      <CommentInput onSubmitComment={postComment}/>
    </>
  )
}