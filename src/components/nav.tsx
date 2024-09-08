"use client";

// import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import SettingsView from "@/components/settings-view";
import { Suspense } from "react";
import config from "@/config";

export function Nav() {
  // const [scrolled, setScrolled] = useState(false)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isScrolled = window.scrollY > 20
  //     if (isScrolled !== scrolled) {
  //       setScrolled(isScrolled)
  //     }
  //   }
  //
  //   document.addEventListener('scroll', handleScroll, { passive: true })
  //
  //   return () => {
  //     document.removeEventListener('scroll', handleScroll)
  //   }
  // }, [scrolled])

  return (
    <header
      className={` z-50 duration-300 ease-in-out ${
        // scrolled
        "bg-white/50 backdrop-blur-md h-16"
        // : 'bg-white h-16'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <h1
          className={`font-bold transition-all duration-300 ease-in-out text-xl`}
        >
          CombAnalyser
        </h1>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Button variant="ghost" asChild>
                <a href={config.appstore.appURL} target={"_blank"}>
                  Get the app
                </a>
              </Button>
            </li>
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className={"max-h-[calc(100vh_-_64px)] overflow-scroll"}
                >
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                  </DialogHeader>
                  <Suspense>
                    <SettingsView />
                  </Suspense>
                </DialogContent>
              </Dialog>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
