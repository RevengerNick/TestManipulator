import { useState, useRef, useEffect, useCallback } from 'react';
import { optimizeAdvanced, clearOptimizerCache } from '../utils/commandOptimizer';

export const useManipulator = () => {
    const [fields, setFields] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
    const [isClawClosed, setIsClawClosed] = useState(false);
    const [hasSample, setHasSample] = useState(false);
    const [manipulatorPos, setManipulatorPos] = useState({ y: 0, x: 0 });
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(300);
    const [originalCommand, setOriginalCommand] = useState("");
    const [optimizedCommand, setOptimizedCommand] = useState("");
    const hasSampleRef = useRef(hasSample);

    useEffect(() => {
        hasSampleRef.current = hasSample;
    }, [hasSample]);

    useEffect(() => {
        const newFields = [["", "", ""], ["", "", ""], ["", "", ""]];
        const coords: [number, number][] = [];
        for (let i = 0; i < 3; i++) { for (let j = 0; j < 3; j++) { coords.push([i, j]); } }
        coords.sort(() => Math.random() - 0.5);
        const count = Math.floor(Math.random() * 2) + 2;
        for (let k = 0; k < count; k++) {
            const [x, y] = coords[k];
            newFields[x][y] = "образец";
        }
        setFields(newFields);
    }, []);

    useEffect(() => {
        clearOptimizerCache();
        const filteredCommand = originalCommand.toUpperCase().split('').filter(c => "ЛПВНОБ".includes(c)).join('');
        setOptimizedCommand(optimizeAdvanced(filteredCommand));
    }, [originalCommand]);

    const handleStartAnimation = useCallback(() => {
        const validCommands = originalCommand.toUpperCase().split('').filter(c => "ЛПВНОБ".includes(c));
        if (isAnimating || validCommands.length === 0) return;

        setIsAnimating(true);
        setHasSample(false);
        setIsClawClosed(false);
        setManipulatorPos({ y: 0, x: 0 });

        setTimeout(() => {
            let currentPos = { y: 0, x: 0 };
            let commandIndex = 0;
            const processNextCommand = () => {
                if (commandIndex >= validCommands.length) {
                    setIsAnimating(false);
                    return;
                }
                const command = validCommands[commandIndex];
                let nextPos = { ...currentPos };

                switch (command) {
                    case 'П': nextPos.x++; break;
                    case 'Л': nextPos.x--; break;
                    case 'Н': nextPos.y++; break;
                    case 'В': nextPos.y--; break;
                    case 'О':
                        setFields(currentFields => {
                            if (currentFields[currentPos.y][currentPos.x] === "образец" && !hasSampleRef.current) {
                                setIsClawClosed(true);
                                setHasSample(true);
                                
                                const newFields = currentFields.map(r => [...r]);
                                newFields[currentPos.y][currentPos.x] = "";
                                return newFields;
                            }
                            return currentFields;
                        });
                        break;
                    
                    case 'Б':
                        if (hasSampleRef.current) {
                            setHasSample(false);
                            setFields(currentFields => {
                                const newFields = currentFields.map(r => [...r]);
                                newFields[currentPos.y][currentPos.x] = "образец";
                                return newFields;
                            });
                            setTimeout(() => setIsClawClosed(false), 100);
                        }
                        break;
                }
                if (nextPos.x >= 0 && nextPos.x < 3 && nextPos.y >= 0 && nextPos.y < 3) {
                    currentPos = nextPos;
                    setManipulatorPos(currentPos);
                }
                commandIndex++;
                const delay = (command === 'О' || command === 'Б') ? animationSpeed + 350 : animationSpeed;
                setTimeout(processNextCommand, delay);
            };
            processNextCommand();
        }, 10);
    }, [originalCommand, isAnimating, animationSpeed]);

    return {
        fields, manipulatorPos, isClawClosed, hasSample, isAnimating,
        animationSpeed, setAnimationSpeed, originalCommand, setOriginalCommand,
        optimizedCommand, handleStartAnimation
    };
};