import { ListTestBodyResponse, PyTADClient } from "@/app/pytadclient"
import { ConnectionErrorMessage } from "@/app/testcases/common";
import CodeTab from "@/app/testcases/testcase/[id]/code";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);


    const pytadClient = new PyTADClient()
    let data: ListTestBodyResponse;
    const testbodies = []
    try{
        data = await pytadClient.listTestBody(id)
        for(const testbody of data.results){
            testbodies.push(
                <div>{testbody.code}</div>
            )
        }
    } catch {
        return ConnectionErrorMessage()
    }

    return (
        <div className="flex flex-col h-full w-full">
            <CodeTab data={data}/>
        </div>
    );
}