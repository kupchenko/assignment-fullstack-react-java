import InfiniteScroll from "react-infinite-scroll-component";
import {Divider, List, Skeleton} from "antd";
import {StarFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {Movie} from "../../types";

type InfiniteScrollListProps = {
  items: Array<any>
  totalItems: number
  onLoadMore: () => void
}

function getDescription(item: Movie) {
  return <div>
    <div>
      {item.year} - {item.duration}
    </div>
    <div>
      {item.rating}<StarFilled className="text-yellow-400"/>
    </div>
  </div>;
}

export const InfiniteScrollList = ({items, totalItems, onLoadMore}: InfiniteScrollListProps) => {
  const navigate = useNavigate();
  return (
    <div
      id="scrollableDiv"
      className="pt-5 h-full overflow-auto"
    >
      <InfiniteScroll
        dataLength={items.length}
        next={onLoadMore}
        hasMore={items.length < totalItems}
        loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        height="calc(100vh - 100px)"
      >
        <List
          dataSource={items}
          renderItem={(item, index) => (
            <List.Item
              key={item.id}
              className="bg-white mb-3 rounded-xl cursor-pointer"
              onClick={() => navigate(`/movies/${item.id}`)}
            >
              <List.Item.Meta
                avatar={<img alt="Item url" className="h-[70px] w-[50px]" src={item.imageUrl}/>}
                title={`${index + 1}. ${item.name}`}
                description={getDescription(item)}
                className="ml-5"
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>

  )
}