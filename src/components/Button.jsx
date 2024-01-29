import React from 'react'

const Buttons = ({currentPage,setCurrentPage}) => {
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className='button-group'>
      <button onClick={handlePrevPage}>Prev</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}

export default Buttons;
