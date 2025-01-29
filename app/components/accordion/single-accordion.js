"use client";

export default function SingleAccordion(props) {
    const toggleAccordion = (item) => {
        if (item.classList.contains("open")) {
            item.querySelector(".accordion-container").style.height = `0px`;
            item.classList.remove("open");
            item.querySelector(".each-accordion button").classList.remove(
                "open"
            );
            item.querySelector(".each-accordion .open-line").classList.remove(
                "opacity-0"
            );
        } else {
            item.querySelector(".accordion-container").style.height = `${item.querySelector(".accordion-text").getBoundingClientRect()
                .height
                }px`;
            item.classList.add("open");
            item.querySelector(".each-accordion button").classList.add("open");
            item.querySelector(".each-accordion .open-line").classList.add(
                "opacity-0"
            );
        }
    };

    return (
        <div className="each-accordion w-full text-left mb-4 border-2 border-[#25685B] rounded-[40px] bg-transparent">
            <button
                className="w-full text-left text-[#EBCFA6] text-lg font-montserrat  font-normal py-6 px-6 sm:px-12 flex justify-between items-center gap-4 rounded-[40px]"
                onClick={(e) => {
                    toggleAccordion(e.target.closest(".each-accordion"));
                }}
                title={props.question}
            >
                {props.question}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="min-w-[14px] min-h-[14px]"
                >
                    <path
                        d="M6.75 0V13.5"
                        stroke="#25685B"
                        strokeWidth="2"
                        className="open-line duration-500 ease-in-out"
                    />
                    <path
                        className="open-line duration-500 ease-in-out"
                        d="M13.5 6.75L-3.57628e-07 6.75"
                        stroke="#25685B"
                        strokeWidth="2"
                    />
                </svg>
            </button>
            <div className="accordion-container w-full h-[0px] overflow-hidden duration-500 ease-in-out">
                <div className="accordion-text pb-6 px-6 sm:px-12 rounded-[40px]">
                    <p className="font-light">{props.answer}</p>
                </div>
            </div>
        </div>
    );
}
