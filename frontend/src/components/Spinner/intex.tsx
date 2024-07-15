import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

export const Spinner = () => {
  return (
    <div className="w-full text-center">
      <Spin indicator={<LoadingOutlined spin/>} size="large"/>
    </div>
  )
}