"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {useEffect} from "react";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    useEffect(() => {
        setTheme('light')
    }, []);

    return (
        <div className='fixed top-4 right-4'>
            <Button variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-full border-gray040 text-gray040"
            >
                {theme === "dark" ? (
                    <>
                    <SunIcon
                        className="text-gray-[#3182f6]"
                        onClick={() => setTheme("light")}
                    />
                    </>
                ) : (
                    <>
                    <MoonIcon
                        className="text-gray-[#3182f6]"
                        onClick={() => setTheme("dark")}
                    />
                    </>
                )}
            </Button>
        </div>
    )
}
