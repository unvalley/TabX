import * as React from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  pageLength: number
  handlePageClick: (selectedItem: { selected: number }) => void
  initialPage: number
}
export const Pagination: React.FC<Props> = ({ pageLength, handlePageClick, initialPage }) => {
  return (
    <ReactPaginate
      previousLabel={'前へ'}
      nextLabel={'次へ'}
      breakLabel={'...'}
      pageCount={pageLength}
      initialPage={initialPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'bg-dark'}
      activeLinkClassName={'text-white'}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      nextClassName="page-item"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      disabledClassName="disabled"
      breakClassName="page-item"
      breakLinkClassName="page-link"
    />
  )
}
