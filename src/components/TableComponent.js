import React from "react";
import { Table, Tag } from "antd";
const TableComponent = ({ posts }) => {
  const colors = ["gold", "cyan", "lime"];
  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>Title</div>,
      dataIndex: "title",
      className: "column",
      key: "title",
    },
    {
      title: <div style={{ textAlign: "center" }}>Body</div>,
      dataIndex: "body",
      className: "column",
      key: "body",
    },
    {
      title: <div style={{ textAlign: "center" }}>Tags</div>,
      dataIndex: "tags",
      className: "column",
      key: "tags",
      width: "15%",
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag
              color={colors[Math.floor(Math.random() * colors.length)]}
              key={tag}
            >
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        style={{ "margin-top": "2rem" }}
        columns={columns}
        dataSource={posts}
        pagination={false}
        size="small"
        className="table"
      />
    </div>
  );
};

export default TableComponent;
