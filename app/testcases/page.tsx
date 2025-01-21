import Image from "next/image";

type TestCase = {
  code_hash: string;
  create_date: string;
  id: number;
  internal_id: string | null;
  name: string;
  relative_path: string;
};

const displayOrder: TestCase = {
  id: 0,
  name: "",
  relative_path: "",
  internal_id: null,
  code_hash: "",
  create_date: "",
};

const headers = Object.keys(displayOrder)

export default async function Home() {  
  const data = await getData()
  const testcases: TestCase[] = data['results']

  return (
    <div className="h-full w-5/6 p-20">
        {TestCaseTable(testcases)}
    </div>
  );
}

function TestCaseTable(data: TestCase[]) {
  const tableHeaders = []
  const testCaseRows = []

  for(var indx in headers){
    tableHeaders.push(
      <th key={indx} className="border border-gray-300 px-4 py-2 text-left bg-gray-100">
        {headers[indx]}
      </th>
    )
  }

  for(var testcase of data){
    const testCaseColumn = []
    for(var header of headers){
      const value = testcase[header as keyof typeof displayOrder]
      testCaseColumn.push(
        <td key={header} className="border border-gray-300 px-4 py-2">
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
  
  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          {tableHeaders}
        </tr>
      </thead>
      <tbody>
          {testCaseRows}
      </tbody>
    </table>
  );
}


async function getData() {
  const baseUrl = process.env.PYTAD_URL
  const apiKey = process.env.PYTAD_API_KEY
  try {
    const response = await fetch(`${baseUrl}/testcases/api/list`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `token ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}