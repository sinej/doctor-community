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
                    className="w-12 h-12"
            >
                {theme === "dark" ? (
                    <SunIcon
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        onClick={() => setTheme("light")}
                    />
                ) : (
                    <MoonIcon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        onClick={() => setTheme("dark")}
                    />
                )}
            </Button>
        </div>
    )
}
