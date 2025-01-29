import Header from "./components/header/header";
import Providers from "./components/next-auth/providers";
import "./globals.css";
import Footer from "./components/footer/footer";
import GetContent from "@/lib/wp/get-content";

export default async function RootLayout({ children }) {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        pageContent {
            primaryFontUrl
            primaryFontStyles
            secondaryFontStyles
            secondaryFontUrl
        }
    }
}
    `;
    const pageContent = (await GetContent(query)).pageBy.pageContent;

    return (
        <Providers>
            <html lang="en">
                <head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        rel="preconnect"
                        href="https://use.typekit.net"
                        crossOrigin="true"
                    />
                    <link
                        rel="preconnect"
                        href="https://p.typekit.net"
                        crossOrigin="true"
                    />
                    <link href={pageContent.primaryFontUrl} rel="stylesheet" />
                    <link
                        href={pageContent.secondaryFontUrl}
                        rel="stylesheet"
                    />
                    <style>
                        {`
                        body {
                            ${pageContent.primaryFontStyles}
                        }
                        .primary-font {
                            ${pageContent.primaryFontStyles}
                        }
                        .secondary-font {
                            ${pageContent.secondaryFontStyles}
                        }
                        `}
                    </style>
                </head>
                <body className="relative font-swear !bg-primary " id="root">

                    <Header />
                    {children}
                    <Footer />
                </body>
            </html>
        </Providers>
    );
}
