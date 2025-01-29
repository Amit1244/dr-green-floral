"use client";

import { useRef, useState, useEffect } from "react";

export default function LowPowerModeVideo(props) {
    const videoDiv = useRef(null);
    const [isLowPowerMode, setIsLowPowerMode] = useState(false);

    useEffect(() => {
        if (videoDiv.current) {
            videoDiv.current
                .querySelector("video")
                .play()
                .then(() => {})
                .catch((error) => {
                    if (error.name === "NotAllowedError")
                        setIsLowPowerMode(true);

                    return error;
                });
        }
    }, []);

    return (
        <>
            {isLowPowerMode ? (
                props.image
            ) : (
                <div ref={videoDiv}>{props.video}</div>
            )}
        </>
    );
}
