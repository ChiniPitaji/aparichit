"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Trophy, Crown, Medal, Skull, ArrowLeft, Zap, Eye, Users } from "lucide-react"
import Link from "next/link"

const leaderboardData = [
  {
    rank: 1,
    name: "Shadow Warrior",
    karma: 15420,
    reportsSubmitted: 89,
    casesResolved: 67,
    badge: "Legendary Vigilante",
    isAnonymous: true,
  },
  {
    rank: 2,
    name: "Justice Phantom",
    karma: 12890,
    reportsSubmitted: 76,
    casesResolved: 54,
    badge: "Master Detective",
    isAnonymous: true,
  },
  {
    rank: 3,
    name: "Truth Seeker",
    karma: 11230,
    reportsSubmitted: 65,
    casesResolved: 48,
    badge: "Elite Investigator",
    isAnonymous: false,
  },
  {
    rank: 4,
    name: "Dark Knight",
    karma: 9870,
    reportsSubmitted: 58,
    casesResolved: 42,
    badge: "Senior Vigilante",
    isAnonymous: true,
  },
  {
    rank: 5,
    name: "Anonymous Hero",
    karma: 8650,
    reportsSubmitted: 52,
    casesResolved: 38,
    badge: "Veteran Fighter",
    isAnonymous: true,
  },
]

export default function LeaderboardPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <Trophy className="w-5 h-5 text-gray-500" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-600 to-yellow-500"
      case 2:
        return "bg-gradient-to-r from-gray-500 to-gray-400"
      case 3:
        return "bg-gradient-to-r from-amber-700 to-amber-600"
      default:
        return "bg-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/90 border-b border-red-900/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Shadows
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-red-600" />
              <span className="text-white font-bold">Hall of Justice</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <Skull className="w-16 h-16 mx-auto mb-4 text-red-600 animate-pulse" />
          <h1 className="text-4xl font-bold text-white mb-4">Digital Vigilante Leaderboard</h1>
          <p className="text-xl text-gray-300">Honor the warriors who fight for justice in the shadows</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-white mb-1">15,432</div>
              <div className="text-sm text-gray-400">Active Vigilantes</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-white mb-1">2,847</div>
              <div className="text-sm text-gray-400">Cases Resolved</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-white mb-1">892,340</div>
              <div className="text-sm text-gray-400">Total Karma Points</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="bg-gray-900/90 border-red-900/30 horror-shadow">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-red-500" />
              Top Digital Vigilantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <div
                  key={user.rank}
                  className={`p-6 rounded-lg border transition-all duration-300 hover:justice-glow ${
                    user.rank <= 3
                      ? "bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-red-900/50"
                      : "bg-gray-800/30 border-gray-700/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankColor(user.rank)}`}
                      >
                        {user.rank <= 3 ? (
                          getRankIcon(user.rank)
                        ) : (
                          <span className="text-white font-bold">#{user.rank}</span>
                        )}
                      </div>

                      {/* Avatar and Info */}
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-red-600 text-white">
                            {user.isAnonymous ? "?" : user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="text-lg font-bold text-white">{user.name}</h3>
                          <Badge className="bg-red-600/20 text-red-400 border-red-600/30">{user.badge}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">{user.karma.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Karma</div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{user.reportsSubmitted}</div>
                        <div className="text-sm text-gray-400">Reports</div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">{user.casesResolved}</div>
                        <div className="text-sm text-gray-400">Resolved</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Your Rank */}
            <div className="mt-8 p-6 bg-red-900/20 border border-red-900/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white font-bold">#47</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-red-600 text-white">A</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold text-white">Anonymous Vigilante (You)</h3>
                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">Rising Fighter</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">2,340</div>
                    <div className="text-sm text-gray-400">Karma</div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-bold text-white">12</div>
                    <div className="text-sm text-gray-400">Reports</div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">8</div>
                    <div className="text-sm text-gray-400">Resolved</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Karma System Info */}
        <Card className="mt-8 bg-gray-900/70 border-red-900/30 horror-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">How Karma Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-3">Earn Karma Points</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    • Submit a verified report: <span className="text-green-400">+100 points</span>
                  </li>
                  <li>
                    • Get upvotes on your report: <span className="text-green-400">+10 points each</span>
                  </li>
                  <li>
                    • Help resolve a case: <span className="text-green-400">+200 points</span>
                  </li>
                  <li>
                    • Provide evidence: <span className="text-green-400">+50 points</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-3">Vigilante Ranks</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    • <span className="text-yellow-500">Legendary Vigilante</span>: 15,000+ karma
                  </li>
                  <li>
                    • <span className="text-purple-400">Master Detective</span>: 10,000+ karma
                  </li>
                  <li>
                    • <span className="text-blue-400">Elite Investigator</span>: 5,000+ karma
                  </li>
                  <li>
                    • <span className="text-green-400">Rising Fighter</span>: 1,000+ karma
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
