"use client"

import { ListTestBodyResponse } from "@/app/pytadclient";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {default as materialLight} from "react-syntax-highlighter/dist/cjs/styles/prism/material-light";

export default function CodeTab ({data}: {data: ListTestBodyResponse}) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    let currentVersion = Number(searchParams.get('version')) || 0;
    const createPageURL = (version: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('version', version.toString());
        return `${pathname}?${params.toString()}`;
    }


    let empty: boolean = false
    if(data === null || data === undefined){
        empty = true
    }
    else if(data.results.length === 0){
        empty = true
    }
    
    if (!empty){
        let content: string | undefined
        if( currentVersion > 0){
            content = data.results.find((code) => code.id === currentVersion)?.code
        }else{
            currentVersion = data.results[0].id
            content = data.results[0].code
        }

        const tabs = []
        let start = data.results.length
        for(const code of data.results){  
            tabs.push({id: code.id, label: `v${start}`})
            --start
        }
        return (
            <div className="h-full w-full border rounded-md">
                {/* Tabs */}
                <div className="flex border-b mb-4">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.id}
                            className={`flex-1 text-center py-2 px-4 transition-colors duration-200 ${
                            currentVersion === tab.id
                                ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                                : "text-gray-500 hover:text-blue-500"
                            }`}
                            href={createPageURL(tab.id)}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-4 h-full overflow-auto">
                    <SyntaxHighlighter language="python" style={materialLight}>
                        {content}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    }else{
        return (
            <div className="w-full max-w-md mx-auto mt-8 p-4 border rounded-md">
                No test body code provided
            </div>
        )
    }
};