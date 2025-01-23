export class PyTADClient {
    private baseURL: string
    private apiKey: string
    private listTestCaseEndpoint: string = "/testcases/api/list"
    private listTestRunsEndpoint = (id: number): String => { return `/testcases/api/testcase/${id}/testruns` }
    private baseHeader: HeadersInit

    constructor();
    constructor(baseURL: string, apiKey: string);
    constructor(baseURL?: string, apiKey?: string) {
        if(baseURL === undefined || apiKey === undefined){
            [this.baseURL, this.apiKey] = this.getEnvironmentConfig()
        }else{
            this.baseURL = baseURL
            this.apiKey = apiKey
        }
        this.baseHeader = {
            'Accept': 'application/json',
            'Authorization': `token ${this.apiKey}`,
        }
    }

    async listTestCases(pageNumber: number = 1): Promise<ListTestCaseResponse> {
        return this.get(this.listTestCaseEndpoint, `page=${pageNumber}`)
    }

    async listTestRuns(testCaseId: number, pageNumber: number = 1): Promise<ListTestRunResponse> {
        return this.get(this.listTestRunsEndpoint(testCaseId), `page=${pageNumber}`)
    }

    private async get(endpoint: String, searchParams?: string){
        const baseUrl = this.baseURL
        const url = `${baseUrl}${endpoint}${'?' + searchParams || ''}`
        const response = await fetch(url, {
          method: 'GET',
          headers: this.baseHeader,
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const data = await response.json();
        return data
    }
    
    private getEnvironmentConfig(): [string, string]{
        const envBaseURL = process.env.PYTAD_URL;
        if(envBaseURL == undefined){
            throw new Error(`Undefined pytad configuration. Please check .env for PYTAD Url`);
        }

        const envApiKey = process.env.PYTAD_API_KEY;
        if(envApiKey == undefined){
            throw new Error(`Undefined pytad configuration. Please check .env for API KEY.`);
        }
        return [envBaseURL, envApiKey]
    }
}

export interface TestCase {
    id: number;
    code_hash: string;
    create_date: string;
    internal_id: string | null;
    name: string;
    relative_path: string;
    testRuns: TestRun[] | null;
}

export interface TestRun {
    id: number;
    name: string;
    suite_id: string;
    test_id: number;
    status: "PASSED" | "FAILED" | "SKIPPED" | "UNKNOWN"; 
    start_time: string; 
    end_time: string;
    marks: string;
    product_version: string;
    environment: string;
    defects: string;
}


export interface ListResponse {
    count: number;
    next: string;
    previous: string;

}
export interface ListTestCaseResponse extends ListResponse {
    results: TestCase[];
}

export interface ListTestRunResponse extends ListResponse {
    results: TestRun[];
}