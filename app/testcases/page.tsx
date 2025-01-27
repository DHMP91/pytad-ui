import { PyTADClient, ListTestCaseResponse} from "@/app/pytadclient"
import Pagination from "@/app/testcases/pagination"
import TestCaseTable from "@/app/testcases/testcasetable"
import { ConnectionErrorMessage } from "./common";


export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  let data: ListTestCaseResponse;
  const pytadClient = new PyTADClient()
  try{
    data = await pytadClient.listTestCases(currentPage)
    for(const testcase of data.results){
      const testRunsResponse = await pytadClient.listTestRuns(testcase.id)
      testcase.testRuns = testRunsResponse.results
    }
  } catch {
    return ConnectionErrorMessage()
  }

  const showNext = !(data.next == undefined || data.next == "")
  const showPrevious = !(data.previous == undefined || data.previous == "")
  return (
    <div className="flex flex-col h-full w-full">
        <div>
          <Pagination previous={showPrevious} next={showNext}/>
        </div>
        <div>
          <TestCaseTable data={data}/>
        </div>
    </div>
  );
}




