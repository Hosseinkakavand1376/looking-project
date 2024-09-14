import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, PointElement, ScatterController, LineElement, Colors } from 'chart.js';
import MentorButton from './MentorButton';
import { Button,Card,CardHeader,CardBody,Divider } from '@nextui-org/react';
import { Row, Col, ListGroup,ListGroupItem,Badge } from 'react-bootstrap'
Chart.register(Colors, LinearScale, CategoryScale, BarElement, PointElement, ScatterController, LineElement);
import '../components/FriendPage/friend.css';

const Ranking = () => {
  const [rankingData, setRankingData] = useState({ chartData: [], rankingList: [] });
  const [mentorStatus, setMentorStatus] = useState({ isMentor: false, points: 0 });

  useEffect(() => {
    fetch('http://localhost:8081/api/ranking')
      .then(response => response.json())
      .then(data => {
        const chartData = data.map((user, index) => ({ x: index + 1, y: user.point, label: user.name}));
        setRankingData({ chartData, rankingList: data });

        fetch('http://localhost:8081/api/userpoint')
          .then(response => response.json())
          .then(data => {
            setMentorStatus({ ...mentorStatus, points: data[0].point });
          })
          .catch(error => console.error('Error fetching user points:', error));
      })
      .catch(error => console.error('Error fetching ranking data:', error));
  }, []);

  const sortedChartData = rankingData.chartData.sort((a, b) => b.y - a.y);

  const barData = {
    labels: rankingData.chartData.map(item => item.label),
    datasets: [{
      label: '# of Messages',
      data: sortedChartData.map(item => item.y),
      backgroundColor: [
        'rgba(255, 99, 132, 0.9)',
        'rgba(54, 162, 235, 0.9)',
        'rgba(255, 206, 86, 0.9)',
        'rgba(75, 192, 192, 0.9)',
        'rgba(153, 102, 255, 0.9)',
        'rgba(255, 159, 64, 0.9)'
      ],
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const sortedRankingList = rankingData.rankingList.slice().sort((a, b) => b.point - a.point);

  return (
    <Row style={{marginTop: "65px", width: "100vw"}}>
      <Col>
        <div style={{ width: '60%'}}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' ,marginLeft:"20px", marginTop:"20px"}}>
          <div style={{ display: 'flex', justifyContent: 'center' }}> 
      <h3 style={{color:"white"}}> Your friends list :</h3>
    </div>
          
          <ListGroup as="ol" numbered variant="darkgray" >
          {sortedRankingList.map((item, index) => (
            <ListGroup.Item  as="li" key={index} style={{ display: 'flex',marginBottom: '10px', 
            ...(item.name === 'Romina' && { backgroundColor: '#8564d3' }) 
           }}>
              <div >
               {item.name}  {item.surname}
               </div>
               <div style={{ marginLeft: 'auto' }}>
               <Badge bg="dark" >
      {item.point}
        </Badge>
               </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

           
          </div>
        </div>
      </Col>




      <Col >
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginRight:"-100px" }}>
      <Card className="card"  style={{  marginBottom: '40px',marginLeft:"100px", marginTop:"40px", }}>
            <CardHeader className="flex justify-center items-center gap-4">
             <h4>Become a Mentor</h4>
            </CardHeader>
            <Divider style={{ marginTop: '-20px', height: '10px' }} />
            <CardBody >
                <p>Your Score: {mentorStatus.points}</p>
                <p>Reqirement Score: 1000</p>
                {mentorStatus.points < 1000 ? <p>You are not eligible to become a mentor</p> : null}
                {(mentorStatus.points >= 1000) && (mentorStatus.isMentor === false) ? <p>You are eligible to become a mentor</p> : null}
                {mentorStatus.isMentor ? <p>You are a mentor</p> : null}
            <Divider style={{ marginTop: '10px', height: '10px' }} />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"-15px" , marginBottom:"-10px"}}> 
              <MentorButton mentorStatus={mentorStatus} setMentorStatus={setMentorStatus} />   
      </div>
     
            </CardBody>
          </Card>
            </div>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '70%', height: '300px', marginTop: '30px', marginLeft:"100px"}}>
    <Bar data={barData} options={options}/>
  </div>
      </Col>
    </Row>
  );
};

export default Ranking;
