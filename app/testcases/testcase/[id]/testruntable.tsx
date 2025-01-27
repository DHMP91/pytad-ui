"use client"

import { ListTestBodyResponse, ListTestRunResponse, PyTADClient, TestRun } from "@/app/pytadclient"
import { usePathname, useSearchParams } from "next/navigation";



const displayedFields: string[]=  [
    "id",
    "name",
    "suite_id",
    "status",
    "start_time",
    "end_time",
    "marks",
    "product_version",
    "environment",
    "defects",
  ]


export default function TestRunTable({data}: {data: ListTestRunResponse}) {
    return (
        <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            {TableHeaders()}
          </tr>
        </thead>
        <tbody>
            {TestRunRows(data)}
        </tbody>
      </table>
    )
}


function TestRunRows(data: ListTestRunResponse){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const createPageURL = (version: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('version', version.toString());
        return `${pathname}?${params.toString()}`;
    }

    if(!(data === null)){
        const testRunRows = []
        const testRuns: TestRun[] = data.results
        const rowClassName = "border border-gray-300 px-4"
        for(const testRun of testRuns){
            const testCaseColumn = []
            
            //Test Case info
            for(const field of displayedFields){
                const value = testRun[field as keyof typeof testRun]
                if (typeof value === 'string' || typeof value === 'number' || value === null) {
                    testCaseColumn.push(
                    <td key={field} className={rowClassName}>
                        {value}
                    </td>
                    )
                } else {
                    <td key={field} className={rowClassName}>
                         `&quot;``&quot;`
                    </td>
                }
            }

            testRunRows.push(
                <tr 
                key={testRun['id']} 
                className="cursor-pointer hover:bg-gray-200 hover:shadow-lg transition duration-100"
                onClick={(e) => window.history.pushState(null, '', createPageURL(testRun.test_body_id))}
                >
                        {testCaseColumn}
                </tr>
            )
        }
        return testRunRows
    }
}

function TableHeaders() {
    const tableHeaders = []
    const className = "border border-gray-300 px-4 py-2 text-left bg-gray-100"
    for(const indx in displayedFields){
        tableHeaders.push(
        <th key={indx} className={className}>
            {displayedFields[indx]}
        </th>
        )
    }
    return tableHeaders
}