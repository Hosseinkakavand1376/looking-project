import {React, useEffect,useState} from 'react';
import { Card, CardHeader, CardBody,  Divider,Button , Avatar,Modal,ModalContent,ModalBody,ModalHeader,ModalFooter} from '@nextui-org/react';
import Sidebar from './Sidebar';
import { Col, Container, Row ,Alert} from 'react-bootstrap';
import './friend.css'; 



const FindingFriend = () => {
    const [usersData, setUsersData] = useState([]);
    const [users, setUsers] = useState([]);
    const [change, setChange] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [showFilterError, setShowFilterError] = useState(false);
    const [friends, setFriends] = useState([]);
    const [filterValues, setFilterValues] = useState({
      city: "",
      age: "",
      gender: "",
      level: "",
    });
    const [selectedFilters, setSelectedFilters] = useState({
      city: "",
      age: "",
      gender: "",
      level: "",
    });
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      const fetchUsers = async () => {
        try{
          const res = await fetch('http://localhost:8081/api/users');
          const data = await res.json();
          setUsers(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUsers();
    }, []);

    const handleFilterApply = (selectedFilters) => {
      if (!selectedFilters.city && !selectedFilters.age && !selectedFilters.gender && !selectedFilters.level) {
        setShowFilterError(true);
        setTimeout(() => {
          setShowFilterError(false);
        }, 10000);
        return;
      }
    
      setFilterValues(selectedFilters);
    
      setUsersData(users.filter((user) => {
        const userAge = user.age;
    
        if (!selectedFilters.age || selectedFilters.age === "All") {
          return (
            (!selectedFilters.city || user.city === selectedFilters.city) &&
            (!selectedFilters.level || user.level === selectedFilters.level) &&
            (!selectedFilters.gender || user.gender === selectedFilters.gender)
          );
        } else {
          const [minAge, maxAge] = getAgeRange(selectedFilters.age); // Function to get age range based on selected option
          return (
            (!selectedFilters.city || user.city === selectedFilters.city) &&
            (!selectedFilters.level || user.level === selectedFilters.level) &&
            (!selectedFilters.gender || user.gender === selectedFilters.gender) &&
            (userAge >= minAge && userAge <= maxAge)
          );
        }
      }));
    
      setChange(true);
      setRefresh(!refresh);
    };
    
    
    const getAgeRange = (selectedOption) => {
      switch (selectedOption) {
        case "18-25":
          return [18, 25];
        case "26-30":
          return [26, 30];
        case "31-40":
          return [31, 40];
        case "41 above":
          return [41, Infinity];
        default:
          return [0, Infinity];
      }
    };
    
   

    const handleFilterCancel = () => {
      setSelectedFilters({
        city: "",
        age: "",
        gender: "",
        level: "",
      });
      setUsersData(users); // Reset usersData to the initial list of all users
      setChange(false); 
    };

      const handleAddFriendClick = (userData) => {
        setSelectedUserData(userData);
        setIsOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsOpen(false);
      };
    
      const handleConfirmAddFriend = () => {
        
        setShowSuccessModal(true);
    };

      const handleSuccessModalClose = () => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUserData.id));
        setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== selectedUserData.id));
        setFriends((prevFriends) => [...prevFriends, selectedUserData]);
        setShowSuccessModal(false);
        setSelectedUserData(null);
      };

      users.sort((a, b) => a.id - b.id);
      
  return (
    <>
    {showFilterError && (
        <Alert variant="danger" style={{ position: 'fixed', left: '10px', bottom: '10px', zIndex: 1000, width:"300px" }}>
          Please choose at least one filter.
        </Alert>
      )}
     <Container fluid style={{marginTop: "65px"}}>
    <Row>
      <Col xs={12} md={3}>
      <Sidebar friends={friends} setFriends={setFriends} onApplyFilter={handleFilterApply} onCancel={handleFilterCancel} refresh={refresh} setRefresh={setRefresh} setUsersData={setUsersData} usersData={usersData} setUsers={setUsers} users={users}/>
      </Col>
      <Col xs={12} md={9}>
      <div style={{color:"white",display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop:"15px",marginRight:"20px"}}>
        <h2> Choose your friend </h2>
        </div>
      <Container style={{ overflowY: 'auto', paddingBottom: '190px' }}>

      {change ?
        <>
          {usersData.map((userData, index) => (
          <Card className="card" key={index} style={{  marginBottom: '40px',marginLeft:"230px", marginTop:"40px", }}>
            <CardHeader className="flex gap-4">
              <div className="flex flex-col">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
               
              <Avatar isBordered color='secondary'    style={{marginRight:"18px"}}/>
              <p className="text-md" style={{ fontWeight: 'bold', fontSize: '24px' , marginRight:"10px" }}>
                  {userData.name}
                </p>
                <p className="text-md" style={{ fontWeight: 'bold', fontSize: '24px'}}>
                  {userData.surname}
                </p>
                </div>
              </div>
              <div style={{ marginLeft: 'auto',display: 'flex', flexDirection: 'row' }}>
                <img src='/score.png' style={{width:"48px",height:"48px", marginTop:"-15px"}}/>
                <p style={{ fontSize: '20px', fontWeight: 'normal' }}>{userData.point}</p>
              </div>
            </CardHeader>
            <Divider style={{ marginTop: '-20px', height: '10px' }} />
            <CardBody >
              
    <Row>
      <Col  >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <p style={{ fontSize: '22px', fontWeight: 'bold',marginRight:"10px" }}>City : </p>
              <p style={{ fontSize: '20px', fontWeight: 'normal',  }}> {userData.city}</p>
              </div>
              </Col>
              <Col >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: 'bold',marginRight:"10px"  }}>Level: </p>
              <p style={{ fontSize: '15px', fontWeight: 'normal' }}>{userData.level}</p>
              </div>
              </Col>
              <Col >
              <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <p style={{ fontSize: '22px', fontWeight: 'bold',marginRight:"10px" }}>Age: </p>
              <p style={{ fontSize: '20px', fontWeight: 'normal' }}>{userData.age}</p>
              </div>
              </Col>
            
           
              </Row>
              <Divider style={{ marginTop: '10px', height: '10px' }} />
              
            
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"-15px" , marginBottom:"-10px"}}> 

                
              <Button className="special-button" style={{width:"120px" , height:"50px" , fontSize:"18px" , background:"transparent",borderRadius:"10px"}}
               onClick={() => handleAddFriendClick(userData)}
      >
      Add Friend
      </Button>  
      </div>
     
            </CardBody>
          </Card>
        ))}
        </>
      :
        <>
          {users.map((userData, index) => (
          <Card className="card" key={index} style={{  marginBottom: '40px',marginLeft:"230px", marginTop:"40px", }}>
            <CardHeader className="flex gap-4">
              <div className="flex flex-col">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
               
              <Avatar isBordered color='secondary'    style={{marginRight:"18px"}}/>
              <p className="text-md" style={{ fontWeight: 'bold', fontSize: '24px' , marginRight:"10px" }}>
                  {userData.name}
                </p>
                <p className="text-md" style={{ fontWeight: 'bold', fontSize: '24px'}}>
                  {userData.surname}
                </p>
                </div>
              </div>
              <div style={{ marginLeft: 'auto',display: 'flex', flexDirection: 'row' }}>
                <img src='/score.png' style={{width:"48px",height:"48px", marginTop:"-15px"}}/>
                <p style={{ fontSize: '20px', fontWeight: 'normal' }}>{userData.point}</p>
              </div>
            </CardHeader>
            <Divider style={{ marginTop: '-20px', height: '10px' }} />
            <CardBody >
              
    <Row>
      <Col  >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <p style={{ fontSize: '22px', fontWeight: 'bold',marginRight:"10px" }}>City : </p>
              <p style={{ fontSize: '20px', fontWeight: 'normal',  }}> {userData.city}</p>
              </div>
              </Col>
              <Col >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: 'bold',marginRight:"10px"  }}>Level: </p>
              <p style={{ fontSize: '15px', fontWeight: 'normal' }}>{userData.level}</p>
              </div>
              </Col>
              <Col >
              <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <p style={{ fontSize: '22px', fontWeight: 'bold',marginRight:"10px" }}>Age: </p>
              <p style={{ fontSize: '20px', fontWeight: 'normal' }}>{userData.age}</p>
              </div>
              </Col>
            
           
              </Row>
              <Divider style={{ marginTop: '10px', height: '10px' }} />
              
            
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"-15px" , marginBottom:"-10px"}}> 

                
              <Button className="special-button" style={{width:"120px" , height:"50px" , fontSize:"18px" , background:"transparent",borderRadius:"10px"}}
               onClick={() => handleAddFriendClick(userData)}
      >
      Add Friend
      </Button>  
      </div>
     
            </CardBody>
          </Card>
        ))}
        </>
      }
       
      
      </Container>
      </Col>
      </Row>
      </Container>
      {selectedUserData && (
      <Modal  backdrop="opaque" size='2xl' isOpen={isOpen} onOpenChange={handleCloseModal} style={{ width: '600px' }}> 
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1" style={{color:"red",alignItems: "center", justifyContent: "center", fontSize:"26px", marginTop:"20px"}}>Warning</ModalHeader>
              <ModalBody style={{marginTop:"10px", fontSize:"20px",alignItems: "center", justifyContent: "center",}}>
                <p> 
                  Are you sure you want to add {selectedUserData.name} {selectedUserData.surname} as your friend?
                </p>
              </ModalBody>
              <ModalFooter style={{alignItems: "center", justifyContent: "center"}}>
                <Button className='special-button-danger' size="md" radius="sm"  color="transparent"  onPress={onClose}>
                 No
                </Button>
                <Button  size="md" radius="sm" className='special-button-success' color="transparent" 
                onPress={() => {
                  handleConfirmAddFriend();
                  onClose(); // Close the "Warning" modal
                }}
              >
                 Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )}
  {selectedUserData && (
        <Modal backdrop="opaque" size="md" isOpen={showSuccessModal} onOpenChange={handleSuccessModalClose} style={{ width: '500px' }}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1" style={{ color: 'green', alignItems: 'center', justifyContent: 'center', fontSize: '30px', marginTop: '20px' }}>
                  Success
                </ModalHeader>
                <ModalBody style={{ marginTop: '10px', fontSize: '20px',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{justifyContent:"center"}}>
                  <p>your friend Request send to {selectedUserData.name} {selectedUserData.surname} !!</p>
                  </div>
                </ModalBody>
                <ModalFooter style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Button size="lg" radius="sm" className='special-button-success' color="transparent"  
                  onPress={() => {
                 {handleSuccessModalClose}
    
                  onClose(); // Close the "Warning" modal
                }}>
                    OK
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      
    </>
  );
};
export default FindingFriend;
