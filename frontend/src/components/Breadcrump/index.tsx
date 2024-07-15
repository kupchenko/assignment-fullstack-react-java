import {Breadcrumb} from "antd";
import React from "react";

type BreadcrumpProps = {
  items: Array<string | React.ReactElement>
}

export const Breadcrump = ({items}: BreadcrumpProps) => {
  return (
    <Breadcrumb
      items={items.map((title) => ({title}))}
    />
  )
}