import React, { useContext } from "react";
import { Pagination } from "antd";
import { Context } from "../context/context";

const PaginationComponent = () => {
  const { totalItems, pageSize, handlePageChange, currentPage } =
    useContext(Context);
  return (
    <Pagination
      total={totalItems}
      pageSize={pageSize}
      onChange={handlePageChange}
      current={currentPage}
      className="pagination"
    />
  );
};

export default PaginationComponent;
