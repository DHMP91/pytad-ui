import { PyTADClient, TestCase, ListTestCaseResponse} from "@/app/pytadclient"
import Pagination from "@/app/testcases/pagination"
import TestCaseTable from "@/app/testcases/testcasetable"


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
    for(const testcase of data.results){
      const testRunsResponse = await pytadClient.listTestRuns(testcase.id)
      testcase.testRuns = testRunsResponse.results
    }
  } catch {
    return ConnectionErrorMessage()
  }

  return (
    <div className="flex flex-col h-full w-full">
        <div>
          <Pagination/>
        </div>
        <div>
          <TestCaseTable data={data}/>
        </div>
    </div>
  );
}


function ConnectionErrorMessage(){
  return (
    <div className="text-center text-red-600 px-10">
        Failed to contact PYTAD server... Check server is running or environment variables
    </div>
  )
}

