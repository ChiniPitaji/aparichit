import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json()

    if (!title && !description) {
      return Response.json({ error: "Title or description required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an AI assistant specialized in categorizing civic complaints and injustices for the JanRakshak platform - a digital vigilante justice system.

Your task is to analyze complaint text and categorize it into one of these categories:
- corruption: Bribery, kickbacks, misuse of public funds, nepotism, abuse of power for personal gain
- civic: Municipal services, infrastructure, garbage collection, water supply, electricity, roads, public facilities
- law: Police misconduct, legal system failures, court delays, FIR issues, harassment by authorities
- environment: Pollution, illegal dumping, deforestation, noise pollution, environmental violations
- healthcare: Medical negligence, hospital issues, lack of medical facilities, overcharging, poor treatment
- education: School/college issues, teacher misconduct, fee problems, infrastructure in educational institutions

Respond ONLY with a valid JSON object in this exact format:
{
  "category": "one_of_the_categories_above",
  "confidence": 0.85,
  "reasoning": "Brief explanation of why this category was chosen"
}

Be decisive and choose the most appropriate category. Confidence should be between 0.1 and 1.0.`,
      prompt: `Analyze and categorize this complaint:

Title: ${title}
Description: ${description}

Provide categorization in the specified JSON format.`,
      temperature: 0.3,
    })

    // Parse the AI response
    try {
      const result = JSON.parse(text)

      // Validate the response structure
      if (!result.category || !result.confidence || !result.reasoning) {
        throw new Error("Invalid AI response structure")
      }

      // Ensure confidence is a number between 0 and 1
      result.confidence = Math.max(0.1, Math.min(1.0, Number.parseFloat(result.confidence)))

      return Response.json(result)
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)

      // Fallback categorization
      return Response.json({
        category: "civic",
        confidence: 0.5,
        reasoning: "AI analysis failed, defaulting to civic category",
      })
    }
  } catch (error) {
    console.error("Categorization error:", error)
    return Response.json({ error: "Failed to categorize complaint" }, { status: 500 })
  }
}
