import React, { useContext } from "react";
import { Select, Tag, Row, Col } from "antd";
import { Context } from "../context/context";
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const colors = ["gold", "cyan", "lime"];
  return (
    <Tag
      color={colors[Math.floor(Math.random() * 3)]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
      }}
    >
      {label}
    </Tag>
  );
};
const TagFilter = () => {
  const { posts, handleTagFilter, selectedTags } = useContext(Context);
  const tagsArr = new Set();
  const allTags = () => {
    posts.forEach((post) => {
      post.tags.map((tag) => tagsArr.add(tag));
    });
  };
  let arr = [];
  const func = () => {
    [...tagsArr]?.map((tag) => {
      arr.push({ value: tag });
    });
  };
  allTags();
  func();

  return (
    <Row justify="start">
      <Col xs={20} sm={24} md={16} lg={12} xl={10}>
        <div className="h-min">
          <Select
            className="select-tag"
            mode="multiple"
            tagRender={tagRender}
            style={{
              width: "20rem",
            }}
            placeholder="Filter by tags"
            options={arr}
            onChange={handleTagFilter}
            value={selectedTags}
          />
        </div>
      </Col>
    </Row>
  );
};

export default TagFilter;
