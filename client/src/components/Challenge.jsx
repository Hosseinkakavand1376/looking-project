import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { Button, Select, SelectItem, user} from '@nextui-org/react';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';


const Challenge = ({setUserPoints, userPoints}) => {

    const [bot, setBot] = useState('');
    const [solo , setSolo] = useState(false);
    const [duel , setDuel] = useState(false);
    const [challenge , setChallenge] = useState(' ');
    const [challstatus, setChallstatus] = useState(true);
    const [difficulty , setDifficulty] = useState(' ');
    const [diffstatus, setDiffstatus] = useState(true);
    const [refreshSelects, setRefreshSelects] = useState(false);
    const [score , setScore] = useState('');
    const [time , setTime] = useState('');
    const [startChallengeStatus, setStartChallengeStatus] = useState(false);
    const [challengeData, setChallengeData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [countdown, setCountdown] = useState(false);
    const [cdtime, setCdtime] = useState(0);
    const clockRef = useRef();
    const [c_started, setC_started] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [finish, setFinish] = useState(false);
    const [prebtnstat, setPrebtnstat] = useState(true);

    const [dimensions, setDimensions] = useState(window.innerHeight - 65 + "px");
    const [userdimensions, setUserdimensions] = useState(window.innerHeight - 125 + "px");

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimensions(window.innerHeight - 65 + "px");
            setUserdimensions(window.innerHeight - 125 + "px");
        });
    }, [window.innerHeight]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8081/api/challenges");
            const data = await response.json();
            setChallengeData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        // console.log(challengeData);

        fetchData();
    }, [refresh]);

    useEffect(() => {
        if (solo){
            setChallstatus(false);
            if (challenge === 'blank'){
                setDiffstatus(false);
                if (difficulty !== ' '){
                    setStartChallengeStatus(true);
                    if (difficulty === 'easy'){
                        setScore(300);
                        setTime("5:00");
                        setCdtime(300000);
                    }
                    else if (difficulty === 'medium'){
                        setScore(400);
                        setTime("10:00");
                        setCdtime(600000);
                    }
                    else{
                        setScore(500);
                        setTime("15:00");
                        setCdtime(900000);
                    }
                } else {
                    setStartChallengeStatus(false);
                    setScore('');
                    setTime('');
                    setCdtime(0);
                }
            } else if (challenge === 'long-answer'){
                setDiffstatus(false);
                if (difficulty !== ' '){
                    setStartChallengeStatus(true);
                    if (difficulty === 'easy'){
                        setScore(400);
                        setTime("5:00");
                        // setCdtime(300000);
                    }
                    else if (difficulty === 'medium'){
                        setScore(500);
                        setTime("10:00");
                        // setCdtime(600000);
                    }
                    else{
                        setScore(600);
                        setTime("15:00");
                        // setCdtime(900000);
                    }
                } else {
                    setStartChallengeStatus(false);
                    setScore('');
                    setTime('');
                    // setCdtime(0);
                }
            }else{
                setDiffstatus(true);
                setStartChallengeStatus(false);
                setScore('');
                // setTime('');
            }
        }
    }, [solo, challenge, difficulty]);

    const changeplayers = () => {
        setSolo(true);
        setBot('Bot');
    }

    const changeChallenge = (e) => {
        setChallenge(e.target.value);
    }

    const changedifficulty = (e) => {
        setDifficulty(e.target.value);
    }

    const startChallenge = () => {

        if (challenge === " "){
            alert("Please select a challenge type");
            return;
        }
        if (difficulty === " "){
            alert("Please select a difficulty");
            return;
        }

        const mychallenge = challengeData.filter((c) => c.type === challenge && c.difficulty === difficulty);

        if (mychallenge.length >= 5){
            for (let i = 0; i < 5; i++){
                const random = Math.floor(Math.random() * mychallenge.length);
                if (questions.includes(mychallenge[random])){
                    i--;
                } else {
                    questions.push(mychallenge[random]);
                    answers.push(JSON.parse(mychallenge[random].answers));
                }
            }
        } else if (mychallenge.length < 5 && mychallenge.length > 0) {
            for (let i = 0; i < mychallenge.length; i++){
                const random = Math.floor(Math.random() * mychallenge.length);
                if (questions.includes(mychallenge[random])){
                    i--;
                } else {
                    questions.push(mychallenge[random]);
                    answers.push(JSON.parse(mychallenge[random].answers));
                }
            }
        } else {
            console.log('No challenges available');
        }

        setStartChallengeStatus(false);
        setChallstatus(true);
        setDiffstatus(true);
        // setCountdown(false);
        // clockRef.current.start();
        setC_started(true);
    }
    
    /* const cd_complete = () => {
        setStartChallengeStatus(true);
        setChallstatus(false);
        setDiffstatus(false);
        setCountdown(true);
        setC_started(false);
    } */

    const [qnumeber, setQnumber] = useState(0);
    const [preans, setPreans] = useState([]);

    const nextQuestion = () => {

        if (qnumeber === questions.length - 2) {
            setFinish(true);
        }

        if (challenge === "blank"){
            if (userAnswers[qnumeber]) {
                for (let i=0; i<userAnswers[qnumeber].length; i++){
                    if (userAnswers[qnumeber][i] !== document.getElementById("answer-" + i).value){
                        userAnswers[qnumeber][i] = (document.getElementById("answer-" + i).value).toLowerCase();
                    }
                    if (qnumeber !== questions.length - 1) {
                        document.getElementById("answer-" + i).value = "";
                    }
                }
                console.log(userAnswers);
            } else {
                const ans = new Array(answers[qnumeber].length).fill("");
                userAnswers.push(ans);
                for (let i=0; i<answers[qnumeber].length; i++){
                    userAnswers[qnumeber][i] = (document.getElementById("answer-" + i).value).toLowerCase();
                    if (qnumeber !== questions.length - 1) {
                        document.getElementById("answer-" + i).value = "";
                    }
                }
            }

        } else if (challenge === "long-answer"){
            if (userAnswers[qnumeber + 1]){
                document.getElementById("long-textarea").value = userAnswers[qnumeber + 1][0];
            } else {
                const ans = new Array(1).fill("");
                userAnswers.push(ans);
                userAnswers[qnumeber].push(document.getElementById("long-textarea").value);
                if (qnumeber !== questions.length - 1) {
                    document.getElementById("long-textarea").value = "";
                }
            }
        }

        if (qnumeber < questions.length - 1){
            setQnumber(qnumeber + 1);
            setPrebtnstat(false);
        }

        if (userAnswers[qnumeber + 1]){
            preans.pop();
            const pans = new Array(userAnswers[qnumeber].length).fill("");
            preans.push(pans);
            for (let i=0; i<userAnswers[qnumeber + 1].length; i++){
                console.log(userAnswers[qnumeber + 1][i]);
                preans[i] = userAnswers[qnumeber + 1][i];
            }
        } else {
            preans.pop();
        }
    }

    const prevQuestion = () => {
        if (qnumeber === 1) {
            setPrebtnstat(true);
        }

        if (challenge === "blank"){
            if (userAnswers[qnumeber]) {
                for (let i=0; i<userAnswers[qnumeber].length; i++){
                    if (userAnswers[qnumeber][i] !== document.getElementById("answer-" + i).value){
                        userAnswers[qnumeber][i] = document.getElementById("answer-" + i).value;
                    }
                    if (qnumeber !== questions.length - 1) {
                        document.getElementById("answer-" + i).value = "";
                    }
                }
            } else {
                const ans = new Array(answers[qnumeber].length).fill("");
                userAnswers.push(ans);
                for (let i=0; i<answers[qnumeber].length; i++){
                    userAnswers[qnumeber][i] = document.getElementById("answer-" + i).value;
                    if (qnumeber !== questions.length - 1) {
                        document.getElementById("answer-" + i).value = "";
                    }
                }
            }

        } else if (challenge === "long-answer"){
            document.getElementById("long-textarea").value = userAnswers[qnumeber-1][0];
        }

        if (qnumeber > 0){
            setQnumber(qnumeber - 1);
            setFinish(false);
        }

        if (userAnswers[qnumeber - 1]){
            preans.pop();
            const pans = new Array(userAnswers[qnumeber].length).fill("");
            preans.push(pans);
            for (let i=0; i<userAnswers[qnumeber - 1].length; i++){
                console.log(userAnswers[qnumeber - 1][i]);
                preans[i] = userAnswers[qnumeber - 1][i];
            }
        } else {
            preans.pop();
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [fscore, setFscore] = useState(0);

    const getAnswers = (e) => {

        const ans = new Array(answers[qnumeber].length).fill("");
        userAnswers.push(ans);
        for (let i=0; i<answers[qnumeber].length; i++){
            userAnswers[qnumeber][i] = document.getElementById("answer-" + i).value;
            if (qnumeber !== questions.length - 1) {
                document.getElementById("answer-" + i).value = "";
            }
        }

        for(let i=0; i<answers.length; i++){
            if (challenge === "blank"){
                for (let j=0; j<answers[i].length; j++){
                    if (answers[i][j] === userAnswers[i][j]){
                        if (difficulty === "easy"){
                            setFscore(fscore + 30);
                            setUserPoints((a) => a + 30);
                        } else if (difficulty === "medium"){
                            setFscore(fscore + 40);
                            setUserPoints((a) => a + 40);
                        } else {
                            setFscore(fscore + 50);
                            setUserPoints((a) => a + 50);
                        }
                    }
                }
            } else if (challenge === "long-answer"){
                if (answers[i][0] === userAnswers[i][0]){
                    setFscore(fscore + 30);
                    setUserPoints(userPoints + 30);
                }
            }
        }

        // clockRef.current.stop();
        
        setC_started(false);
        setFinish(false);
        setPrebtnstat(true);
        setIsOpen(true);

        console.log(userPoints);
    };

    const handleCloseModal = () => {

        setChallenge(' ');
        setDifficulty(' ');
        setScore(' ');
        // setTime('');
        setQuestions([]);
        setSolo(false);
        setStartChallengeStatus(false);
        // setChallstatus(true);
        // setDiffstatus(true);
        // setCountdown(true);
        setIsOpen(false);
        setPreans([]);
        setQuestions([]);
        setAnswers([]);
        setQnumber(0);
        setFscore(0);
        setUserAnswers([]);
        setRefreshSelects(!refreshSelects);
        setRefresh(!refresh);
    };

    return (
        <>
            <Modal show={isOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Finish Challenge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Challenge Finishe</p>
                    <p>Score of challenge: {fscore}</p>
                    <p>All Score: {userPoints}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Container fluid align='center'>
                <Row style={{height: `${dimensions}`, width: '100vw'}}>
                    <Col align='center' style={{background: 'rgba(239, 239, 239, 0.1)'}} md={3}>
                        <Button style={{marginRight: '20px', marginTop: '30px'}} onClick={() => changeplayers()}>Solo</Button>
                        <Button style={{marginTop: '30px'}} isDisabled>Duel</Button>

                        <br/>

                        <Select key={refreshSelects} style={{marginTop: '30px'}} label="Type" placeholder="Choose the type of Challenge" className="max-w-xs" onChange={(e) => changeChallenge(e)} isDisabled={challstatus}>
                            {/* <SelectItem isDisabled key=" " value="type">Choose the type of challenge</SelectItem> */}
                            <SelectItem key="blank" value="blank" selected>Blank</SelectItem>
                            <SelectItem key="long-answer" value="long-answer">Long Answer</SelectItem>
                        </Select>

                        <br/>

                        <Row style={{marginBottom: "30px"}}>
                            {/* <Col>
                            <RadioGroup defaultValue={difficulty} style={{marginTop: '30px', color:"white"}} onChange={(e) => changedifficulty(e)} isDisabled={diffstatus}>
                                <p style={{marginRight: '10px', color:"white", display: "flex", float: "left"}}>Difficulty:</p>
                                <Radio color='primary' value="easy"><p style={{color: "white"}}>Easy</p></Radio>
                                <Radio color='secondary' value="medium"><p style={{color: "white"}}>Medium</p></Radio>
                                <Radio color='danger' value="hard"><p style={{color: "white"}}>Hard</p></Radio>
                            </RadioGroup>
                            </Col> */}
                            <Col>
                                <Select key={refreshSelects} style={{marginTop: '30px'}} label="Difficulty" placeholder="Choose the difficulty of Challenge" className="max-w-xs" onChange={(e) => changedifficulty(e)} isDisabled={diffstatus}>
                                    <SelectItem key="easy" value="easy">Easy</SelectItem>
                                    <SelectItem key="medium" value="medium">Medium</SelectItem>
                                    <SelectItem key="hard" value="hard">Hard</SelectItem>
                                </Select>
                            </Col>
                        </Row>

                        {/* <p style={{marginRight: '10px', color:"white"}}>Time of the Challenge:</p> */}
                        {/* <div style={{color: "white", height: "30px", border: "1px solid white", width: "200px", borderRadius: "5px"}}>{time}</div> */}

                        <br/>

                        <p style={{marginRight: '10px', color:"white"}}>Score of the Challenge:</p>
                        <div style={{color: "white", height: "30px", border: "1px solid white", width: "200px", borderRadius: "5px"}}>{score}</div>

                        <br/>

                        <Button style={{marginTop: '10px'}} onClick={() => startChallenge()} isDisabled={!startChallengeStatus}>Start Challenge</Button>
                    </Col>
                    
                    <Col md={9} align="center" style={{color: 'white', marginTop: '30px'}}>
                        <Row style={{height: `${userdimensions}`}}>
                            <Col md={3} style={{borderRight: '1px solid white'}}>
                                <p>Romina</p>
                                <img src="User-profile.jpg" style={{borderRadius: '5px', marginTop: "20px"}} width={100} alt='user-profile-picture' />
                                <p style={{marginTop: "40px"}}>Level: B1</p>
                                <p style={{marginTop: "20px"}}>Age: 25</p>
                                <p style={{marginTop: "20px"}}>City: Turin</p>
                            </Col>
                            <Col md={6}>
                                <Row className='justify-content-md-center'>Challenge: {challenge === "long-answer" ? "Long Answer" : challenge.charAt().toUpperCase() + challenge.slice(1)}</Row>
                                <Row>
                                    <Col md={6}>
                                        <p style={{marginTop: '20px'}}>Date: {dayjs().format("DD/MM/YYYY")}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p style={{marginTop: '20px'}}>Difficulty: {difficulty.charAt().toUpperCase() + difficulty.slice(1)}</p>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: "20px"}} className='justify-content-md-center'>
                                    <Col md={12}>
                                         Question {c_started ? (qnumeber + 1) : null}
                                    </Col>
                                    <Col md={12} style={{marginTop: "20px", width: "95%", border: "1px solid darkgray", borderRadius: "5px", height: "15vh"}}>
                                        {c_started ? <p style={{marginTop: "10px", marginBottom: "10px"}}>{questions[qnumeber].question}</p> : null}
                                    </Col>
                                    <Col md={12}>
                                        <Row className='justify-content-md-center' style={{borderTop: "1px solid darkgray", borderBottom: "1px solid darkgray", width: "95%", paddingBottom: "15px", marginTop: "20px", minHeight: "15vh"}}>
                                            {c_started && challenge === "long-answer" ? 
                                                // <textarea placeholder="Enter your answer" defaultValue={userAnswers} onChange={(e) => checkAnswer(e)} style={{marginTop: '20px', width: '80%', height: '150px'}}/>
                                                <Form.Group>
                                                    <Form.Control id="long-textarea" as="textarea" rows={3} placeholder="Enter your answer" defaultValue={userAnswers} onChange={(e) => e.target.value} style={{marginTop: '20px', width: '90%', height: '120px'}}/>
                                                    {/* <Button Control="exampleForm.ControlTextarea1" style={{marginTop: '20px', width: "25%"}}>Submit</Button> */}
                                                </Form.Group>
                                            : null}
                                            
                                            {c_started && challenge === "blank" ? 
                                                <>
                                                    {answers[qnumeber].map((index, a) => {
                                                        return (
                                                            <Col md={6} key={index}>
                                                                <Form.Group>
                                                                    <Form.Label style={{marginTop: '20px'}}>Answer {a+1}</Form.Label>
                                                                    <Form.Control id={"answer-" + a} as="input" rows={1} defaultValue={preans[a]} style={{marginTop: '20px', width: '90%', height: '50px'}}/>
                                                                </Form.Group>
                                                            </Col>
                                                        )
                                                    })}
                                                </>
                                            : null}
                                        </Row>
                                    </Col>
                                    <Col md={12}>
                                        {c_started ? <Button style={{marginTop: '30px', marginRight: "20px"}} onClick={() => prevQuestion()} isDisabled={prebtnstat}>Prevous</Button> : null}
                                        {c_started && !finish ? <Button style={{marginTop: '30px'}} onClick={() => nextQuestion()}>Next</Button> : null}
                                        {finish ? <Button style={{marginTop: '30px'}} onClick={() => getAnswers()}>Finish</Button> : null}
                                    </Col>
                                </Row>
                                <Row style={{marginTop: "20px"}}>
                                    {/* <Col md={12} style={{marginBottom: "20px"}}>
                                    </Col> */}
                                    {/* <Col md={12}>
                                        <Countdown date={Date.now() + cdtime} autoStart={false} ref={clockRef} onComplete={() => cd_complete()} />
                                    </Col> */}
                                </Row>
                            </Col>
                            <Col md={3} style={{borderLeft: '1px solid white'}}>
                                {bot ? 
                                <>
                                    <p>______</p>
                                    <div style={{borderRadius: '5px', marginTop: "20px", border: "1px solid white", width: "100px", height: "100px"}}/>
                                    <p style={{marginTop: "40px"}}>Level: -</p>
                                    <p style={{marginTop: "20px"}}>Age: -</p>
                                    <p style={{marginTop: "20px"}}>City: -</p>
                                </>
                                : null}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Challenge;

{/* <Button style={{background: '#22aa98', color: '#4f5c68'}}><b>Solo</b></Button>
<Button isDisabled style={{background: '#22aa98', color: '#4f5c68'}}><b>Duel</b></Button> */}