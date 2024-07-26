import styles from './Paginations.module.scss';
import ReactPaginate from 'react-paginate';
const Pagination = ({ page, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={page - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
