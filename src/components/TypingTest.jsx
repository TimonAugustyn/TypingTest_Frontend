import React, { useState, useRef, useEffect } from "react"
import useKeyPress from "../tools/useKeyPress";
import { isNull, isNullOrUndefined, noOp } from "../tools/TypingTest.helpers";
import "./typingTest.scss";
import { Link } from "react-router-dom";

const TypingTest = ({ text, onTypingTestResult }) => {
    const [accuracy, setAccuracy] = useState(0);
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(text.charAt(0));
    const [incomingChars, setIncomingChars] = useState(text.substr(1));
    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join(''),
    );
    const [startTime, setStartTime] = useState();
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [active, setActive] = useState(true);
    const [sentence, setSentence] = useState('');
    const currentTime = () => new Date().getTime();
    const [wrong, setWrong] = useState(0);

    const [timerActive, setTimerActive] = useState(false);
    const [time, setTimer] = useState(180);
    const ticks = useRef();

    //standard useEffect for counting down
    useEffect(() => {
        if (timerActive) {
                ticks.current = setInterval(() => {
                setTimer((time) => time - 1);
            }, 1000);
        } 
        else {
            clearInterval(ticks.current);
        }

        if (time === 0){
            setTimerActive(false);
            setActive(false);
        }

        if (active === false){
            setTimerActive(false);
        }
    
        return () => clearInterval(ticks.current);
    }, [timerActive, time, active]);

    const secsAsMins = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins.toString() + ":" + (secs === 0 ? "00" : secs.toString());
    };

    const finalTimeRemaining = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins.toString() + "." + (secs === 0 ? "00" : secs.toString());
    };
    
    let keyPressed;

    useKeyPress(key => {
        //sets the char we are working with to the inputted char
        keyPressed = key;
        //checks if the user can still type or if the test is completed
        if(active){
            //starts the timer
            if (!startTime) {
                setStartTime(currentTime());
                setTimerActive(true);
            }

            //creates the sentence we are working with in the map below this function
            setSentence(sentence + key);
            
            let updatedOutgoingChars = outgoingChars;//creates the text behinds the current char
            let updatedIncomingChars = incomingChars;//creates the text remaining after the current char

            if (keyPressed !== null) {
                
                if (leftPadding.length > 0) {
                    setLeftPadding(leftPadding.substring(1));
                }

                //adds the current char to the text behind
                updatedOutgoingChars += currentChar;
                setOutgoingChars(updatedOutgoingChars);
        
                //moves the current char forward
                setCurrentChar(incomingChars.charAt(0));
        
                //removes the current char form the remaining string
                updatedIncomingChars = incomingChars.substring(1);
                setIncomingChars(updatedIncomingChars);
        
                //determines the words per minute when the next char is ' '. Meaning this happens at the end of every word
                if (incomingChars.charAt(0) === ' ') {
                    setWordCount(wordCount + 1);
                    const durationInMinutes = (currentTime() - startTime) / 60000.0;
                    setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
                }
            }

            //sets a wrong char counter that will be used for determining the accuracy
            if (keyPressed !== updatedOutgoingChars.charAt(updatedOutgoingChars.length - 1)){
                setWrong(wrong + 1);
            }

            //determines accuracy
            if (currentChar !== ''){
                setAccuracy((((text.length - wrong) / text.length) * 100)
                .toFixed(2,),);
            }

            //ends test if there are no more text left to type
            if (incomingChars.charAt(0) === ''){
                setActive(false);
                setTimerActive(false);
            }
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();

        onTypingTestResult(wpm, accuracy, finalTimeRemaining(time))
    }
    
    return (
        <>
            <div className="outStanding">
                <form> 
                        <p>
                            <font size="+1.5">
                                {
                                    //splits entire paragraph into individual characters. This is for the styling for wrong inputs amd
                                    //where you currently are.
                                    //Then return each character with the appropriate styling
                                    text.split("").map((char, index) => {
                                        let correct = null;
                                        //check for when you haven't started yet
                                        if(isNullOrUndefined(sentence[index])){
                                            correct = null;
                                        }
                                        //sets correct to false if the latest char in sentence != char
                                        else if(char !== sentence[index]){
                                            correct = false;
                                        }
                                        return ( //returns the current char in the map and checks "correct" for the styling that it will use
                                            <span className={`${isNull(correct) ? '' : correct ? '' : 'wrong'} ${sentence.length === index ? 'current' : ''}`}>
                                                {char}
                                            </span>
                                        );
                                    })
                                }
                            </font>
                        </p>
                </form>
            </div>
            <div>
                <form onSubmit={noOp}>
                    {/*displayes the current stats*/}
                    <h3>
                        Words Per Minute: {wpm} | Accuracy: {accuracy}% | Remaining Time: {secsAsMins(time)}
                    </h3>
                    <div className="body">
                        <div className="sideBySide">
                            <button
                                type="submit" 
                                onClick={(e) => onSubmit(e)}
                                disabled={active}
                            >Submit
                            </button>
                            <Link to="/typing-test/admin">
                                <button type="button">
                                    Configure
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default TypingTest;
