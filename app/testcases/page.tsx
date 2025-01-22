import { TestCase } from "./models";
import { PyTADClient } from "../pytadclient"

const displayedFields: string[]=  [
  "id",
  "name",
  "relative_path",
  "internal_id",
  // "code_hash",
  "create_date"
]

export default async function Home() {  
  return (
    <div className="flex h-full w-full">
        {TestCaseTable()}
    </div>
  );
}

async function TestCaseTable() {
  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          {TableHeaders()}
        </tr>
      </thead>
      <tbody>
          {TestCaseRows()}
      </tbody>
    </table>
  );
}

async function TestCaseRows(){
  let data = null
  let pytadClient = new PyTADClient()
  try{
    data = await pytadClient.listTestCases()
  } catch {
    return ConnectionErrorMessageRow()
  }

  if(!(data === null)){
    const testCaseRows = []
    const testcases: TestCase[] = data['results']
    for(const testcase of testcases){
      const testCaseColumn = []
      for(const field of displayedFields){
        const value = testcase[field as keyof typeof testcase]
        testCaseColumn.push(
          <td key={field} className="border border-gray-300 px-4">
            {value}
          </td>
        )
      }

      testCaseRows.push(
        <tr key={testcase['id']}>
          {testCaseColumn}
        </tr>
      )
    }
    return testCaseRows
  }
}

function ConnectionErrorMessageRow(){
  return (
    <tr key="FailedFetchPytad">
      <td colSpan={displayedFields.length} className="text-center text-red-600 px-10">
        Failed to contact PYTAD server... Check server is running or environment variables
      </td>
    </tr>
  )
}

function TableHeaders() {
  const tableHeaders = []
  for(const indx in displayedFields){
    tableHeaders.push(
      <th key={indx} className="border border-gray-300 px-4 py-2 text-left bg-gray-100">
        {displayedFields[indx]}
      </th>
    )
  }
  return tableHeaders
}