import Image from "next/image";
import Link from "next/link";
import FAQs from "./components/general/faqs";
import GetContent from "@/lib/wp/get-content";
import TextHightlight from "./components/animated/text-highlight";
import LowPowerModeVideo from "./components/general/low-power-mode-video";
import GenerateSignature from "@/lib/dapp/generate-signature";
import EligibleConditionsCarousel from "./components/carousels/eligible-conditions-carousel";
import NewsCarousel from "./components/carousels/news-carousel";
import ShopStrains from "./components/shop/strains/shop-strains";

export async function generateMetadata() {
    const query = ` 
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageContent {
            heroCelebrityPhoto {
                node {
                    sourceUrl
                }
            }
        }
    }
}
    `;
    const pageBy = (await GetContent(query)).pageBy;

    return {
        title: "Dr. Green: " + pageBy.title,
        description: "Your trusted source for medical cannabis.",
        openGraph: {
            images: [pageBy.pageContent.heroCelebrityPhoto.node.sourceUrl],
        },
    };
}

export default async function Home() {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageSide {
            featuredStrainId
        }
        pageContent {
            heroPlanet {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            heroCelebrityPhoto {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            referPlanet {
                node {
                    title
                    sourceUrl
                    mediaDetails {   
                        height
                        width
                    }
                }
            }
            largeParagraphText
            madePossibleParagraphText
            madePossibleBackgroundImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            madePossibleCelebrityImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            questionsBackgroundImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
    }
    globalContent {
        eligibleConditions {
            condition {
                condition
                description
            }
        }
        threeSteps {
            steps {
                description
                icon {
                    node {
                        mediaDetails {
                            height
                            width
                        }
                        sourceUrl
                        title
                    }
                }
                title
            }
        }
    }
}
    `;
    const content = (await GetContent(query)).pageBy;
    const global = (await GetContent(query)).globalContent;

    const featuredStrainId = content.pageSide.featuredStrainId;
    const payload = { strainId: featuredStrainId };
    const getStrains = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/strains/${payload.strainId}`,
        {
            method: "GET",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(payload),
                "Content-Type": "application/json",
            },
        }
    );
    const strain = await getStrains.json();

    const feed = await fetch(
        "https://rss.app/feeds/v1.1/uE6LV8h0fRax2HfE.json",
        {
            method: "GET",
        }
    );

    const rssItems = (await feed.json()).items;

    const availableLocations = strain?.data?.strainLocations.map((loc) => {
        if (loc.isAvailable) return loc.location.country;
    });

    let locationData;
    const fetchCountry = async () => {
        try {
            const response = await fetch(`${process.env.LOCATION}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            locationData = await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    await fetchCountry();

    return (
        <main>
            <section id="hero" className="bg-center flex  items-center  relative h-[50vh] md:min-h-screen overflow-hidden ">
                {/* <Image
                    src={content.pageContent.heroPlanet.node.sourceUrl}
                    alt={content.pageContent.heroPlanet.node.title}
                    width={ 
                        content.pageContent.heroPlanet.node.mediaDetails.width
                    }
                    height={
                        content.pageContent.heroPlanet.node.mediaDetails.height
                    }
                    priority
                    className="absolute top-[-25px] sm:top-0 left-0 max-w-[50%] sm:max-w-[25%]"
                /> */}
                <div className="container mx-auto px-4 ">
                    <div className="text-center">
                        <h1 className="text-[60px] font-swear text-[#EBCFA6] sm:text-[80px] md:text-[90px] lg:text-[120px] 2xl:text-[140px] mb-4 sm:mb-6 relative z-10">
                            Welcome to <br />
                            <span className="text-[#EBCFA6]">
                                {/*  {content.title} */} Goldilocks
                            </span>

                        </h1>
                        {/* <div className="text-center mt-8 sm:mt-10">
                            <Link href="/dashboard/eligibility">
                                <button
                                    className="uppercase py-4 px-6 rounded-full bg-[#C41242] border-[#C41242] text-[#FFDDAC] border-2 text-[15px] shadow hover:shadow-[0_0_10px_0px_#0aba90] duration-200 ease-in-out"
                                    title="Check Eligibility"
                                >
                                    SHOP NOW
                                </button>
                            </Link>
                        </div> */}
                        <p className="hidden lg:flex justify-center items-center gap-4 animate-bounce text-lg font-semibold relative z-10 pt-60">
                            <Image
                                src="/images/icons/mouse-icon.svg"
                                alt="Mouse Icon"
                                width={14}
                                height={19}
                                priority
                            />
                            Scroll to Discover
                        </p>
                    </div>
                </div>
                <Image
                    className="fixed -left-44 block top-full 2xl:top-[30%] max-w-[40%] max-h-full  object-fit w-auto h-auto object-left z-50 pointer-events-none"
                    src="/images/general/leaf.svg"
                    alt="Rock"
                    priority
                    width={735}
                    height={910}
                />
                <Image
                    className="fixed -right-0 -rotate-90   block top-full 2xl:top-[30%] max-w-[40%] max-h-full  object-fit w-auto h-auto object-left z-50 pointer-events-none"
                    src="/images/general/leaf.svg"
                    alt="Rock"
                    priority
                    width={735}
                    height={910}
                />
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:right-0  hidden md:block top-1/2   md:top-[70%] 2xl:top-[30%] md:max-w-[40%] max-h-full  object-fit w-auto h-auto object-left z-[-10] pointer-events-none">
                    <img
                        src={
                            content.pageContent.heroCelebrityPhoto.node
                                .sourceUrl
                        }
                        alt={content.pageContent.heroCelebrityPhoto.node.title}
                        width={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.height
                        }
                        // priority
                        className="object-contain object-right-bottom md:ml-[25%]"
                    />
                </div>
            </section>

            {/* <section className="pt-20 sm:pt-0" id="process">
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-center text-4xl sm:text-4xl sm:text-[50px] leading-tight mb-8">
                            Access your treatment <br />
                            <div className="text-[#EBCFA6] mt-2">
                                in three easy steps
                            </div>
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 xl:gap-x-20 gap-y-10 text-center">
                            {global.threeSteps.steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={
                                        global.threeSteps.steps.length == i + 1
                                            ? "col-span-1 sm:col-span-2 lg:col-span-1 w-full sm:w-[50%] lg:w-full mx-auto"
                                            : ""
                                    }
                                >
                                    <Image
                                        className="mb-4 mx-auto"
                                        src={step.icon.node.sourceUrl}
                                        alt={step.icon.node.title}
                                        width={
                                            step.icon.node.mediaDetails.width
                                        }
                                        height={
                                            step.icon.node.mediaDetails.height
                                        }
                                    />
                                    <h3 className="text-3xl font-semibold mb-4 text-[#EBCFA6]">
                                        {step.title}
                                    </h3>
                                    <p className="text-xl font-light">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10 sm:mt-20">
                            <Link href="/dashboard/eligibility">
                                <button
                                    className="uppercase py-4 px-6 rounded-full bg-[#C41242] border-[#C41242] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                    title="Check Eligibility"
                                >
                                    Check Eligibility
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* <section className="pt-40" id="eligibile-conditions">
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-4xl sm:text-[50px] ml-4 text-[#EBCFA6] leading-tight mb-8 max-w-[900px]">
                            What type of eligible conditions can we help with?
                        </h2>
                        <EligibleConditionsCarousel
                            conditions={global.eligibleConditions}
                        />
                    </div>
                </div>
            </section> */}

            {
                availableLocations && locationData && availableLocations?.[0].toLowerCase().replace(/\s+/g, "") !== locationData?.country?.toLowerCase().replace(/\s+/g, "") && (
                    <>
                        <section id="shop-by-strain" className="relative">
                            <div className="container mx-auto px-4 xl:px-40">
                                <h2 className="mb-8 text-[#EBCFA6]">
                                    Shop <br />
                                    <span className="text-[#C41242]">by strain</span>
                                </h2>
                                <ShopStrains />
                            </div>
                            <Image className="absolute  left-0 top-1/2 -translate-y-1/2 object-contain drop-shadow-xl shadow-primary -z-10 pointer-events-none"
                                src="/images/general/red-flower.png"
                                alt="White Flower"
                                width={735}
                                height={910}
                            />
                        </section>
                    </>
                )
            }



            <div className="relative flex justify-center px-10">
                <section className="relative  overflow-hidden  text-white mt-16 py-32 rounded-lg container mx-auto lg:w-[80%] ">
                    <div className="absolute bg-[#134E42] bg-opacity-90  w-full h-full inset-0"></div>
                    <video
                        className="absolute mix-blend-screen  -right-36 h-full  z-10 object-cover rounded-2xl"
                        src="/videos/green-flower.mp4"
                        autoPlay
                        loop
                        muted
                    ></video>
                    {/* Content */}
                    <div className="relative flex flex-col  items-center text-center z-10">
                        <p className="text-sm uppercase tracking-wide text-[#57837A] font-bold mb-2">
                            Need a Prescription?
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#EBCFA6] font-medium mb-6 leading-tight">
                            Refer to your doctor
                        </h2>
                        <Link href="/dashboard/eligibility">
                            <button className="text-[#EBCFA6] border font-sans uppercase border-[#EBCFA6] py-4 px-8 font-medium rounded-full hover:bg-[#EBCFA6] hover:text-[#134E42] transition duration-300">
                                Refer Now
                            </button>
                        </Link>
                    </div>
                </section>

                {/* White flower image */}
                <Image
                    className="absolute  right-0 top-1/2 object-contain drop-shadow-xl shadow-primary -z-10 pointer-events-none"
                    src="/images/general/white-flower.png"
                    alt="White Flower"
                    width={735}
                    height={910}
                />
            </div >



            {/* <section className="mt-40 relative">
                <Image
                    className="absolute right-0 top-[50%] lg:top-0 max-w-full w-auto object-fit object-left z-[-10] pointer-events-none"
                    src={content.pageContent.referPlanet.node.sourceUrl}
                    // src="images/general/whiteFlower.svg"
                    alt={content.pageContent.referPlanet.node.title}
                    width={
                        content.pageContent.referPlanet.node.mediaDetails.width
                    }
                    height={
                        content.pageContent.referPlanet.node.mediaDetails.height
                    }
                />
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-lg font-semibold tracking-wider mb-8 text-[#EBCFA6]">
                            NEED A PRESCRIPTION?
                        </p>
                        <h2 className="text-5xl sm:text-[74px] mb-10">
                            Check your{" "}
                            <span className="text-[#EBCFA6]">eligibility</span>
                        </h2>
                        <Link href="/dashboard/eligibility">
                            <button
                                className="uppercase py-4 px-6 rounded-full bg-[#C41242] border-[#C41242] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                title="Check Eligibility"
                            >
                                Check Eligibility
                            </button>
                        </Link>
                    </div>
                </div>
            </section> */}

            < section className="mt-10 lg:mt-40 py-10 sm:py-16 relative" >
                {/* <div className="absolute top-0 left-0 w-full h-full z-[-10] pointer-events-none mask-top-bottom mix-blend-screen">
                    <LowPowerModeVideo
                        image={
                            <Image
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                src="/images/general/smoke-poster.webp"
                                alt="Smoke"
                                width={1920}
                                height={1080}
                            />
                        }
                        video={
                            <video
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                muted
                                loop 
                                playsInline
                                autoPlay
                                preload="none" 
                                poster="/images/general/smoke-poster.webp"
                                width={1920}
                                height={1080}
                            >
                                <source
                                    src="/videos/smoke.mp4"
                                    type="video/mp4" 
                                />
                                Your browser does not support the video tag.
                            </video>
                        }
                    />
                </div> */}
                < div className="container mx-auto lg:w-[80%]  px-10 " >
                    <div className="text-center text-[#EBCFA6]">
                        <h2>Blue Dream <br />from {content.title}</h2>
                    </div>
                    <div className="relative mx-auto sm:max-w-[80%] md:max-w-full backdrop-blur-[10px] rounded-[10px] border-4 border-[#EBCFA6] p-8 sm:p-16 mt-8 sm:mt-16 grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                        <button
                            className="uppercase absolute -top-6 right-5 text-black py-4 px-6 rounded-full bg-[#EBCFA6] text-[15px] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                            title="Eligible Conditions"
                        >
                            EXCLUSIVE FROM FREDO
                        </button>
                        <div className="relative w-[100%] lg:w-[80%]  px-10 h-0 pb-[100%] lg:pb-[80%] mx-auto">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_IMAGE_SERVER +
                                    strain.data.imageUrl
                                }
                                alt={strain.data.name}
                                fill
                                className="sm:p-10 animate-wiggle animate-duration-[4000ms] animate-infinite rounded-full"
                            />
                        </div>
                        <div>
                            <p className="text-3xl font-semibold text-[#EBCFA6]">
                                {strain.data.name}
                            </p>
                            <hr className="h-[2px] border-none bg-[#0aba90] my-10" />
                            <p className="text-xl mb-4 text-[#EBCFA6]">
                                <span className="font-bold">FEELINGS: </span>
                                {strain.data.feelings}
                            </p>
                            <p className="text-xl mb-4 text-[#EBCFA6]">
                                <span className="font-bold">HELPS WITH: </span>
                                {strain.data.helpsWith}
                            </p>
                            <p className="text-xl mb-16 text-[#EBCFA6]">
                                <span className="font-bold">FLAVOURS: </span>
                                {strain.data.flavour}
                            </p>
                            <Link href="#eligibile-conditions">
                                <button
                                    className="uppercase py-4 px-6 rounded-full bg-[#C41242] border-[#C41242] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                    title="Eligible Conditions"
                                >
                                    Eligible Conditions
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-20 sm:pt-80 pb-80 relative">
                <Image
                    className="absolute right-0 bottom-0 max-w-[50%] sm:max-w-[40%] md:max-w-[30%] h-auto w-auto object-fit object-left z-[-10] pointer-events-none"
                    src="/images/general/flower.svg"
                    alt="Comet"
                    width={735}
                    height={910}
                />
                <div className="container mx-auto px-4">
                    <div className="lg:w-[80%]  px-10 m-auto">
                        <TextHightlight
                            text={
                                <p
                                    className="text-4xl sm:text-5xl lg:text-[47px] font-bold leading-tight"
                                    dangerouslySetInnerHTML={{
                                        __html: content.pageContent
                                            .largeParagraphText,
                                    }}
                                />
                            }
                            class="home-text"
                        />
                    </div>
                </div>
            </section>

            {/* 
            <section className="mt-20 sm:mt-0">
                <div className="container mx-auto px-4">
                    <div>
                        <p className="text-[#EBCFA6] text-lg font-semibold tracking-wider mb-2">
                            NEWS / UPDATES
                        </p>
                        <h2 className="text-4xl text-[#EBCFA6] sm:text-[50px] leading-tight mb-8">
                            Dr. Green In The Press
                        </h2>
                        <NewsCarousel items={rssItems} />
                    </div>
                </div>
            </section> */}


            {/* made-with-possible */}


            <div className="mx-auto container lg:w-[80%] px-10">
                <h2 className="text-4xl sm:text-[50px] text-[#EBCFA6] font-semibold mb-6">
                    Made possible <br />
                </h2>
                <div className="flex items-center -mt-6">
                    <div className="text-center text-[#EBCFA6] mt-0 text-[40px]">with</div>
                    <img className="w-[200px] md:w-auto  h-[100px]" src="/images/email/dr-green.png" alt="" />
                </div>
                <p
                    className="text-[22px] font-light max-w-[750px] text-[#EBCFA6] mb-8"
                    dangerouslySetInnerHTML={{
                        __html: content.pageContent
                            .madePossibleParagraphText,
                    }}
                />
                <Link href="https://drgreennft.com/" target="_blank">
                    <button
                        className="uppercase py-4 px-6 rounded-full bg-[#25685B] border-[#25685B] text-[#EBCFA6] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                        title="Learn More"
                    >
                        Learn More
                    </button>
                </Link>

            </div>

            <section className="relative h-full w-full py-20 md:py-40">


                <video
                    className=" h-full w-full  mask-top-bottom"
                    src="/videos/flowerWave.mp4" // Replace with your actual local video path
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <img
                    // src="/images/general/made.gif"
                    src={content.pageContent.heroCelebrityPhoto.node
                        .sourceUrl}
                    alt="Shadow"
                    className="absolute top-[10%] 2xl:top-[20%] right-0 aspect-auto"
                />

                {/* <div className="mt-10  pointer-events-none">
                    <div className="ml-auto w-fit flex flex-col justify-center items-center max-w-full">
                        <div className="h-full pb-[100%] relative max-w-full ">
                            <div className="absolute right-0  hidden sm:block top-[70%] 2xl:top-[30%] max-w-[40%] max-h-full  object-fit w-auto h-auto object-left z-[-10] pointer-events-none">
                                <img
                                    src={
                                        content.pageContent.heroCelebrityPhoto.node
                                            .sourceUrl
                                    }
                                    alt={content.pageContent.heroCelebrityPhoto.node.title}
                                    width={
                                        content.pageContent.heroCelebrityPhoto.node
                                            .mediaDetails.width
                                    }
                                    height={
                                        content.pageContent.heroCelebrityPhoto.node
                                            .mediaDetails.height
                                    }
                                    // priority
                                    className="object-contain  object-right-bottom "
                                />
                            </div>
                        </div>

                    </div>
                </div> */}
            </section>

            <section className="relative py-10 md:py-10 xl:py-10" id="faqs">
                {/* <Image
                    className="absolute bottom-0 left-0 w-full h-full object-right md:object-bottom-right object-cover md:object-fit mask-top-bottom pointer-events-none z-[-10]"
                    src={
                        content.pageContent.questionsBackgroundImage.node
                            .sourceUrl
                    }
                    alt={
                        content.pageContent.questionsBackgroundImage.node.title
                    }
                    width={
                        content.pageContent.questionsBackgroundImage.node
                            .mediaDetails.width
                    }
                    height={
                        content.pageContent.questionsBackgroundImage.node
                            .mediaDetails.height
                    }
                /> */}
                <div className="container mx-auto px-4">
                    <div>
                        <div className="text-center mb-5 md:mb-20">
                            <h2 className="text-5xl sm:text-[74px] xl:text-[140px] text-[#EBCFA6] font-semibold">
                                Questions?
                            </h2>
                            <p className="text-2xl pt-3 text-[#EBCFA6] sm:text-3xl xl:text-52px font-semibold">
                                We&apos;ve got answers...
                            </p>
                        </div>
                        <FAQs />
                    </div>
                </div>
            </section>

            <section className="mt-20">
                <div className="container mx-auto px-4">
                    <div>
                        <div className=" text-center">
                            <p className="text-3xl font-semibold mb-4 text-[#EBCFA6]">
                                Something else on your mind? 🧐
                            </p>
                            <Link href="mailto:support@drgreennft.com">
                                <button
                                    className="uppercase py-4 px-6 rounded-full bg-[#25685B] border-[#25685B] text-[#EBCFA6] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#0ABA90] duration-200 ease-in-out"
                                    title="Reach Out"
                                >
                                    Reach Out
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
}
