import React from "react";
import "../styles/Pagination.css"; // We will create this file next
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalRows, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Don't render anything if there's only one page or no data
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-controls">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>
      <span className="page-indicator">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
