import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/themeProvider";
import "./globals.css";
import BgWrapper from "@/components/layouts/bgWrapper";

export const metadata: Metadata = {
    title: {template: "%s | Doctor Community", default: "Doctor Community"},
    description: "국내 유일, 실시간 병원 접수/예약 서비스.",
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