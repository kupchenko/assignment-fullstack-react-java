import {Outlet} from 'react-router-dom';
import {Button} from "antd";
import {SunOutlined} from "@ant-design/icons";

export const DefaultTemplate = () => (
  <>
    <div className="bg-white h-[50px] w-full">
      <div className="max-w-[60%] h-full mx-auto flex flex-row items-center">
        <img alt="Logo text" src="/logo.svg" className="h-[40px]"/>
        <Button className="ml-auto" icon={<SunOutlined />}>Toggle theme</Button>
      </div>
    </div>
    <div className="pt-5 max-w-[60%] mx-auto pb-[100px]">
      <Outlet/>
    </div>
  </>
);
