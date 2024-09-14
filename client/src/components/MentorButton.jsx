import { Modal,ModalContent,ModalBody,ModalHeader,ModalFooter,Button } from '@nextui-org/react';
import React, { useState } from 'react';
import '../components/FriendPage/friend.css';

function MentorButton({ mentorStatus, setMentorStatus }) {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const toggleMentorStatus = () => {
    if (mentorStatus.isMentor){
      return;
    } else {
      if (mentorStatus.points >= 1000) {
        setMentorStatus({ ...mentorStatus, isMentor: true })
      } 
      setShowModal(true);
    }
    
  };

  return (
    <>
     <Button 
  className="special-button"
  onClick={toggleMentorStatus} 
  disabled={mentorStatus.isMentor}
  style={{
    width: "160px",
    height: "50px",
    fontSize: "15px",
    background: "transparent",
    borderRadius: "10px",
    
  }}
>
  {mentorStatus.isMentor ? 'Mentor' : 'Become a Mentor'}
</Button>


     
      <Modal ize='2xl' style={{ width: '600px' }} isOpen={showModal} onClose={handleModalClose}>
        <ModalContent>
        <ModalHeader  className="flex justify-center items-center gap-4" >
           {mentorStatus.isMentor ? <h5 style={{color:"green"}}>New Mentor</h5> : <h5 style={{color:"red"}}>Mentor Warning </h5>}
        </ModalHeader>
        <ModalBody  className="flex justify-center items-center gap-4">
          {mentorStatus.isMentor ? 'Congratulations, you are now a mentor!' : `You need ${1000 - mentorStatus.points} points to become a mentor.`}
        </ModalBody>
        <ModalFooter  className="flex justify-center items-center gap-4">
          <Button color="transparent" className='special-button-danger'  onClick={handleModalClose}>Close</Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MentorButton;