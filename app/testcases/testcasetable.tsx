"use client"

import { TestCase, TestRun, ListTestCaseResponse } from "@/app/pytadclient"

const displayedFields: string[]=  [
    "id",
    "name",
    "relative_path",
    "internal_id",
    // "code_hash",
    // "create_date",
  ]

const getStatusColor = (status: TestRun["status"]) => {
    switch (status) {
      case "PASSED":
        return "bg-green-500";
      case "FAILED":
        return "bg-red-500";
      case "SKIPPED":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };
  
export default function TestCaseTable({data}: {data: ListTestCaseResponse}) {
    return (
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            {TableHeaders()}
          </tr>
        </thead>
        <tbody>
            {TestCaseRows(data)}
        </tbody>
      </table>
    );
}
  
function TestCaseRows(data: ListTestCaseResponse){
    if(!(data === null)){
        const testCaseRows = []
        const testcases: TestCase[] = data.results
        const rowClassName = "border border-gray-300 px-4"
        for(const testcase of testcases){
            const testCaseColumn = []
            
            //Test Case info
            for(const field of displayedFields){
                const value = testcase[field as keyof typeof testcase]
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


            //Test Runs Info
            const testRuns = testcase.testRuns
            if(!(testRuns === null)){
                testCaseColumn.push(
                    <td key="lastRunTime" className={rowClassName}> {testRuns[0].start_time} </td>
                )
                testCaseColumn.push(
                    <td key="runs" className={rowClassName}>
                        <div className="flex flex-wrap gap-4">
                            {testRuns.map((testRun) => (
                                <div key={testRun.id} className="flex items-center">
                                    <div
                                        className={`h-2 w-2 rounded-full ${getStatusColor(testRun.status)}`}
                                        title={testRun.status}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </td>
                )
            }else{
                testCaseColumn.push(
                    <td key="lastRunTime" className={rowClassName}></td>,
                    <td key="runs" className={rowClassName}> No Runs </td>
                )
            }

            testCaseRows.push(
                <tr 
                key={testcase['id']} 
                className="cursor-pointer hover:bg-gray-200 hover:shadow-lg transition duration-100"
                onClick={() => (window.location.href = `/testcases/testcase/${testcase['id']}`)}
                >
                        {testCaseColumn}
                </tr>
            )
        }
        return testCaseRows
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

    //Test Runs Info
    tableHeaders.push(
        <th key="lastRunTime" className={className}>
            Last Run
        </th>,
        <th key="runs" className={className}>
            History
        </th>
    )
    return tableHeaders
}