"use client";

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface TestResponse {
  id: number;
  resultStatus: string;
  responseTime: number;
  actualResponseCode: string;
  actualResponseBody: any;
}

interface TestContextType {
  testResponse: TestResponse | null;
  setTestResponse: (response: TestResponse) => void;
}

export const TestContext = createContext<TestContextType | undefined>(undefined);

export const useTestContext = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTestContext must be used within a TestProvider');
  }
  return context;
};

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const [testResponse, setTestResponse] = useState<TestResponse | null>(null);

  return (
    <TestContext.Provider value={{ testResponse, setTestResponse }}>
      {children}
    </TestContext.Provider>
  );
};
