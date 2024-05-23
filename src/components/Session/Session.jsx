import React, { useState, useEffect, useRef } from 'react';
import "../Session/Session.css";
import alarm from "../../assets/alarm.mp3"

function Session() {
  const [time, setTime] = useState(1500);
  const [finished, setFinished] = useState(false);
  const [shake, setShake] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  function startTimer() {
    if (intervalRef.current !== null) return; 
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function resetTimer() {
    stopTimer();
    if(finished){
      setTime(300)
    }else{
      setTime(1500);
    }
  }

  function aumTimer(){
    setTime(time + 60)
  }

  function dimTimer(){
    setTime(time - 60)
    if(time < 60){
      setTime(0)
    }
  }

  useEffect(() => {
    return () => stopTimer(); 
  }, []);

  useEffect(() => {
    if (time === 0 && finished == false) {
      setFinished(true);
      setTime(300);
      stopTimer();
      setShake(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
      setTimeout(() => setShake(false), 3500)
    } else if( time === 0 && finished == true){
      setFinished(false);
      setTime(1500);
      stopTimer();
      setShake(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
      setTimeout(() => setShake(false), 3500)
    }
  }, [time]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function skipClick(){
    stopTimer();
    setFinished(!finished);
    if(finished == false){
      setTime(300)
    }else{
      setTime(1500);
    }
  }

  return (
    <section className='session-section'>
      <audio ref={audioRef} src={alarm} />
      <h1 className='session-h1'>Ultimate Pomodoro</h1>
      { finished 
        ?
        <article className={`break-article ${shake ? 'shake break-article' : ''}`}>
          <h2>Time to Break!</h2>
          <div className='session-div'>
            <h4 className='session-timer'>{formatTime(time)}</h4>
            <div className='btn-div'>
                <button onClick={startTimer} className='session-btn'>Start</button>
                <button onClick={stopTimer} className='session-btn'>Stop</button>
                <button onClick={resetTimer} className='session-btn'>Reset</button>
            </div>
          </div>
          <div className='time-modifier-div'>
            <h4>Break time modifier</h4>
            <div className='btn-div'>
              <button onClick={aumTimer} className='session-btn'>+</button>
              <button onClick={dimTimer} className='session-btn'>-</button>
            </div>
          </div>
          <button className='skip-btn' onClick={skipClick}>Skip!</button>
        </article>
        :
        <article className={`session-article ${shake ? 'shake session-article' : ''}`}>
          <h2>Study Time!</h2>
          <div className='session-div'>
            <h4 className='session-timer'>{formatTime(time)}</h4>
            <div className='btn-div'>
              <button onClick={startTimer} className='session-btn'>Start</button>
              <button onClick={stopTimer} className='session-btn'>Stop</button>
              <button onClick={resetTimer} className='session-btn'>Reset</button>
            </div>
          </div>
          <div className='time-modifier-div'>
            <h4>Session time modifier</h4>
            <div className='btn-div'>
              <button onClick={aumTimer} className='session-btn'>+</button>
              <button onClick={dimTimer} className='session-btn'>-</button>
            </div>
          </div>
          <button className='skip-btn' onClick={skipClick}>Skip!</button>
        </article>
      }
    </section>
      
  );
}

export default Session;
