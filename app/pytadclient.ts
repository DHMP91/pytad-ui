export class PyTADClient {
    private baseURL: string
    private apiKey: string
    private listTestCaseEndpoint: string = "/testcases/api/list"
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
        const baseUrl = this.baseURL
        const url = `${baseUrl}${this.listTestCaseEndpoint}?page=${pageNumber}`
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
    code_hash: string;
    create_date: string;
    id: number;
    internal_id: string | null;
    name: string;
    relative_path: string;
}

export interface ListTestCaseResponse {
    count: number;
    next: string;
    previous: string;
    results: TestCase[];
}