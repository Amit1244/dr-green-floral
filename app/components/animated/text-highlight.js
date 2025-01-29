"use client";
import { useEffect, useRef } from "react";

export default function TextHightlight(props) {
    const div = useRef(null);

    const scrollBG = () => {
        const el = div.current;
        if (!el) return;
        if (
            el.getBoundingClientRect().top - window.innerHeight <= 0 &&
            el.getBoundingClientRect().bottom >= 0
        ) {
            el.style.backgroundPositionY = `${Math.abs(
                el.getBoundingClientRect().top - window.innerHeight
            )}px`;
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollBG);

        return () => {
            window.removeEventListener("scroll", scrollBG);
        };
    }, [div]);

    return (
        <div
            className="text-transparent bg-gradient-to-b from-transparent from-35% via-[#0f7a5e] via-55% to-transparent bg-clip-text bg-[length:100%_100vh] sm:bg-[length:100%_100vh] bg-top"
            ref={div}
        >
            {props.text}
        </div>
    );
}
