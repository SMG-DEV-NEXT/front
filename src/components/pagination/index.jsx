"use client";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import Icon from "../Icons";

const Pagination = ({ itemsPerPage, onPageChange, current = 1 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // This runs only on the client
  }, []);

  const [currentPage, setCurrentPage] = useState(current);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    const startIndex = selected * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
    onPageChange(paginatedItems);
  };

  if (!mounted) return null;
  return (
    <div className="flex justify-center mt-6">
      <ReactPaginate
        previousLabel={<Icon name="arrowLeftP" />}
        nextLabel={<Icon name="arrowRightP" />}
        breakLabel={<span className="px-1 py-1 text-primary10">...</span>}
        pageCount={itemsPerPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={"flex space-x-1 gap-1"}
        pageClassName={
          "w-[20px] h-[20px] text-sm font-medium text-linkColor flex items-center justify-center rounded-[6px]"
        }
        activeClassName={"bg-primary text-primary10"}
        previousClassName={"cursor-pointer"}
        nextClassName={"cursor-pointer"}
        breakClassName={"cursor-default"}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
