import { TestDataRequest } from "@/interfaces/api/TestDataRequest"
import { ApiLink } from "./ApiLink"

export async function getTestDatas() {
    let baseHos = ApiLink + "/testdata"
    const res = await fetch(baseHos)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
}

export async function getTestDataDetail(id: number) {
  const baseHost = `${ApiLink}/testdata/${id}`;
  const res = await fetch(baseHost);
  if (!res.ok) {
      throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}


export async function createTestData(request:TestDataRequest) {
    let baseHost = ApiLink + "/testdata";

  try {
    const res = await fetch(baseHost, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    // Handle specific error types or log the error for debugging
    if (error instanceof Error) {
      console.error('Error creating test data:', error.message);
    }
    throw error; // Rethrow the error to the caller
  }
}