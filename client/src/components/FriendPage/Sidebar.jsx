import React, { useState } from 'react';
import { Divider, Select, SelectItem, Tabs, Tab, Button, Card, CardBody} from '@nextui-org/react';
import { LocationIcon, GenderIcon, AgeIcon, LevelIcon } from '../Navbar/AcmeLogo';
import FriendTable from './ReequestList';


function Sidebar({ onApplyFilter, onCancel, friends, setFriends, setRefresh, refresh, users, setUsers, usersData, setUsersData, handleSuccessModalClose }) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [refreshSelects, setRefreshSelects] = useState(false);
  const [activeTab, setActiveTab] = useState("Filter");


  const handleApply = () => {
    console.log("Selected Filters:", {
      city: selectedCity,
      age: selectedAge,
      gender: selectedGender,
      level: selectedLevel,
    });

    onApplyFilter({
      city: selectedCity,
      age: selectedAge,
      gender: selectedGender,
      level: selectedLevel,
    });
  };

  const handleCancel = () => {
    setSelectedCity('');
    setSelectedAge(null);
    setSelectedGender(null);
    setSelectedLevel(null);
    onCancel();
    setRefreshSelects(!refreshSelects);
  };
  const handleRemoveFriend = (friendToRemove) => {
    setLfriends(prevFriends => prevFriends.filter(friend => friend.id !== friendToRemove.id));
  };
  

  return (
    <Card style={{
      marginLeft: "-20px",
      width: "385px",
      maxWidth: '600px',
      backgroundColor: 'lightgray',
      borderRight: '1px solid #ccc',
      height: '100%',
    }}>
      <div style={{ fontSize: "30px", fontWeight: "bold", marginTop: "10px", position: "fixed"}}>
        <Tabs   radius='sm'   color='secondary'  variant='light' size='lg'
       
        activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
        
          <Tab eventKey="Filter" title="Filters"  style={{marginLeft:"30px",fontSize:"20px"}}>
          <Divider style={{ backgroundColor: 'black', height: "10px",width:"385px", marginRight:"-10px",marginTop:"-15px"}} />
            {activeTab === "Filter" && (
              <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft: "20px" , marginTop:"40px"}}>
                <Select key={`city-${refreshSelects}`} label="Select a City" onChange={(e) => setSelectedCity(e.target.value)} style={{ width: "300px", marginBottom: "25px", fontSize: "19px" }} startContent={<LocationIcon />}>
                  <SelectItem key="Milan" value="Milan">Milan</SelectItem>
                  <SelectItem key="Turin" value="Turin">Turin</SelectItem>
                  <SelectItem key="Venice" value="Venice">Venice</SelectItem>
                  <SelectItem key="Florance" value="Florance">Florance</SelectItem>
                  <SelectItem key="Rome" value="Rome">Rome</SelectItem>
                  <SelectItem key="Genova" value="Genova">Genova</SelectItem>
                </Select>

                <Select key={`age-${refreshSelects}`} label="Select a Age" onChange={(e) => setSelectedAge(e.target.value)} style={{ width: "300px", marginBottom: "25px" }} startContent={<AgeIcon />}>
                  <SelectItem key="18-25" value="18-25">18-25</SelectItem>
                  <SelectItem key="26-30" value="26-30">26-30</SelectItem>
                  <SelectItem key="31-40" value="31-40">31-40</SelectItem>
                  <SelectItem key="41 above" value="41 above">41 above</SelectItem>
                </Select>

                <Select key={`gender-${refreshSelects}`} label="Select a Gender" onChange={(e) => setSelectedGender(e.target.value)} style={{ width: "300px", marginBottom: "25px" }} startContent={<GenderIcon />}>
                  <SelectItem key="Female" value="Female">Female</SelectItem>
                  <SelectItem key="Male" value="Male">Male</SelectItem>
                </Select>

                <Select key={`level-${refreshSelects}`} label="Select a Level" onChange={(e) => setSelectedLevel(e.target.value)} style={{ width: "300px", marginBottom: "50px" }} startContent={<LevelIcon />}>
                  <SelectItem key="Beginner (A0/A1)" value="Beginner (A0/A1)">Beginner (A0/A1)</SelectItem>
                  <SelectItem key="Pre Intermediate(A2)" value="Pre Intermediate(A2)">Pre_Intermediate(A2)</SelectItem>
                  <SelectItem key="Intermediate(B1)" value="Intermediate(B1)">Intermediate(B1)</SelectItem>
                  <SelectItem key="Upper Intermediate(B2)" value="Upper Intermediate(B2)">Upper Intermediate(B2)</SelectItem>
                  <SelectItem key="Advanced(C1)" value="Advanced(C1)">Advanced(C1)</SelectItem>
                  <SelectItem key="Proficient(C2)" value="Proficient(C2)">Proficient(C2)</SelectItem>
                </Select>

                <div style={{ display: 'flex', gap: '10px',marginLeft: "-40px" }}>
                  <Button className='special-button-success' style={{ height: '50px', fontSize: '23px' }} onClick={handleApply}>Apply</Button>
                  <Button className='special-button-danger' style={{ height: '50px', fontSize: '23px' }} onClick={handleCancel}>Cancel</Button>
                </div>
              </CardBody>
            )}
          </Tab>
          <Tab eventKey="Request" title="Request"  style={{marginLeft:"100px", fontSize:"20px"}}>
          <Divider style={{ backgroundColor: 'black', height: "10px",width:"385px", marginRight:"-10px",marginTop:"-15px" }} />
             <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "0px", marginTop: "20px" }} >
            
             <FriendTable friends={friends} setFriends={setFriends} setRefresh={setRefresh} refresh={refresh} setUsersData={setUsersData} usersData={usersData} users={users} setUsers={setUsers}/>
              </CardBody>
           
          </Tab>
        </Tabs>
        
      </div>
    </Card>
  );
}

export default Sidebar;
