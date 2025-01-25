"use client"

import { ListTestBodyResponse } from "@/app/pytadclient";
import { useState } from "react";

export default function CodeTab ({data}: {data: ListTestBodyResponse}) {
    let empty: boolean = false
    const [activeTab, setActiveTab] = useState(1);
    if(data === null || data === undefined){
        empty = true
    }
    else if(data.results.length === 0){
        empty = true
    }
    
    if (!empty){
        const content = data.results.find((code) => code.id === activeTab)?.code
        const tabs = []
        let start = data.results.length
        for(const code of data.results){  
            tabs.push({id: code.id, label: `v${start}`})
            --start
        }
        return (
            <div className="w-full max-w-md mx-auto mt-8 p-4 border rounded-md">
                {/* Tabs */}
                <div className="flex border-b mb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`flex-1 text-center py-2 px-4 transition-colors duration-200 ${
                            activeTab === tab.id
                                ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                                : "text-gray-500 hover:text-blue-500"
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-4">
                    <div>{content}</div>
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