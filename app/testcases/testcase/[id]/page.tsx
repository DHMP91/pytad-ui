import { ListTestBodyResponse, ListTestRunResponse, PyTADClient, TestRun } from "@/app/pytadclient"
import { ConnectionErrorMessage } from "@/app/testcases/common";
import CodeTab from "@/app/testcases/testcase/[id]/code";
import TestRunTable from "@/app/testcases/testcase/[id]/testruntable"

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const id = parseInt(params.id) || 0
    const pytadClient = new PyTADClient()
    let testBodies: ListTestBodyResponse;
    let testRuns: ListTestRunResponse;

    try{
        testBodies = await pytadClient.listTestBody(id)
        testRuns = await pytadClient.listTestRuns(id)
    } catch {
        return ConnectionErrorMessage()
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="h-4/6 w-full">
                <div className="flex flex-row h-full w-full m-3">
                    <div className="h-full w-1/3">
                        <CodeTab data={testBodies}/>
                    </div>
                    <div className="w-2/3 border rounded-md">
                        <div className="flex border-b mb-4">
                            <div className="flex-1 text-center py-2 px-4 transition-colors duration-200 text-gray-500">
                                Result
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-4">
                            <div>Select a run to display result</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-2/6 w-full place-content-center m-3">
                <TestRunTable data={testRuns}/>
            </div>
        </div>
    );
}
