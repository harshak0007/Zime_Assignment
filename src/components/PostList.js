import React, { Fragment, useContext, useState } from "react";
import PaginationComponent from "./PaginationComponent"; // Import PaginationComponent
import TableComponent from "./TableComponent";
import { Context } from "../context/context";
import TagFilter from "./TagFilter";
import SearchBar from "./SearchBar";

const PostList = () => {
  const { title, posts } = useContext(Context);

  return (
    <div>
      <div className="filter-section border rounded-lg px-4 py-2 mt-2 w-[75%] min-w-[50%] mx-auto ">
        <h3 className="font-bold mb-2">Filter by:</h3>
        <div className="filter_content">
          <SearchBar></SearchBar>
          <TagFilter></TagFilter>
        </div>
      </div>
      <TableComponent posts={posts} />
      <PaginationComponent />{" "}
    </div>
  );
};

export default PostList;
