import {List} from "antd";
import {toHowLongAgo} from "../../../util/TimeUtil.ts";
import {Comment} from "../../../types";

type MovieDescriptionProps = {
  comments: Array<Comment>
}

export const MovieComments = ({comments}: MovieDescriptionProps) => {
  return (
    <div className="pt-7">
      <h1 className="text-xl">Comments</h1>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <div className="pt-2 flex flex-row gap-5">
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
    </div>
  )
}