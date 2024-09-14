import React, { useState, useEffect } from 'react';
import { Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { FaTrash } from 'react-icons/fa';
import Toast from 'react-bootstrap/Toast';

import './friend.css'; 

const FriendTable = ({ friends, onRemoveFriend, setFriends, setUsers }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timeout;
    if (showToast) {
      timeout = setTimeout(() => {
        setShowToast(false); 
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showToast]);

  const handleRemoveFriend = (friend) => {
    let a = friends.filter((i) => i.id !== friend.id);
    setFriends(a);
    setUsers((prevData) => [...prevData, friend]);
    setShowToast(true);
  };
  

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUserData(null);
  };

  const handleOpenModal = (friend) => {
    setSelectedUserData(friend);
    setIsOpen(true);
  };

  return (
    <>
      <Table removeWrapper aria-label="Example static collection table" color='default'>
        <TableHeader >
          <TableColumn >Name and Surname</TableColumn>
          <TableColumn >City</TableColumn>
          <TableColumn  >
            Remove Request
          </TableColumn>
        </TableHeader>
        {friends.length > 0 ? (
        <TableBody>
          {friends.map((friend, index) => (
            <TableRow key={index}>
              <TableCell style={{ borderBottom: '2px solid gray' }}>{`${friend.name} ${friend.surname}`}</TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }}>{friend.city}</TableCell>
              <TableCell style={{ borderBottom: '2px solid gray' }} >
                <Button
                  variant="text"
                  style={{ width: "30px" }}
                  onClick={() => handleOpenModal(friend)} 
                >
                  <FaTrash style={{ fontSize: '20px', color: 'red' }}/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
           ) : (
            <TableBody emptyContent="No Request to display." />
        )}
      </Table>

      {/* Modal component */}
      <Modal
        backdrop="opaque"
        size='2xl'
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        style={{ width: '600px' }}
      > 
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1" style={{ color: "red", alignItems: "center", justifyContent: "center", fontSize: "26px", marginTop: "20px" }}>Warning</ModalHeader>
              <ModalBody style={{ marginTop: "10px", fontSize: "20px", alignItems: "center", justifyContent: "center" }}>
                <p>Are you sure you want to remove {selectedUserData && `${selectedUserData.name} ${selectedUserData.surname}`} as your friend?</p>
              </ModalBody>
              <ModalFooter style={{ alignItems: "center", justifyContent: "center" }}>
                <Button className='special-button-danger' size="md" radius="sm" color="transparent" onClick={handleCloseModal}> 
                  No
                </Button>
                <Button size="md" radius="sm" className='special-button-success' color="transparent" onClick={() => { handleRemoveFriend(selectedUserData); handleCloseModal(); }}> 
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toast show={showToast} onClose={() => setShowToast(false)} className="bg-light-green" style={{ position: 'fixed', bottom: '10px', left: '10px' }}>
      <Toast.Body>Your friend request removed!!</Toast.Body>
    </Toast>
    </>
  );
};

export default FriendTable;
