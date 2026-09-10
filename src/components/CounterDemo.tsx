"use client";

import { useState } from "react";

export default function CounterDemo() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount((prevCount) => prevCount + 1);
        setCount((prevCount) => prevCount + 1);
        setCount((prevCount) => prevCount + 1); //จะเก็บค่าเดิมไว้แล้วมาบวกกัน
        console.log(`คลิกแล้ว ${count + 1} ครั้ง`);
    }

    return (
        <button type="button" onClick={handleClick}>
            คลิกแล้ว {count} ครั้ง
        </button>
    );
} 