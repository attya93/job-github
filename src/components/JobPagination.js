import React from 'react'
import { Pagination } from 'react-bootstrap';

const JobPagination = ({ page, setPage, hasNextPage }) => {

    const adjustPage = (amount) => {
        setPage(prePage => prePage + amount);
    }
    return (
        <Pagination>
            {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
            {page > 2 && <Pagination.Item>{page - 1}</Pagination.Item>}
            {page > 2 && <Pagination.Ellipsis />}
            <Pagination.Item active>{page}</Pagination.Item>
            {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}
            {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
        </Pagination>
    )
}

export default JobPagination
