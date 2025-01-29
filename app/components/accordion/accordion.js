"use client";
import SingleAccordion from "./single-accordion";

export default function Accordion(props) {
    return (
        <>
            {props.items.map((item, index) => (
                <SingleAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                />
            ))}
        </>
    );
}
