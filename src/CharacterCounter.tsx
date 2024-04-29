import { ReactElement, createElement, useRef, useState, useEffect } from "react";
import { CharacterCounterContainerProps } from "../typings/CharacterCounterProps";
import "./ui/CharacterCounter.css";

export function CharacterCounter({ content, characterLimit }: CharacterCounterContainerProps): ReactElement {
    const [currentInput, setCurrentInput] = useState<string>("");
    const myContainerRef = useRef<HTMLDivElement>(null)

    const onInputChange = (e: Event): void => {
        if (e) {
            setCurrentInput((e.target as HTMLInputElement).value);
        }
    };

    const charLimitStyles = () => {
        const charLength = currentInput.length;
        const charLimit = characterLimit ? characterLimit : 0;
        
        if (charLength > charLimit * 0.8) {
            return "character_counter_80_percent";
        }
        
        if (charLength > charLimit * 0.6) {
            return "character_counter_60_percent";
        }

        return "";
    }

    useEffect(() => {
        let eventListener: Element;

        if (myContainerRef.current) {
            const inputElements = myContainerRef.current.querySelectorAll("input")

            if (inputElements.length) {
                eventListener = inputElements[0];
                eventListener.addEventListener("input", onInputChange)
            }
        };

        return () => {
            eventListener.removeEventListener("input", onInputChange);
        };
    }, [myContainerRef]);

    return (
        <div className={`${charLimitStyles()} character_counter`}>
            <div ref={myContainerRef}>
                {content}
            </div>
            <span>{currentInput.length} / {characterLimit}</span>
        </div>
    );
}
