import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/themeProvider";
import "./globals.css";
import BgWrapper from "@/components/layouts/bgWrapper";

export const metadata: Metadata = {
    title: "Doctor Community",
    description: "Doctor Community",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="ko" suppressHydrationWarning className="dark">
            <body>
                <BgWrapper>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </BgWrapper>
            </body>
        </html>
    );
}