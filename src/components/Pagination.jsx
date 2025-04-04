import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updatePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
    onPageChange(pageNumber);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generatePageItems = () => {
    const elements = [];
    const visibleCount = 5;
    let start = Math.max(1, currentPage - Math.floor(visibleCount / 2));
    let end = Math.min(totalPages, start + visibleCount - 1);

    if (end - start + 1 < visibleCount) {
      start = Math.max(1, end - visibleCount + 1);
    }

    // First and Previous
    elements.push(
      <BootstrapPagination.First
        key="first"
        disabled={currentPage === 1}
        onClick={() => updatePage(1)}
      />
    );

    elements.push(
      <BootstrapPagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => updatePage(currentPage - 1)}
      />
    );

    // Left Ellipsis
    if (start > 1) {
      elements.push(<BootstrapPagination.Ellipsis key="left-ellipsis" disabled />);
    }

    // Numbered Buttons
    for (let i = start; i <= end; i++) {
      elements.push(
        <BootstrapPagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => updatePage(i)}
        >
          {i}
        </BootstrapPagination.Item>
      );
    }

    // Right Ellipsis
    if (end < totalPages) {
      elements.push(<BootstrapPagination.Ellipsis key="right-ellipsis" disabled />);
    }

    // Next and Last
    elements.push(
      <BootstrapPagination.Next
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => updatePage(currentPage + 1)}
      />
    );

    elements.push(
      <BootstrapPagination.Last
        key="last"
        disabled={currentPage === totalPages}
        onClick={() => updatePage(totalPages)}
      />
    );

    return elements;
  };

  return (
    <div className="pagination-container">
      <BootstrapPagination>{generatePageItems()}</BootstrapPagination>
    </div>
  );
};

export default Pagination;
