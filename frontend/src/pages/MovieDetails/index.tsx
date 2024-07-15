import {useMovieData} from "./useMoviesPageData.ts";
import {useParams} from "react-router-dom";
import {Breadcrumb, List, Spin} from "antd";
import {LoadingOutlined, StarFilled} from "@ant-design/icons";
import {toHowLongAgo} from "../../util/TimeUril.ts";
import {CommentInput} from "./commentInput.tsx";

export const MovieDetails = () => {
  const {movieId} = useParams();
  const {movie, loading, comments, fetchData} = useMovieData(movieId);
  if (loading || !movie) {
    return <Spin className="mx-auto" indicator={<LoadingOutlined spin/>} size="large"/>
  }

  async function postComment(content: string) {
    const body = {
      content
    }
    await fetch(`http://localhost:8080/movies/${movieId}/comments`, {
      headers: {
        ['Content-Type']: 'application/json',
      },
      body: JSON.stringify(body),
      method: 'POST',
    });
    await fetchData();
  }

  return (
    <div>
      <div>
        <Breadcrumb
          items={[
            {
              title: <a href="/movies">Top 250</a>,
            },
            {
              title: movie.name,
            },
          ]}
        />
      </div>
      <div
        className="mt-4 h-[450px] bg-white p-10 rounded flex flex-row gap-5 border-gray-200 border-[1px] border-solid">
        <img alt="Movie logo" src={movie.imageUrl} className="h-[380px]"/>
        <div>
          <div className="text-[30px]">{movie.name}</div>
          <div className="text-gray-500 pt-2">{movie.description}</div>
          <div className="pt-4">
            Directors
            <div className="pt-1 text-gray-500">
              {movie.directors}
            </div>
          </div>
          <div className="pt-2">
            Genre
            <div className="pt-1 text-gray-500">
              {movie.genres}
            </div>
          </div>
          <div className="pt-2">
            Top actors
            <div className="pt-1 text-gray-500">
              {movie.actors}
            </div>
          </div>
          <div className="pt-10 flex flex-row gap-10">
            <div>
              Year
              <div className="text-gray-500">
                {movie.year}
              </div>
            </div>
            <div>
              Duration
              <div className="text-gray-500">
                {movie.duration}
              </div>
            </div>
            <div>
              Rating
              <div className="text-gray-500">
                <StarFilled className="text-yellow-400 pr-2"/>{movie.rating}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-7">
        <h1 className="text-xl">Comments</h1>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment) => (
            <div className="pt-5 flex flex-row gap-5">
              <img alt="User avatar" src={comment.userAvatarUrl} className="h-[50px] rounded-[100%]"/>
              <div className="bg-white p-3 rounded-xl w-full border-solid border-[1px] border-gray-200">
                <div className="text-xl flex flex-row">
                  {comment.userName}
                  <div className="ml-auto text-sm">
                    {toHowLongAgo(comment.timestamp)} ago
                  </div>
                </div>
                <div className="pt-5 text-gray-400">{comment.content}</div>
              </div>
            </div>
          )}
        />
        <div className="w-full pt-5">
          <CommentInput
            onSubmitComment={postComment}
          />
        </div>
      </div>
    </div>
  )
}