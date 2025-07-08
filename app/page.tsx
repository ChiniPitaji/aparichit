"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Shield, Users, Zap, ArrowRight, Skull } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [glitchText, setGlitchText] = useState("JanRakshak")

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText((prev) => (prev === "JanRakshak" ? "J4nR4k5h4k" : "JanRakshak"))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-20 bg-red-600 blood-drip"
            style={{
              left: `${20 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <Skull className="w-16 h-16 mx-auto mb-4 text-red-600 animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
              <span className={glitchText !== "JanRakshak" ? "glitch-effect text-red-500" : ""}>{glitchText}</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-400 mb-2 font-semibold">The Civic Justice Platform</p>
            <p className="text-lg text-gray-300 italic">"Because justice delayed is justice denied."</p>
          </div>

          <div className="mb-12">
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              When the system fails, the people rise. Report corruption, expose negligence, and fight for justice in the
              shadows of digital vigilantism.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg horror-shadow pulse-red"
                >
                  Enter the Shadows
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-8 py-4 text-lg bg-transparent"
                >
                  Join the Movement
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Eye, label: "Cases Exposed", value: "1,247" },
              { icon: Shield, label: "Justice Served", value: "892" },
              { icon: Users, label: "Digital Vigilantes", value: "15,432" },
              { icon: Zap, label: "Active Reports", value: "234" },
            ].map((stat, index) => (
              <Card key={index} className="bg-gray-900/50 border-red-900/30 horror-shadow">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Weapons of <span className="text-red-500">Digital Justice</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Anonymous Reporting",
                description: "Strike from the shadows. Report corruption without revealing your identity.",
                icon: "🎭",
              },
              {
                title: "Community Uprising",
                description: "Unite the masses. Upvote and amplify the voices of the oppressed.",
                icon: "⚡",
              },
              {
                title: "Justice Tracking",
                description: "Watch the system burn. Track every case from report to resolution.",
                icon: "👁️",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/70 border-red-900/30 horror-shadow hover:justice-glow transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            The Time for <span className="text-red-500">Justice</span> is Now
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Every corrupt official, every negligent authority, every injustice - they all fear the power of an awakened
            citizenry.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl horror-shadow pulse-red"
            >
              Begin Your Vigilante Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
