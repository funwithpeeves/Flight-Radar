import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux'

const List = ({ setDetailId }) => {
  const { flights } = useSelector((store) => store.flightReducer);

  const [startOffset, setStartOffset] = useState(0);

  const perPage = 10;

  const endOffset = startOffset + perPage;

  const currentFlights = flights.slice(startOffset, endOffset);

  const handlePageClick = (event) => {
    setStartOffset(event.selected * perPage);
  }

  const total = Math.ceil(flights.length / perPage);

  return (
    <div className='p-3 p-md-4'>
      <table className='table table-dark table-striped table-hover table-responsive mt-5'>
        <thead>
          <tr>
            <th>id</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentFlights.map((flight) => (
            <tr>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={() => setDetailId(flight.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        className="pagination"
        activeClassName="active"
        breakLabel="..."
        nextLabel="ileri >"
        previousLabel="< geri"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={total}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default List