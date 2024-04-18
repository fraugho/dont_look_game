"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import "./globals.css";

type FocusedButton = 'left' | 'up' | 'down' | 'right';

export default function Page() {
    const [button_pressed, set_button_pressed] = useState<FocusedButton | null>(null);
    const [prompted_direction, set_prompted_direction] = useState<FocusedButton | null>(null);
    const [correct, set_correct] = useState<boolean | null>(null);

    useEffect(() => {
        const handle_key_down = (event: KeyboardEvent) => {
            let key_map: {[key: string]: FocusedButton} = {
                'a': 'left', 'h': 'left',
                's': 'down', 'j': 'down',
                'w': 'up', 'k': 'up',
                'd': 'right', 'l': 'right'
            };

            if (key_map[event.key]) {
                set_button_pressed(key_map[event.key]);
            }
        };

        window.addEventListener('keydown', handle_key_down);

        return () => {
            window.removeEventListener('keydown', handle_key_down);
        };
    }, []);

    useEffect(() => {
        if (button_pressed && button_pressed === prompted_direction) {
            set_correct(true);
        } else if (button_pressed) {
            set_correct(false);
        }
        set_button_pressed(null);
    }, [button_pressed]);

    useEffect(() => {
        const interval_id = setInterval(generate_random_direction, 1000);

        return () => clearInterval(interval_id);
    }, []);

    const generate_random_direction = () => {
        const directions: FocusedButton[] = ["left", "up", "down", "right"];
        const random_direction = directions[Math.floor(Math.random() * directions.length)];
        set_prompted_direction(random_direction);
    }

    return (
        <div className="overflow-hidden">
            <div className="prompted-direction">
                <p>Please press: {prompted_direction?.toUpperCase()}</p>
            </div>
            <div className="bg-green">
                <p>You are {correct === null ? "waiting for input": correct ? "correct": "incorrect"}</p>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className="flex items-center max-w-screen">
                    <Button className={`${button_pressed === 'left' ? 'bg-blue-500' : ''}`}>Left</Button>
                    <div className="flex flex-col justify-center">
                        <Button className={`mb-10 ${button_pressed === 'up' ? 'bg-blue-500' : ''}`}>Up</Button>
                        <Button className={`${button_pressed === 'down' ? 'bg-blue-500' : ''}`}>Down</Button>
                    </div>
                    <Button className={`${button_pressed === 'right' ? 'bg-blue-500' : ''}`}>Right</Button>
                </div>
            </div>
        </div>
    );
};
