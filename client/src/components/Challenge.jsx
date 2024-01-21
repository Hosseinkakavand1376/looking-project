
import React, { useEffect, useState, useRef, useMemo } from 'react';
// ... [other imports]

const Challenge = ({setUserPoints, userPoints}) => {
    // State variables
    // ... [other state declarations]

    // Load state from localStorage on component mount
    useEffect(() => {
        const savedChallengeData = localStorage.getItem('challengeData');
        const savedScore = localStorage.getItem('score');
        const savedTime = localStorage.getItem('time');
        const savedCdtime = localStorage.getItem('cdtime');
        const savedQuestions = localStorage.getItem('questions');
        const savedAnswers = localStorage.getItem('answers');
        const savedUserAnswers = localStorage.getItem('userAnswers');
        const savedQnumber = localStorage.getItem('qnumber');

        if (savedChallengeData) setChallengeData(JSON.parse(savedChallengeData));
        if (savedScore) setScore(JSON.parse(savedScore));
        if (savedTime) setTime(JSON.parse(savedTime));
        if (savedCdtime) setCdtime(JSON.parse(savedCdtime));
        if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
        if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
        if (savedUserAnswers) setUserAnswers(JSON.parse(savedUserAnswers));
        if (savedQnumber) setQnumber(JSON.parse(savedQnumber));
    }, []);

    // Save state to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('challengeData', JSON.stringify(challengeData));
        localStorage.setItem('score', JSON.stringify(score));
        localStorage.setItem('time', JSON.stringify(time));
        localStorage.setItem('cdtime', JSON.stringify(cdtime));
        localStorage.setItem('questions', JSON.stringify(questions));
        localStorage.setItem('answers', JSON.stringify(answers));
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        localStorage.setItem('qnumber', JSON.stringify(qnumber));
    }, [challengeData, score, time, cdtime, questions, answers, userAnswers, qnumber]);

    // ... [rest of the component code]
};

export default Challenge;
