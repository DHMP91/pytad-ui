export class PyTADClient {
    private baseURL: string
    private apiKey: string
    private listTestCaseEndpoint: string = "/testcases/api/list"
    private baseHeader: HeadersInit

    constructor();
    constructor(baseURL: string, apiKey: string);
    constructor(baseURL?: string, apiKey?: string) {
        if(baseURL === undefined || apiKey === undefined){
            [this.baseURL, this.apiKey] = this.getEnvinonmentValues()
        }else{
            this.baseURL = baseURL
            this.apiKey = apiKey
        }
        this.baseHeader = {
            'Accept': 'application/json',
            'Authorization': `token ${this.apiKey}`,
        }
    }

    async listTestCases(): Promise<any> {
        const baseUrl = this.baseURL
        const response = await fetch(`${baseUrl}${this.listTestCaseEndpoint}`, {
          method: 'GET',
          headers: this.baseHeader,
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const data = await response.json();
        return data
    }
    
    private getEnvinonmentValues(): [string, string]{
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