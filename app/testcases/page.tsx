import { PyTADClient, TestCase, ListTestCaseResponse} from "@/app/pytadclient"
import Pagination from "@/app/testcases/pagination"
const displayedFields: string[]=  [
  "id",
  "name",
  "relative_path",
  "internal_id",
  // "code_hash",
  "create_date"
]

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  let data: ListTestCaseResponse | null = null
  let pytadClient = new PyTADClient()
  try{
    data = await pytadClient.listTestCases(currentPage)
  } catch {
    return ConnectionErrorMessage()
  }

  return (
    <div className="flex flex-col h-full w-full">
        <div>
          <Pagination/>
        </div>
        <div>
          {TestCaseTable(data)}
        </div>
    </div>
  );
}

async function TestCaseTable(data: ListTestCaseResponse) {
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

async function TestCaseRows(data: ListTestCaseResponse){
  if(!(data === null)){
    const testCaseRows = []
    const testcases: TestCase[] = data.results
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

function ConnectionErrorMessage(){
  return (
    <div className="text-center text-red-600 px-10">
        Failed to contact PYTAD server... Check server is running or environment variables
    </div>
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