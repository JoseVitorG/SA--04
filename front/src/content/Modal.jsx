import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, closeModal, response }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={closeModal}>
      {
        response.status == 200 ?
          (
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className='conteiner_status_true'>
                <svg xmlns="http://www.w3.org/2000/svg" className='check' width="80%" height='80%' class="bi bi-check2" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                </svg>
              </div>
              <p>{response.data}</p>
            </div>
          )
          :
          (
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className='conteiner_status_false'>
                <svg xmlns="http://www.w3.org/2000/svg" className='x' width="80%" height='80%' class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </div>
              <p>{response.data}</p>
            </div>
          )
      }
    </div>
  );
};

export default Modal;
