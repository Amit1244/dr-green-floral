"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

export default function NewsCarousel(props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
    });

    return (
        <div className="overflow-hidden max-w-full" ref={emblaRef}>
            <div className="flex items-start ml-[calc(2rem_*_-1)]">
                {props.items.map((post, index) => (
                    <div
                        key={index}
                        className="relative flex-[0_0_85%] md:flex-[0_0_75%] lg:flex-[0_0_40%] 2xl:flex-[0_0_30%] pl-8"
                    >
                        <div>
                            {post.image && (
                                <div className="relative h-0 pb-[100%] mb-8">
                                    <Image
                                        className="rounded-[20px] object-cover"
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                    />
                                </div>
                            )}
                            <p className="text-[28px] font-semibold leading-tight mb-8">
                                {post.title}
                            </p>
                            <p className="text-[15px] font-light mb-8">
                                {post.content_text}
                            </p>
                            {post.url && (
                                <Link
                                    className="uppercase text-[#0aba90] text-lg tracking-wide font-semibold"
                                    href={post.url}
                                    target="_blank"
                                    title="Read More"
                                >
                                    READ MORE
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
