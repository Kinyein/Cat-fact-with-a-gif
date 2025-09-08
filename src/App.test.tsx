/// <reference types="@testing-library/jest-dom" />

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, beforeEach, test, expect } from "vitest"
import App from "./App"
import * as catService from "./services/getCatFact"
import * as gifService from "./services/getGif"

beforeEach(() => {
  vi.restoreAllMocks()
})

/**
 * Helper: función para obtener las "three words" de una frase (igual que en tu componente)
 */
const firstThree = (str: string) => str.split(" ", 3).join(" ")

/*
  TEST 1: Render inicial -> fact + gif
*/
test("renders a text and an image (gif)", async () => {
  vi.spyOn(catService, "getCatFact").mockResolvedValue("Cats sleep a lot")

  vi.spyOn(gifService, "getGif").mockImplementation((threeWords?: string) => {
    const t = (threeWords || "").trim()
    if (!t) return Promise.resolve(["https://placekitten.com/100/100"]) // llamada inicial con ""
    if (t === firstThree("Cats sleep a lot")) return Promise.resolve(["https://placekitten.com/200/300"])
    return Promise.resolve(["https://placekitten.com/999/999"])
  })

  render(<App />)

  // espera al fact
  await screen.findByText(/Cats sleep a lot/i)

  // espera a que el src del <img> sea el esperado (puede cambiar después del primer render)
  await waitFor(() =>
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://placekitten.com/200/300")
  )
})

/*
  TEST 2: Click "New Fact" -> fact y gif cambian
*/
test("clicking 'New Fact' loads a new fact and gif", async () => {
  vi.spyOn(catService, "getCatFact")
    .mockResolvedValueOnce("Cats sleep a lot")
    .mockResolvedValueOnce("Cats love naps")

  vi.spyOn(gifService, "getGif").mockImplementation((threeWords?: string) => {
    const t = (threeWords || "").trim()
    if (!t) return Promise.resolve(["https://placekitten.com/100/100"])
    if (t === firstThree("Cats sleep a lot")) return Promise.resolve(["https://placekitten.com/200/300"])
    if (t === firstThree("Cats love naps")) return Promise.resolve(["https://placekitten.com/400/300"])
    return Promise.resolve(["https://placekitten.com/999/999"])
  })

  render(<App />)

  // primer fact + gif
  await screen.findByText(/Cats sleep a lot/i)
  await waitFor(() =>
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://placekitten.com/200/300")
  )

  // click new fact
  const newFactBtn = screen.getByRole("button", { name: /new fact/i })
  await userEvent.click(newFactBtn)

  // nuevo fact + gif esperado
  await screen.findByText(/Cats love naps/i)
  await waitFor(() =>
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://placekitten.com/400/300")
  )
})

/*
  TEST 3: Click "Change gif" -> rota entre gifs
*/
test("clicking 'Change gif' cycles through gifs", async () => {
  vi.spyOn(catService, "getCatFact").mockResolvedValue("Cats sleep a lot")

  vi.spyOn(gifService, "getGif").mockImplementation((threeWords?: string) => {
    const t = (threeWords || "").trim()
    if (!t) return Promise.resolve(["https://placekitten.com/100/100"])
    if (t === firstThree("Cats sleep a lot"))
      return Promise.resolve([
        "https://placekitten.com/200/300",
        "https://placekitten.com/400/300",
      ])
    return Promise.resolve(["https://placekitten.com/999/999"])
  })

  render(<App />)

  await screen.findByText(/Cats sleep a lot/i)
  await waitFor(() =>
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://placekitten.com/200/300")
  )

  const changeBtn = screen.getByRole("button", { name: /change gif/i })
  await userEvent.click(changeBtn)

  await waitFor(() =>
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://placekitten.com/400/300")
  )
})
