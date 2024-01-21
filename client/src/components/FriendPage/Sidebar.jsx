import {React,useState} from 'react';
import {Offcanvas,Row,Col, OffcanvasTitle, OffcanvasBody, CardTitle} from 'react-bootstrap';
import { Button, Divider,Select, SelectItem} from '@nextui-org/react';
import { city, age, gender, level,animals} from './data';
import { LocationIcon,GenderIcon ,AgeIcon, LevelIcon, CancelIcon} from '../Navbar/AcmeLogo';
import Form from 'react-bootstrap/Form';
import {Card, CardBody} from "@nextui-org/react";



function Sidebar({ onApplyFilter, onCancel })  {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  
    
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
};

  

  return (
    <>
 <Card         style={{
       marginLeft:"-20px",
        
          width: "460px", 
          maxWidth: '600px',
          backgroundColor: 'lightgray',
          borderRight: '1px solid #ccc',
          height: '100%',
        }}>
          <CardTitle style={{ fontSize: "30px" , fontWeight:"bold", marginLeft:"20px",marginTop:"10px"}}> Choose Filters</CardTitle>


          <Divider style={{ backgroundColor: 'black',height:"10px"}}/>

        
      <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft:"34px",marginTop:"-200px" }} >
      <div >
         
      <Select label="Select a City" onChange={(e) => setSelectedCity(e.target.value)} style={{width:"350px",marginBottom: "25px", fontSize:"19px"}} startContent={<LocationIcon/>}>
      
            <SelectItem key="Milan" value="Milan">Milan</SelectItem>
            <SelectItem key="Turin" value="Turin">Turin</SelectItem>
            <SelectItem key="Venice" value="Venice">Venice</SelectItem>
            <SelectItem key="Florance" value="Florance">Florance</SelectItem>
            <SelectItem key="Rome" value="Rome">Rome</SelectItem>
            <SelectItem key="Genova" value="Genova">Genova</SelectItem>
            
          </Select>

          <Select label="Select a Age" onChange={(e) => setSelectedAge(e.target.value)} style={{width:"350px",marginBottom: "25px"}} startContent={<AgeIcon/>}>
            <SelectItem key="18-25" value="18-25">18-25</SelectItem>
            <SelectItem key="26-30" value="26-30">26-30</SelectItem>
            <SelectItem key="31-40" value="31-40">31-40</SelectItem>
            <SelectItem key="41 above" value="41 above">41 above</SelectItem>
          </Select>

          <Select label="Select a Gender" onChange={(e) => setSelectedGender(e.target.value)} style={{width:"350px",marginBottom: "25px"}} startContent={<GenderIcon/>}>
            <SelectItem key="Female" value="Female">Female</SelectItem>
            <SelectItem key="Male" value="Male">Male</SelectItem>
          </Select>

          <Select label="Select a Level" onChange={(e) => setSelectedLevel(e.target.value)} style={{width:"350px",marginBottom: "50px"}} startContent={<LevelIcon/>}>
            <SelectItem key="Beginner (A0/A1)" value="Beginner (A0/A1)">Beginner (A0/A1)</SelectItem>
            <SelectItem key="Pre Intermediate(A2)" value="Pre Intermediate(A2)">Pre_Intermediate(A2)</SelectItem>
            <SelectItem key="Intermediate(B1)" value="Intermediate(B1)">Intermediate(B1)</SelectItem>
            <SelectItem key="Upper Intermediate(B2)" value="Upper Intermediate(B2)">Upper Intermediate(B2)</SelectItem>
            <SelectItem key="Advanced(C1)" value="Advanced(C1)">Advanced(C1)</SelectItem>
            <SelectItem key="Proficient(C2)" value="Proficient(C2)">Proficient(C2)</SelectItem>
          </Select>
          </div>
          <div className="flex gap-4 items-center" style={{marginTop:'20px', marginRight:"70px"}}>
          <Button
        style={{
          width: '100px',
          height: '50px',
          fontSize: '23px',
          color: 'white',
         
        }}
        color="success"
        onClick={handleApply}
      >
        Apply
      </Button>
      <Button
        style={{
          width: '100px',
          height: '50px',
          fontSize: '23px',
          color: 'white',
      
        }}
        color="danger"
        onClick={handleCancel}
      >
        Cancel
      </Button>

          </div>
      </CardBody>
     
    </Card>
    </> 

  );
}

export default Sidebar;

