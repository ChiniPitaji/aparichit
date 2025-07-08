"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Skull,
  Eye,
  Shield,
  Brain,
  Map,
  Lock,
  Mail,
  Trophy,
  Zap,
  Users,
  Target,
  Code,
  Globe,
  ArrowRight,
  ChevronDown,
  Flame,
  Hash,
  Award,
  Filter,
  Keyboard,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function PitchPage() {
  const [activeSection, setActiveSection] = useState("problem")
  const [anniyanMode, setAnniyanMode] = useState(false)
  const [showHeartbeat, setShowHeartbeat] = useState(true)

  // Anniyan Mode Toggle (Ctrl+J)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "j") {
        e.preventDefault()
        setAnniyanMode(!anniyanMode)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [anniyanMode])

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["problem", "solution", "features", "tech", "usp", "audience", "cta"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Categorization",
      description: "Intelligent complaint classification with 95% accuracy using advanced NLP",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Map,
      title: "Heatmap Visualization",
      description: "Interactive city maps showing complaint density and hotspots",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Hash,
      title: "Blockchain Verification",
      description: "Immutable complaint hash IDs for transparency and authenticity",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500/30",
    },
    {
      icon: Mail,
      title: "Authority Auto-Notifier",
      description: "Automatic email alerts to relevant civic departments",
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-500/30",
    },
    {
      icon: Award,
      title: "Weekly Karma Missions",
      description: "Gamified challenges to boost civic engagement",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-500/30",
    },
    {
      icon: Filter,
      title: "AI Toxicity Detection",
      description: "Smart content moderation to maintain platform integrity",
      color: "text-pink-400",
      bgColor: "bg-pink-900/20",
      borderColor: "border-pink-500/30",
    },
  ]

  const navItems = [
    { id: "problem", label: "Problem", icon: Target },
    { id: "solution", label: "Solution", icon: Shield },
    { id: "features", label: "Features", icon: Zap },
    { id: "tech", label: "Tech", icon: Code },
    { id: "usp", label: "USP", icon: Flame },
    { id: "audience", label: "Audience", icon: Users },
    { id: "cta", label: "Action", icon: ArrowRight },
  ]

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        anniyanMode ? "bg-red-950 text-red-100" : "bg-black text-white"
      } relative overflow-hidden`}
    >
      {/* Animated Red Mist Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-red-900/10 via-transparent to-transparent animate-pulse opacity-30" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-red-600/5 animate-pulse"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${4 + i}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Sticky Navigation */}
      <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(item.id)}
              className={`w-12 h-12 p-0 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? anniyanMode
                    ? "bg-red-600 text-white"
                    : "bg-red-600 text-white"
                  : anniyanMode
                    ? "bg-red-900/30 text-red-300 hover:bg-red-800/50"
                    : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/70"
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </nav>

      {/* Anniyan Mode Indicator */}
      {anniyanMode && (
        <div className="fixed top-4 left-4 z-50">
          <Badge className="bg-red-600 text-white animate-pulse">
            <Keyboard className="w-3 h-3 mr-1" />
            ANNIYAN MODE ACTIVE
          </Badge>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <Skull
              className={`w-20 h-20 mx-auto mb-6 ${
                anniyanMode ? "text-red-400 glitch-effect" : "text-red-600"
              } animate-pulse hover:animate-glitch cursor-pointer`}
              onClick={() => setShowHeartbeat(!showHeartbeat)}
            />
            <h1
              className={`text-7xl md:text-9xl font-bold mb-6 ${
                anniyanMode ? "text-red-200 glitch-effect" : "text-white"
              }`}
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              JanRakshak
            </h1>
            <p className={`text-2xl md:text-3xl mb-4 font-bold ${anniyanMode ? "text-red-300" : "text-red-400"}`}>
              The Digital Vigilante Platform
            </p>
            <p className="text-xl text-gray-300 italic mb-8">"Because justice delayed is justice denied."</p>

            {/* Heartbeat Animation */}
            {showHeartbeat && (
              <div className="flex justify-center mb-8">
                <Heart
                  className={`w-8 h-8 ${anniyanMode ? "text-red-400" : "text-red-500"} animate-pulse`}
                  style={{
                    animation: "heartbeat 1.5s ease-in-out infinite",
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/dashboard">
              <Button
                size="lg"
                className={`px-12 py-6 text-xl font-bold transition-all duration-300 ${
                  anniyanMode
                    ? "bg-red-700 hover:bg-red-800 text-white shadow-red-500/50"
                    : "bg-red-600 hover:bg-red-700 text-white"
                } horror-shadow pulse-red hover:animate-glitch`}
              >
                Enter the Shadows
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className={`px-12 py-6 text-xl font-bold transition-all duration-300 ${
                anniyanMode
                  ? "border-red-400 text-red-300 hover:bg-red-800 hover:text-white bg-transparent"
                  : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
              } animate-pulse hover:animate-glitch`}
              onClick={() => scrollToSection("problem")}
            >
              Read the Manifesto
              <ChevronDown className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Blood Drip Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex justify-center space-x-8">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-gradient-to-b ${
                  anniyanMode ? "from-red-400 to-red-800" : "from-red-600 to-red-900"
                } blood-drip`}
                style={{
                  height: `${20 + Math.random() * 40}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section id="problem" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Target
              className={`w-16 h-16 mx-auto mb-6 ${
                anniyanMode ? "text-red-400" : "text-red-500"
              } hover:animate-glitch cursor-pointer`}
            />
            <h2
              className={`text-5xl font-bold mb-8 ${anniyanMode ? "text-red-200" : "text-white"}`}
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              The Problem That Haunts Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card
              className={`${
                anniyanMode ? "bg-red-900/30 border-red-700/50" : "bg-gray-900/70 border-red-900/30"
              } horror-shadow hover:justice-glow transition-all duration-300`}
            >
              <CardContent className="p-8">
                <h3 className={`text-2xl font-bold mb-6 ${anniyanMode ? "text-red-200" : "text-white"}`}>
                  Systemic Corruption
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    Citizens face daily corruption in government offices
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    No unified platform for anonymous reporting
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    Fear of retaliation silences victims
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    Fragmented complaint systems ignore citizen voices
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className={`${
                anniyanMode ? "bg-red-900/30 border-red-700/50" : "bg-gray-900/70 border-red-900/30"
              } horror-shadow hover:justice-glow transition-all duration-300`}
            >
              <CardContent className="p-8">
                <h3 className={`text-2xl font-bold mb-6 ${anniyanMode ? "text-red-200" : "text-white"}`}>
                  The Silent Suffering
                </h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${anniyanMode ? "text-red-300" : "text-red-400"} mb-2`}>
                      1.4B
                    </div>
                    <p className="text-gray-400">Citizens affected by civic issues</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${anniyanMode ? "text-red-300" : "text-red-400"} mb-2`}>
                      73%
                    </div>
                    <p className="text-gray-400">Cases go unreported due to fear</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Shield
              className={`w-16 h-16 mx-auto mb-6 ${
                anniyanMode ? "text-red-400" : "text-red-500"
              } hover:animate-glitch cursor-pointer`}
            />
            <h2
              className={`text-5xl font-bold mb-8 ${anniyanMode ? "text-red-200" : "text-white"}`}
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              The Digital Vigilante Solution
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              JanRakshak emerges from the shadows as a platform where citizens can anonymously report injustice, rally
              community support, and hold authorities accountable through the power of collective action.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Anonymous Reporting",
                description: "Strike from the shadows without revealing your identity",
              },
              {
                icon: Users,
                title: "Community Power",
                description: "Unite the masses through upvoting and amplification",
              },
              {
                icon: Zap,
                title: "Real-time Tracking",
                description: "Watch justice unfold from report to resolution",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`${
                  anniyanMode ? "bg-red-900/30 border-red-700/50" : "bg-gray-900/70 border-red-900/30"
                } horror-shadow hover:justice-glow transition-all duration-300`}
              >
                <CardContent className="p-8 text-center">
                  <item.icon
                    className={`w-12 h-12 mx-auto mb-6 ${
                      anniyanMode ? "text-red-400" : "text-red-500"
                    } hover:animate-glitch cursor-pointer`}
                  />
                  <h3 className={`text-xl font-bold mb-4 ${anniyanMode ? "text-red-200" : "text-white"}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section id="features" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Zap
              className={`w-16 h-16 mx-auto mb-6 ${
                anniyanMode ? "text-red-400" : "text-red-500"
              } hover:animate-glitch cursor-pointer`}
            />
            <h2
              className={`text-5xl font-bold mb-8 ${anniyanMode ? "text-red-200" : "text-white"}`}
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              Weapons of Digital Justice
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Advanced AI-powered tools and blockchain technology forge the ultimate platform for civic accountability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`${
                  anniyanMode ? "bg-red-900/30 border-red-700/50" : `${feature.bgColor} ${feature.borderColor}`
                } horror-shadow hover:justice-glow transition-all duration-300`}
              >
                <CardHeader>
                  <feature.icon
                    className={`w-12 h-12 ${
                      anniyanMode ? "text-red-400" : feature.color
                    } hover:animate-glitch cursor-pointer`}
                  />
                  <CardTitle className={`text-xl ${anniyanMode ? "text-red-200" : "text-white"}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Special Anniyan Mode Feature */}
          <Card
            className={`mt-12 ${
              anniyanMode
                ? "bg-red-800/50 border-red-600/70"
                : "bg-gradient-to-r from-red-900/30 to-gray-900/70 border-red-500/30"
            } horror-shadow`}
          >
            <CardContent className="p-8 text-center">
              <Keyboard
                className={`w-16 h-16 mx-auto mb-6 ${
                  anniyanMode ? "text-red-300" : "text-red-500"
                } hover:animate-glitch cursor-pointer`}
              />
              <h3
                className={`text-3xl font-bold mb-4 ${anniyanMode ? "text-red-200" : "text-white"}`}
                style={{ fontFamily: "'Cinzel Decorative', serif" }}
              >
                Anniyan Mode
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                Press <kbd className="bg-red-600 text-white px-2 py-1 rounded">Ctrl+J</kbd> to activate the full
                vigilante experience with enhanced horror UI and glitch effects.
              </p>
              <Badge className={`${anniyanMode ? "bg-red-600" : "bg-red-600/20"} text-red-300 text-lg px-4 py-2`}>
                {anniyanMode ? "ACTIVE" : "DORMANT"}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Code
              className={`w-16 h-16 mx-auto mb-6 ${
                anniyanMode ? "text-red-400" : "text-red-500"
              } hover:animate-glitch cursor-pointer`}
            />
            <h2
              className={`text-5xl font-bold mb-8 ${anniyanMode ? "text-red-200" : "text-white"}`}
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              Arsenal of Technology
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${anniyanMode ? "text-red-200" : "text-white"}`}>
                Frontend Weapons
              </h3>
              <div className="space-y-4">
                {[
                  "Next.js 14 with App Router",
                  "TypeScript for type safety",
                  "Tailwind CSS with custom horror theme",
                  "shadcn/ui component library",
                  "Lucide React icons",
                ].map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 ${anniyanMode ? "bg-red-400" : "bg-red-500"} rounded-full`} />
                    <span className="text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-6 ${anniyanMode ? "text-red-200" : "text-white"}`}>
                Backend Arsenal
              </h3>
              <div className="space-y-4">
                {[
                  "AI SDK with OpenAI GPT-4",
                  "Blockchain integration for verification",
                  "Email notification system",
                  "Real-time data processing",
                  "Advanced analytics engine",
                ].map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 ${anniyanMode ? "bg-red-400" : "bg-red-500"} rounded-full`} />
                    <span className="text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section id="usp" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Flame
              className={`w-16 h-16 mx-auto mb-6 ${
                anniyanMode ? "text-red-400" : "text-red-500"
              } hover:animate-glitch cursor-pointer`}
            />
            <h2
              className={`text-5xl font-bold mb-8 ${anniyanMode ? "text-red-200" : "text-white"}`}
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              What Makes Us Unstoppable
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Anonymous Protection",
                description: "Advanced encryption protects whistleblowers from retaliation",
                icon: Shield,
              },
              {
                title: "AI-Powered Intelligence",
                description: "95% accurate categorization and toxic content detection",
                icon: Brain,
              },
              {
                title: "Blockchain Verification",
                description: "Immutable proof of complaints for ultimate transparency",
                icon: Lock,
              },
              {
                title: "Gamified Engagement",
                description: "Karma missions and leaderboards drive community participation",
                icon: Trophy,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`${
                  anniyanMode ? "bg-red-900/30 border-red-700/50" : "bg-gray-900/70 border-red-900/30"
                } horror-shadow hover:justice-glow transition-all duration-300`}
              >
                <CardContent className="p-8">
                  <item.icon
                    className={`w-12 h-12 mb-6 ${
                      anniyanMode ? "text-red-400" : "text-red-500"
                    } hover:animate-glitch cursor-pointer`}
                  />
                  <h3 className={`text-xl font-bold mb-4 ${anniyanMode ? "text-red-200" : "text-white"}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="audience" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Users
              className={`w-16 h-16 mx-auto mb-6 ${
                anniyanMode ? "text-red-400" : "text-red-500"
              } hover:animate-glitch cursor-pointer`}
            />
            <h2
              className={`text-5xl font-bold mb-8 ${anniyanMode ? "text-red-200" : "text-white"}`}
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              The Army of Justice
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Natives",
                description: "Tech-savvy citizens aged 18-45 seeking justice",
                stats: "850M+ potential users",
              },
              {
                title: "Social Activists",
                description: "NGOs and activists fighting for systemic change",
                stats: "50K+ organizations",
              },
              {
                title: "Government Bodies",
                description: "Progressive authorities embracing transparency",
                stats: "28 states, 8 UTs",
              },
            ].map((audience, index) => (
              <Card
                key={index}
                className={`${
                  anniyanMode ? "bg-red-900/30 border-red-700/50" : "bg-gray-900/70 border-red-900/30"
                } horror-shadow hover:justice-glow transition-all duration-300 text-center`}
              >
                <CardContent className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 ${anniyanMode ? "text-red-200" : "text-white"}`}>
                    {audience.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{audience.description}</p>
                  <Badge className={`${anniyanMode ? "bg-red-600" : "bg-red-600/20"} text-red-300 text-lg px-4 py-2`}>
                    {audience.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <Skull
              className={`w-20 h-20 mx-auto mb-8 ${
                anniyanMode ? "text-red-400 glitch-effect" : "text-red-600"
              } animate-pulse hover:animate-glitch cursor-pointer`}
            />
            <h2
              className={`text-6xl font-bold mb-8 ${anniyanMode ? "text-red-200" : "text-white"}`}
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              Join the Revolution
            </h2>
            <p className="text-2xl text-gray-300 mb-12">
              Every corrupt official, every negligent authority, every injustice - they all fear the power of an
              awakened citizenry. The time for digital vigilante justice is now.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className={`px-16 py-8 text-2xl font-bold transition-all duration-500 ${
                  anniyanMode
                    ? "bg-red-700 hover:bg-red-800 text-white shadow-red-500/50 animate-pulse"
                    : "bg-red-600 hover:bg-red-700 text-white"
                } horror-shadow hover:shadow-red-500/50 hover:shadow-2xl transform hover:scale-105`}
                style={{
                  animation: "pulse-neon 2s infinite, heartbeat 1.5s ease-in-out infinite",
                  boxShadow: anniyanMode
                    ? "0 0 30px rgba(239, 68, 68, 0.8), inset 0 0 30px rgba(239, 68, 68, 0.2)"
                    : "0 0 30px rgba(220, 38, 38, 0.5), inset 0 0 30px rgba(220, 38, 38, 0.1)",
                }}
              >
                Begin Your Vigilante Journey
                <ArrowRight className="ml-4 w-8 h-8" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Press Ctrl+J to activate Anniyan Mode</p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                <Brain className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                <Lock className="w-3 h-3 mr-1" />
                Blockchain Verified
              </Badge>
              <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                <Globe className="w-3 h-3 mr-1" />
                Mobile Ready
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-red-900/30 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-lg ${anniyanMode ? "text-red-300" : "text-gray-300"} mb-4`}>
            Built with ❤️ for justice, by the digital vigilantes
          </p>
          <p className="text-gray-500">
            "In the shadows of corruption, we are the light. In the silence of oppression, we are the voice."
          </p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes pulse-neon {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.5), 
                        0 0 40px rgba(220, 38, 38, 0.3), 
                        0 0 60px rgba(220, 38, 38, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.8), 
                        0 0 60px rgba(220, 38, 38, 0.5), 
                        0 0 90px rgba(220, 38, 38, 0.3);
          }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}
