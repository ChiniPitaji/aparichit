"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  ArrowUp,
  MessageCircle,
  MapPin,
  Calendar,
  Filter,
  Skull,
  Eye,
  Trophy,
  Brain,
  Sparkles,
  FileImage,
  FileVideo,
  FileText,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useRealTimeComplaints } from "@/hooks/useRealTimeComplaints"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAiStats, setShowAiStats] = useState(true)
  const [currentUserId] = useState("anonymous-user") // In real app, get from auth

  const { toast } = useToast()

  const { complaints, loading, error, refetch, voteOnComplaint } = useRealTimeComplaints({
    category: filterCategory,
    status: filterStatus,
    search: searchTerm,
  })

  const handleUpvote = async (complaintId: string) => {
    try {
      await voteOnComplaint(complaintId, "upvote", currentUserId)
      toast({
        title: "Vote Recorded",
        description: "Your support has been added to this report.",
      })
    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "Unable to record your vote. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600"
      case "in-review":
        return "bg-blue-600"
      case "resolved":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "corruption":
        return "💰"
      case "civic":
        return "🏛️"
      case "law":
        return "⚖️"
      case "environment":
        return "🌍"
      case "healthcare":
        return "🏥"
      case "education":
        return "📚"
      default:
        return "📋"
    }
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return FileImage
    if (type.startsWith("video/")) return FileVideo
    return FileText
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate AI stats
  const aiCategorizedCount = complaints.filter((c) => c.ai_categorized).length
  const avgAiConfidence =
    aiCategorizedCount > 0
      ? complaints.filter((c) => c.ai_categorized).reduce((sum, c) => sum + (c.ai_confidence || 0), 0) /
        aiCategorizedCount
      : 0

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gray-900/70 border-red-900/30 horror-shadow max-w-md">
          <CardContent className="p-8 text-center">
            <Skull className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-bold text-white mb-4">Connection Failed</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <Button onClick={refetch} className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/90 border-b border-red-900/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skull className="w-8 h-8 text-red-600" />
              <h1 className="text-2xl font-bold text-white">JanRakshak</h1>
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                <Brain className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1" />
                Live
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/submit">
                <Button className="bg-red-600 hover:bg-red-700 text-white horror-shadow">
                  <Plus className="w-4 h-4 mr-2" />
                  Report Injustice
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* AI Stats Card */}
            {showAiStats && (
              <Card className="bg-gradient-to-br from-purple-900/30 to-gray-900/70 border-purple-500/30 horror-shadow mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-400" />
                    AI Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">AI Categorized</span>
                    <span className="text-purple-400 font-bold">
                      {aiCategorizedCount}/{complaints.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Confidence</span>
                    <span className="text-purple-400 font-bold">{Math.round(avgAiConfidence * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gray-900/70 border-red-900/30 horror-shadow mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-red-500" />
                  Live Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Reports</span>
                  <span className="text-white font-bold">{complaints.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">With Evidence</span>
                  <span className="text-green-400 font-bold">
                    {complaints.filter((c) => c.evidence_files && c.evidence_files.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Your Karma</span>
                  <span className="text-red-400 font-bold">2,340</span>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-red-500" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Category</label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="corruption">Corruption</SelectItem>
                      <SelectItem value="civic">Civic Issues</SelectItem>
                      <SelectItem value="law">Law & Order</SelectItem>
                      <SelectItem value="environment">Environmental</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-review">In Review</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for injustice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
                <CardContent className="p-12 text-center">
                  <Loader2 className="w-16 h-16 mx-auto mb-4 text-red-600 animate-spin" />
                  <h3 className="text-xl font-bold text-white mb-2">Loading Justice Reports</h3>
                  <p className="text-gray-400">Connecting to the shadows...</p>
                </CardContent>
              </Card>
            )}

            {/* Complaints Feed */}
            {!loading && (
              <div className="space-y-6">
                {complaints.map((complaint) => (
                  <Card
                    key={complaint.id}
                    className="bg-gray-900/70 border-red-900/30 horror-shadow hover:justice-glow transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{getCategoryIcon(complaint.category)}</div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">{complaint.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {complaint.location}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(complaint.created_at)}
                              </span>
                              {complaint.ai_categorized && (
                                <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs">
                                  <Brain className="w-3 h-3 mr-1" />
                                  AI: {Math.round((complaint.ai_confidence || 0) * 100)}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(complaint.status)} text-white`}>
                          {complaint.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">{complaint.description}</p>

                      {/* Evidence Files */}
                      {complaint.evidence_files && complaint.evidence_files.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Evidence Attached:</h4>
                          <div className="flex flex-wrap gap-2">
                            {complaint.evidence_files.map((file, index) => {
                              const FileIcon = getFileIcon(file.file_type)
                              return (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
                                >
                                  <FileIcon className="w-4 h-4 text-blue-400" />
                                  <span className="text-sm text-gray-300">{file.filename}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1 h-auto text-blue-400 hover:text-blue-300"
                                    onClick={() => window.open(file.file_url, "_blank")}
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                  </Button>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpvote(complaint.id)}
                            className="text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                          >
                            <ArrowUp className="w-4 h-4 mr-1" />
                            {complaint.upvotes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {complaint.comments_count}
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-red-600 text-white text-xs">
                              {complaint.is_anonymous ? "?" : complaint.author_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-400">
                            {complaint.is_anonymous ? "Anonymous" : complaint.author_name}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {complaints.length === 0 && !loading && (
                  <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
                    <CardContent className="p-12 text-center">
                      <Skull className="w-16 h-16 mx-auto mb-4 text-red-600 opacity-50" />
                      <h3 className="text-xl font-bold text-white mb-2">No Injustices Found</h3>
                      <p className="text-gray-400">The search for justice continues...</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
