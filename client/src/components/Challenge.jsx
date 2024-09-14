import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { Button, Select, SelectItem, Divider} from '@nextui-org/react';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';


const Challenge = () => {

    const [bot, setBot] = useState('');
    const [solo , setSolo] = useState(false);
    const [duel , setDuel] = useState(false);
    const [gamestatus, setGamestatus] = useState(true);
    const [ref, setRef] = useState(true);
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

        fetchData();
    }, [refresh]);

    useEffect(() => {

        const fetchPoint = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/addpoint", {
                    method: 'POST',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        points: fscore
                    })
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchPoint();

        const getUserPoints = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/userpoint");
                const data = await response.json();
                setUserPoints(data[0]['point']);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getUserPoints();
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
            } else if (challenge === 'translate'){
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

    const changeplayers = (e) => {
        if (e.target.value === "solo") {
            setSolo(true);
            setBot('Bot');
        } else {
            setSolo(false);
            setBot('');
        }
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

        console.log(challenge);
        console.log(difficulty);

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
        setGamestatus(false);
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

        } else if (challenge === "translate"){
            if (userAnswers[qnumeber]) {
                for (let i=0; i<userAnswers[qnumeber].length; i++){
                    if (userAnswers[qnumeber][i] !== document.getElementById("trans-answer-" + i).value){
                        userAnswers[qnumeber][i] = (document.getElementById("trans-answer-" + i).value).toLowerCase();
                    }
                    if (qnumeber !== questions.length - 1) {
                        document.getElementById("trans-answer-" + i).value = "";
                    }
                }
            } else {
                const ans = new Array(answers[qnumeber].length).fill("");
                userAnswers.push(ans);
                for (let i=0; i<answers[qnumeber].length; i++){
                    userAnswers[qnumeber][i] = (document.getElementById("trans-answer-" + i).value).toLowerCase();
                    if (qnumeber !== questions.length - 1) {
                        document.getElementById("trans-answer-" + i).value = "";
                    }
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
                        userAnswers[qnumeber][i] = (document.getElementById("answer-" + i).value).toLowerCase();
                    }
                    if (qnumeber !== questions.length - 1) {
                        document.getElementById("answer-" + i).value = "";
                    }
                }
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

        } else if (challenge === "translate"){
            if (userAnswers[qnumeber]) {
                for (let i=0; i<userAnswers[qnumeber].length; i++){
                    if (userAnswers[qnumeber][i] !== document.getElementById("trans-answer-" + i).value){
                        userAnswers[qnumeber][i] = (document.getElementById("trans-answer-" + i).value).toLowerCase();
                    }
                    if (qnumeber !== questions.length - 1) {
                        document.getElementById("trans-answer-" + i).value = "";
                    }
                }
            } else {
                const ans = new Array(answers[qnumeber].length).fill("");
                userAnswers.push(ans);
                for (let i=0; i<answers[qnumeber].length; i++){
                    userAnswers[qnumeber][i] = (document.getElementById("trans-answer-" + i).value).toLowerCase();
                    if (qnumeber !== questions.length - 1) {
                        document.getElementById("trans-answer-" + i).value = "";
                    }
                }
            }
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
                preans[i] = userAnswers[qnumeber - 1][i];
            }
        } else {
            preans.pop();
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [fscore, setFscore] = useState(0);
    const [userPoints, setUserPoints] = useState(0);

    const getAnswers = (e) => {

        if (challenge === "blank"){
            const ans = new Array(answers[qnumeber].length).fill("");
            userAnswers.push(ans);
            for (let i=0; i<answers[qnumeber].length; i++){
                userAnswers[qnumeber][i] = (document.getElementById("answer-" + i).value).toLowerCase();
                if (qnumeber !== questions.length - 1) {
                    document.getElementById("answer-" + i).value = "";
                }
            }
        } else if (challenge === "translate"){
            const ans = new Array(answers[qnumeber].length).fill("");
            userAnswers.push(ans);
            for (let i=0; i<answers[qnumeber].length; i++){
                userAnswers[qnumeber][i] = (document.getElementById("trans-answer-" + i).value).toLowerCase();
                if (qnumeber !== questions.length - 1) {
                    document.getElementById("trans-answer-" + i).value = "";
                }
            }
        }

        var getscore = 0;

        for(let i=0; i<answers.length; i++){
            if (challenge === "blank"){
                for (let j=0; j<answers[i].length; j++){
                    if (answers[i][j] === userAnswers[i][j]){
                        if (difficulty === "easy"){
                            getscore += 60;
                        } else if (difficulty === "medium"){
                            getscore += 80;
                        } else {
                            getscore += 100;
                        }
                    }
                }
            } else if (challenge === "translate"){
                for (let j=0; j<answers[i].length; j++){
                    if (answers[i][j] === userAnswers[i][j]){
                        if (difficulty === "easy"){
                            getscore += 80;
                        } else if (difficulty === "medium"){
                            getscore += 100;
                        } else {
                            getscore += 120;
                        }
                    }
                }
            }
        }

        // clockRef.current.stop();

        setFscore(getscore);
        setRefresh(!refresh);
        setC_started(false);
        setFinish(false);
        setPrebtnstat(true);
        setIsOpen(true);

    };

    const handleCloseModal = () => {

        setChallenge(' ');
        setDifficulty(' ');
        setScore(' ');
        // setTime('');
        setQuestions([]);
        setSolo(false);
        setGamestatus(true);
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
        setRef(!ref);
        setRefreshSelects(!refreshSelects);
        setRefresh(!refresh);
    };

    return (
        <>
            <Modal show={isOpen} onHide={handleCloseModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Finished Challenge</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{fontWeight: "bold"}}>
                    <p>Challenge has Finished.</p>
                    <p>Achieved Score: {fscore}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{background: "transparent"}} className='special-button-danger' onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Container fluid align='center'style={{marginTop: "65px"}}>
                <Row style={{height: `${dimensions}`, width: '100vw'}}>
                    <Col align='center' style={{background: 'lightgray', borderTopRightRadius: "10px", padding: "0px"}} md={3}>

                        <h2 style={{ fontSize: "26px" , fontWeight:"bold", marginLeft:"20px", marginTop:"15px"}}> Choose Challenge</h2>

                        <Divider style={{ backgroundColor: 'black',height:"10px"}}/>

                        {/* <Button style={{marginRight: '20px', marginTop: '20px', backgroundColor: 'white'}} onClick={() => changeplayers()}>Solo</Button> */}
                        <Row>
                            <Col>
                                <Select key={ref} style={{marginTop: '30px'}} label="Play's Type" placeholder="Choose the type of Play" className="max-w-xs" onChange={(e) => changeplayers(e)} isDisabled={!gamestatus}>
                                    <SelectItem key="solo" value="solo" selected>Solo</SelectItem>
                                </Select>
                            </Col>
                        </Row>
                        {/* <Button style={{marginTop: '30px'}} isDisabled>Duel</Button> */}

                        <br/>
                        <Row>
                            <Col>
                                <Select key={refreshSelects} label="Challenge's Type" placeholder="Choose the type of Challenge" className="max-w-xs" onChange={(e) => changeChallenge(e)} isDisabled={challstatus}>
                                <SelectItem key="blank" value="blank" selected>Blank</SelectItem>
                                <SelectItem key="translate" value="translate">Translate</SelectItem>
                                </Select>
                            </Col>
                        </Row>
                        
                        <br/>

                        <Row style={{marginBottom: "30px"}}>
                            <Col>
                                <Select key={refreshSelects} label="Difficulty" placeholder="Choose the difficulty of Challenge" className="max-w-xs" onChange={(e) => changedifficulty(e)} isDisabled={diffstatus}>
                                    <SelectItem key="easy" value="easy">Easy</SelectItem>
                                    <SelectItem key="medium" value="medium">Medium</SelectItem>
                                    <SelectItem key="hard" value="hard">Hard</SelectItem>
                                </Select>
                            </Col>
                        </Row>

                        {/* <p style={{marginRight: '10px', color:"white"}}>Time of the Challenge:</p> */}
                        {/* <div style={{color: "white", height: "30px", border: "1px solid white", width: "200px", borderRadius: "5px"}}>{time}</div> */}

                        <p style={{marginRight: '10px', color:"Black", fontWeight: "bold"}}>Score of the Challenge:</p>
                        <div style={{color: "Black", height: "30px", border: "1px solid Black", width: "200px", borderRadius: "5px", boxShadow: "0px 0px 7px 1px rgba(112, 0, 153, 0.3)", fontWeight: "bold"}}>{score}</div>

                        <br/>

                        <p style={{marginRight: '10px', color:"Black", fontWeight: "bold"}}>Hossein's score: {userPoints}</p>

                        <Button className='special-button-success' style={{marginTop: '10px'}} onClick={() => startChallenge()} isDisabled={!startChallengeStatus}>Start Challenge</Button>
                    </Col>
                    
                    <Col md={9} align="center" style={{color: 'white', marginTop: '20px'}}>
                        <Row>
                            {/* <Col md={3} style={{borderRight: '1px solid white'}}>
                                <p>Romina</p>
                                <img src="User-profile.jpg" style={{borderRadius: '5px', marginTop: "20px"}} width={100} alt='user-profile-picture' />
                                <p style={{marginTop: "40px"}}>Level: B1</p>
                                <p style={{marginTop: "20px"}}>Age: 25</p>
                                <p style={{marginTop: "20px"}}>City: Turin</p>
                            </Col> */}
                            <Col md={{span: 8, offset: 2}} style={{height: "86vh",border: "6px solid #560bad" , boxShadow: "0px 0px 5px 0px #560bad", borderRadius: "15px", background: "white", color: "black"}}>
                                <Row style={{marginTop: "10px", fontWeight: "bold", fontSize: "18px"}} className='justify-content-md-center'>Challenge: {challenge === "translate" ? "Translate" : challenge.charAt().toUpperCase() + challenge.slice(1)}</Row>
                                <Row>
                                    <Col md={6}>
                                        <p style={{marginTop: '20px', fontWeight: "bold", fontSize: "18px"}}>Date: {dayjs().format("DD/MM/YYYY")}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p style={{marginTop: '20px', fontWeight: "bold", fontSize: "18px"}}>Difficulty: {difficulty.charAt().toUpperCase() + difficulty.slice(1)}</p>
                                    </Col>
                                </Row>

                                <Divider style={{ marginTop: '20px', height: '10px' }} />

                                <Row style={{marginTop: "20px"}} className='justify-content-md-center'>

                                    <Col md={12} style={{fontWeight: "bold", fontSize: "18px"}}>
                                         Question {c_started ? (qnumeber + 1) : null}
                                    </Col>
                                    <Col md={12} style={{marginTop: "20px", width: "95%",  borderRadius: "5px", height: "15vh", boxShadow: "0px 0px 5px 0px #560bad"}}>
                                        {c_started ? <p style={{marginTop: "10px", marginBottom: "10px", fontSize: "18px"}}>{questions[qnumeber].question}</p> : null}
                                    </Col>

                                    <Divider style={{ marginTop: '20px', height: '10px' }} />

                                    <Col md={12}>
                                        <Row className='justify-content-md-center' >
                                            {c_started && challenge === "translate" ? 
                                                <>
                                                    {answers[qnumeber].map((index, a) => {
                                                        return (
                                                            <Col md={10} key={index}>
                                                                <Form.Group>
                                                                    <Form.Label style={{fontWeight: "bold", fontSize: "18px"}}>Answer:</Form.Label>
                                                                    <Form.Control id={"trans-answer-" + a} as="textarea" rows={3} placeholder="Enter your answer" defaultValue={preans[a]} onChange={(e) => e.target.value} style={{marginTop: '20px', width: '90%', height: '120px', boxShadow: "0px 0px 5px 0px #560bad inset", fontSize: "18px"}}/>
                                                                </Form.Group>
                                                            </Col>
                                                        )
                                                    })}
                                                </>
                                            : null}
                                            
                                            {c_started && challenge === "blank" ? 
                                                <>
                                                    {answers[qnumeber].map((index, a) => {
                                                        return (
                                                            <Col md={6} key={index}>
                                                                <Form.Group>
                                                                    <Form.Label style={{fontWeight: "bold", fontSize: "18px"}}>Answer {a+1}</Form.Label>
                                                                    <Form.Control id={"answer-" + a} as="input" rows={1} defaultValue={preans[a]} style={{marginTop: '20px', width: '90%', height: '50px', boxShadow: "0px 0px 5px 0px #560bad inset"}}/>
                                                                </Form.Group>
                                                            </Col>
                                                        )
                                                    })}
                                                </>
                                            : null}
                                        </Row>
                                    </Col>

                                    <Col md={12}>
                                        {c_started ? <Button className="special-button" style={{marginTop: '30px', marginRight: "20px"}} onClick={() => prevQuestion()} isDisabled={prebtnstat}>Prevous</Button> : null}
                                        {c_started && !finish ? <Button className="special-button" style={{marginTop: '30px'}} onClick={() => nextQuestion()}>Next</Button> : null}
                                        {finish ? <Button className="special-button-success" style={{marginTop: '30px'}} onClick={() => getAnswers()}>Finish</Button> : null}
                                    </Col>
                                    
                                </Row>
                                
                                {/* <Row style={{marginTop: "20px"}}>
                                    <Col md={12} style={{marginBottom: "20px"}}>
                                    </Col>
                                    <Col md={12}>
                                        <Countdown date={Date.now() + cdtime} autoStart={false} ref={clockRef} onComplete={() => cd_complete()} />
                                    </Col>
                                </Row> */}
                            </Col>
                            {/* <Col md={3} style={{borderLeft: '1px solid white'}}>
                                {bot ? 
                                <>
                                    <p>______</p>
                                    <div style={{borderRadius: '5px', marginTop: "20px", border: "1px solid white", width: "100px", height: "100px"}}/>
                                    <p style={{marginTop: "40px"}}>Level: -</p>
                                    <p style={{marginTop: "20px"}}>Age: -</p>
                                    <p style={{marginTop: "20px"}}>City: -</p>
                                </>
                                : null}
                            </Col> */}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Challenge;
