"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useRef, useEffect } from "react";

export default function EligibleConditionsCarousel(props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
    });
    const buttonNext = useRef(null);
    const buttonPrev = useRef(null);

    const buttonDisable = (button) => {
        button.classList.add("opacity-50");
        button.disabled = true;
    };
    const buttonEnable = (button) => {
        button.classList.remove("opacity-50");
        button.disabled = false;
    };

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
        buttonEnable(buttonNext.current);
        if (!emblaApi.canScrollPrev()) {
            buttonDisable(buttonPrev.current);
        }
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
        buttonEnable(buttonPrev.current);
        if (!emblaApi.canScrollNext()) {
            buttonDisable(buttonNext.current);
        }
    }, [emblaApi]);

    useEffect(() => {
        buttonDisable(buttonPrev.current);
    });

    // const { selectedIndex, scrollSnaps, onDotButtonClick } =
    //     useDotButton(emblaApi);

    return (
        <div className="relative flex items-center gap-x-10 gap-y-8 flex-wrap lg:flex-nowrap">
            <button
                title="Previous slide"
                onClick={scrollPrev}
                ref={buttonPrev}
                className="min-h-[83px] min-w-[83px] rounded-full shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out order-2 lg:order-1"
            >
                <Image
                    src="/images/icons/prev-nav.svg"
                    alt="Previous Arrow"
                    width={83}
                    height={83}
                />
            </button>
            <div
                className="overflow-hidden max-w-full order-1 lg:order-2"
                ref={emblaRef}
            >
                <div className="flex items-start justify-between ml-[calc(2rem_*_-1)]">
                    {props.conditions.condition.map((condition, index) => (
                        <div
                            key={index}
                            className={`relative flex-[0_0_100%] md:flex-[0_0_50%] 2xl:flex-[0_0_33.33%] pl-8`}
                        >
                            <div className="rounded-[20px] border-2 border-[#EBCFA6] backdrop-blur-[44px]">
                                <p className="text-3xl font-semibold p-8 border-b-2 text-[#EBCFA6] border-[#EBCFA6]">
                                    {condition.condition}
                                </p>
                                <p className="p-8 text-base sm:text-lg font-light">
                                    {condition.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                title="Next slide"
                onClick={scrollNext}
                ref={buttonNext}
                className="min-h-[83px] min-w-[83px] rounded-full shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out order-3 lg:order-3"
            >
                <Image
                    src="/images/icons/next-nav.svg"
                    alt="Next Arrow"
                    width={83}
                    height={83}
                />
            </button>

            {/* <div className="sm:hidden flex gap-2 mt-8">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        title={"Slide " + (index + 1)}
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={`w-6 h-1 rounded-[20px] duration-500 ease-in-out ${
                            index === selectedIndex
                                ? "bg-[#85e679]"
                                : "bg-[#000000]"
                        }`}
                    />
                ))}
            </div> */}
        </div>
    );
}
