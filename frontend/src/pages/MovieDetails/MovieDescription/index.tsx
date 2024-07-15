import {StarFilled} from "@ant-design/icons";
import {Movie} from "../../../types";

type MovieDescriptionProps = {
  movie: Movie
}

export const MovieDescription = ({movie}: MovieDescriptionProps) => {
  return (
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
  )
}