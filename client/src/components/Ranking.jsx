import React, { useState, useEffect } from 'react';
import { Bar, Scatter } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, PointElement, ScatterController, LineElement } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarElement, PointElement, ScatterController, LineElement);

const Ranking = () => {
  const [rankingData, setRankingData] = useState({ chartData: [], rankingList: [] });

  useEffect(() => {
    fetch('http://localhost:8081/api/ranking')
      .then(response => response.json())
      .then(data => {
        const chartData = data.map((user, index) => ({ x: index + 1, y: user.point, label: user.name }));
        setRankingData({ chartData, rankingList: data });
      })
      .catch(error => console.error('Error fetching ranking data:', error));
  }, []);

  const barData = {
    labels: rankingData.chartData.map(item => item.label),
    datasets: [{
      label: '# of Messages',
      data: rankingData.chartData.map(item => item.y),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  };

  const scatterData = {
    datasets: [{
      label: 'Scatter Dataset',
      data: rankingData.chartData.map(item => ({ x: item.x, y: item.y })),
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
      showLine: true,
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

  return (
    <div style={{ color: "White", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className='header'>
        <h1 className='title' style={{ color: 'White' }}>Rankings</h1>
      </div>
      <div style={{ display: 'flex', width: '90vw', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div style={{ width: '35vw', height: '55vh' }}>
          <Bar data={barData} options={options} />
          <Scatter data={scatterData} options={options} />
        </div>
        <div>
          <h2 style={{ color: 'White', textAlign: 'center' }}>Ranking List</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '30vw' }}>
            {rankingData.rankingList.map((item, index) => (
              <div key={index} style={{ background: '#26316e', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ marginRight: '20px', fontSize: '1.2rem', fontWeight: 'bold', color: '#FFFFFF' }}>{item.name}</span>
                <span style={{ fontSize: '1rem', color: '#FFFFFF' }}>{item.point}</span>
              </div>
            ))}
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Ranking;
