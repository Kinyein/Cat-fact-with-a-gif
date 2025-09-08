/// <reference types="vitest/globals" />

import "@testing-library/jest-dom";

beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ fact: "Default cat fact 🐱" }),
    })
  ) as unknown as typeof fetch
})