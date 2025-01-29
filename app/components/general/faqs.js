import Accordion from "../accordion/accordion";
import GetContent from "@/lib/wp/get-content";

export default async function FAQs() {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        pageContent {
            faqsRepeater {
                answer
                question
            }
        }
    }
}
    `;

    const faqs = (await GetContent(query)).pageBy.pageContent.faqsRepeater;

    return (
        <div className="xl:w-2/3 mx-auto">
            <Accordion items={faqs} />
        </div>
    );
}
