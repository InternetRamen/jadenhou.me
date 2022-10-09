import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head />
            <body className="dark:bg-blue-dark">
                <Main />
                <NextScript />
                <script async src="https://cdn.splitbee.io/sb.js"></script>
            </body>
        </Html>
    );
}
