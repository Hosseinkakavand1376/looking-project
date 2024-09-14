import {React,useState} from 'react';
import { Container } from 'react-bootstrap';
import {Carousel} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';  
import { Divider,Button, ScrollShadow } from '@nextui-org/react';


function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {
   
    window.location.href = '/ranking'; 
  };




  return (
    <div style={{ position: 'relative', marginTop: "65px"}}>
       <div  className="image-container" style={{ position: 'relative',  overflow: 'hidden',marginTop:"0.5px" }}>
 <img src="home.jpg" alt="Home" style={{ width: '100%', height: '100vh', objectFit: 'cover' ,  }} />
   {/* Text on the image */}
   <div
          className="text-overlay title"
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            fontSize: '2.5em',
            fontWeight: 'bold',
          }}
        >
          Welcome to Looking
        </div>
        {/* Text on the image - Description */}
        <div
    className="line"
    style={{
      position: 'absolute',
      top: '29%',
      left: '9%',
      height: '22%',
      width: '8px',
      backgroundColor: 'white',
      transform: 'translateX(-50%)',
      color:"white"
    }}
  ></div>

  <div
    className="text-overlay description"
    style={{
      position: 'absolute',
      top: '40%',
      left: '36%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      textAlign: 'left',
      fontSize: '22px',
    }}
  >
    Ciao Hossein.<br />
    Looking is Looking for you <br />
    It helps you to improve,<br />
    your Italian language skills <br />
    Also, it will help you to find new friends
  </div>

  {/* Dark overlay on hover */}
  <div className="dark-overlay" />
</div>
<Container style={{ marginBottom: '100px', marginTop:"80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
<Carousel style={{radius: "90px", border:"40px",width:"1100px" }} >

      <Carousel.Item>
        <img
          className={'d-block w-100 custom-image' }
          src="/findingfriend.jpg"
          alt="First slide"
          style={{radius: "90px",border:"40px"}}
        />
        <Carousel.Caption>
      <h3>Finding Friends</h3>
      <p>This part of our site give you that opporyunity to find a good partner 
                for improving your Italian language skills.</p>
                <Link to="/find-friend">
                <Button variant="ghost" color='warning'radius="sm" > see the page</Button>
                </Link>
    </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 custom-image"
          src="/challenge.jpg"
          alt="Second slide"
        
        />
        <Carousel.Caption>
      <h3>Challenge</h3>
      <p> Each month you will have challenges to know your level .
                There are 2 kinds of challenge solo and the Duel, 
                For Duel you should reach to Level B2 But before that you can have Solo challenges</p>
                <Link to="/challenge">
      <Button variant="ghost" color='warning'radius="sm" > see the page</Button>
      </Link>
    </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img  src="/ranking.jpg" alt="Third slide" />
        <Carousel.Caption >
      <h3>Ranking</h3>
      <p>You can see your score in Ranking List also You can see the total score that you own or your friends own.
                Ranking  list shows your scores in month and year </p>
                <Link to="/rankng">
                <Button variant="ghost" color='warning' radius="sm"> see the page</Button>
                </Link>
    </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
</Container>

      <div style={{ position: 'relative',  }}>
      <div className="full-width-image" style={{ position: 'relative',  overflow: 'hidden'}}>
      <img src="learn-italian.jpg" alt="learn-italian" className="full-width-image"  />
      </div>
      <div
          className="text-overlay title"
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            fontSize: '3em',
            fontWeight: 'bold',
          }}
        >
         Mentor 
        </div>
        <div
       
    style={{
      position: 'absolute',
      top: '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      textAlign: 'center',
      fontSize: '22px',
     
    }}
  >
   Are you a giving person?<br />
   Do you like to help people ?<br />
   IF yes, you should be a MENTOR. Ater reaching 1000 Score you have this ability to be mentor and help other persons to improve thier 
                skills,<br />
     <br />
     <Button  color="danger" variant="ghost" radius="sm" style={{width:'150px', height:'70px', fontSize:'20px'}}
     onClick={handleButtonClick}
     >
       see your score
      </Button>  
  </div>
  
</div>
    </div>
  
  );
}

export default HomePage;
