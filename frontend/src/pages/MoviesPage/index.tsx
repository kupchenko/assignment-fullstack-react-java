import {useMoviesPageData} from "./useMoviesPageData.ts";
import {useState} from "react";
import {Spinner} from "../../components/Spinner/intex.tsx";
import {InfiniteScrollList} from "../../components/InfiniteScrollList";
import {Breadcrump} from "../../components/Breadcrump";

export const MoviesPage = () => {
  const [page, setPage] = useState<number>(0);
  const {loading, movies, totalMovies} = useMoviesPageData(page);

  if (loading) {
    return <Spinner/>
  }

  if (movies.length === 0 || totalMovies === 0) {
    return <>No movies in the library.</>
  }

  return (
    <>
      <Breadcrump items={['Top 250']}/>
      <InfiniteScrollList
        items={movies}
        totalItems={totalMovies}
        onLoadMore={() => setPage((prevState) => prevState + 1)}
      />
    </>
  )
}