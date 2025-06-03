"use server"

import { getVoidResponse } from "./void-responses"

export async function sendToVoid(message: string): Promise<string | null> {
  // 1 in 10 chance of getting a response
  const willRespond = Math.random() < 0.1

  if (willRespond) {
    return getVoidResponse()
  }

  return null
}
