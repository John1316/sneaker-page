import React, { useState } from 'react';
import './ModalPopup.css'; // Custom CSS for modal

const ModalPopup = ({ videoUrl }: ModalProps) => {
  console.log("🚀 ~ ModalPopup ~ videoUrl:", videoUrl.split("v="))
  const videoUrlAfterSplit = videoUrl.split("v=")[1]
  // State to manage the modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return <>
      <div className="footer-item">
        <button onClick={openModal} className="open-modal-btn">Play Video</button>

      </div>
      {/* Button to open the modal */}

      {/* Modal Structure */}
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoUrlAfterSplit}`}
            title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Close Button */}
            <button className="close-modal-btn" onClick={closeModal}>
                 &times;
            </button>
          </div>
        </div>
      )}
    </>
};

export default ModalPopup;
