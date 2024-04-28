import React, { useContext } from "react";
import { Input, Row, Col } from "antd";
import { Context } from "../context/context";

const { Search } = Input;

const SearchBar = () => {
  const { handleSearchChange, searchQuery } = useContext(Context);

  return (
    <Row justify="start">
      <Col xs={20} sm={24} md={16} lg={12} xl={10}>
        <Search
          placeholder="Search posts"
          onChange={handleSearchChange}
          style={{ marginBottom: 16 }}
          value={searchQuery}
        />
      </Col>
    </Row>
  );
};

export default SearchBar;
