import { useState, useEffect } from 'react';

const useKeyPress = callback => {
    const [keyPressed, setKeyPressed] = useState();

    useEffect(() => {
        //checks if the pressed key is the same as before and if it is a single digit
        const downHandler = ({ key }) => {
            if (keyPressed !== key && key.length === 1) {
                setKeyPressed(key);
                callback && callback(key);
            }
        };
        //when the key is released this sets it back to null
        const upHandler = () => {
            setKeyPressed(null);
        };

        //actually checks if a key is pressed and released
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);  
        
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }); 
    return keyPressed;
};

export default useKeyPress;