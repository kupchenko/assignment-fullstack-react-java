import {useMoviesPageData} from "./useMoviesPageData.ts";
import {useState} from "react";
import {Breadcrumb, Divider, List, Skeleton, Spin} from "antd";
import {LoadingOutlined, StarFilled} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useNavigate} from "react-router-dom";

export const MoviesPage = () => {
  const [page, setPage] = useState<number>(0);
  const {loading, movies, totalMovies} = useMoviesPageData(page);
  const navigate = useNavigate();

  if (loading) {
    return <Spin className="mx-auto" indicator={<LoadingOutlined spin/>} size="large"/>
  }

  if (movies.length === 0 || totalMovies === 0) {
    return <>No movies in the library.</>
  }

  return (
    <div>
      <div>
        <Breadcrumb
          items={[
            {
              title: 'Top 250',
            },
          ]}
        />
      </div>
      <div
        id="scrollableDiv"
        className="pt-5 h-full overflow-auto"
      >
        <InfiniteScroll
          dataLength={totalMovies}
          next={() => setPage((prevState) => prevState + 1)}
          hasMore={movies.length < totalMovies}
          loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          height="calc(100vh - 300px)"
        >
          <List
            dataSource={movies}
            renderItem={(movie, index) => (
              <List.Item
                key={movie.id}
                className="bg-white mb-3 rounded-xl cursor-pointer"
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <List.Item.Meta
                  avatar={<img className="h-[70px] w-[50px]" src={movie.imageUrl}/>}
                  title={`${index + 1}. ${movie.name}`}
                  description={<div>
                    <div>
                      {movie.year} - {movie.duration}
                    </div>
                    <div>
                      {movie.rating}<StarFilled className="text-yellow-400"/>
                    </div>
                  </div>}
                  className="ml-5"
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>

    </div>
  )
}