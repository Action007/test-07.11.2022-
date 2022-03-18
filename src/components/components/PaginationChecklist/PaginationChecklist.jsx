import React from "react";
import { Pagination } from "react-bootstrap";
import "./PaginationChecklist.scss";

const PaginationChecklist = ({ paginate = {} }) => {
  const { next_page, prev_page } = paginate;

  return (
    <Pagination className="SFPro-700">
      <Pagination.Prev
        className={`paginate__arrow${prev_page ? "" : "stop"}`}
      />
      <Pagination.Item active>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item>{9}</Pagination.Item>
      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Next
        className={`paginate__arrow${next_page ? "" : "stop"}`}
      />
    </Pagination>
  );
};

export default PaginationChecklist;
