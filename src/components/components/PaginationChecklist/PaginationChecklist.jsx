import React from "react";
import { Pagination } from "react-bootstrap";
import "./PaginationChecklist.scss";

const PaginationChecklist = () => {
  return (
    <Pagination className="SFPro-700">
      <Pagination.Prev />
      <Pagination.Item active>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item>{9}</Pagination.Item>
      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
};

export default PaginationChecklist;
