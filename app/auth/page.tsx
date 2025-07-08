"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Skull, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Welcome to the Shadows",
        description: "You have joined the digital vigilante movement.",
      })
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-32 bg-red-600 blood-drip"
            style={{
              left: `${30 + i * 30}%`,
              animationDelay: `${i * 1}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md bg-gray-900/90 border-red-900/30 horror-shadow">
        <CardHeader className="text-center">
          <Skull className="w-12 h-12 mx-auto mb-4 text-red-600 animate-pulse" />
          <CardTitle className="text-2xl font-bold text-white">Enter the Shadows</CardTitle>
          <CardDescription className="text-gray-400">Join the digital vigilante movement</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-red-600">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-white data-[state=active]:bg-red-600">
                Join Us
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="vigilante@justice.com"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-gray-800 border-gray-700 text-white pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white horror-shadow"
                  disabled={isLoading}
                >
                  {isLoading ? "Entering..." : "Enter the Shadows"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Vigilante Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Anonymous Warrior"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="newvigilante@justice.com"
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-gray-800 border-gray-700 text-white pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white horror-shadow"
                  disabled={isLoading}
                >
                  {isLoading ? "Joining..." : "Join the Movement"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent"
              onClick={() => router.push("/dashboard")}
            >
              Continue as Anonymous
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
