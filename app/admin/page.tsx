"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  BarChart3,
  ArrowLeft,
  Brain,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const mockComplaints = [
  {
    id: 1,
    title: "Corrupt Traffic Police Demanding Bribes",
    category: "corruption",
    location: "Connaught Place, Delhi",
    status: "pending",
    priority: "high",
    submittedBy: "Anonymous",
    submittedAt: "2024-01-15",
    upvotes: 234,
    evidence: true,
  },
  {
    id: 2,
    title: "Municipal Corporation Ignoring Garbage Collection",
    category: "civic",
    location: "Sector 15, Noida",
    status: "in-review",
    priority: "medium",
    submittedBy: "Concerned Citizen",
    submittedAt: "2024-01-14",
    upvotes: 189,
    evidence: false,
  },
  {
    id: 3,
    title: "Police Station Refusing to File FIR",
    category: "law",
    location: "Karol Bagh, Delhi",
    status: "resolved",
    priority: "high",
    submittedBy: "Justice Seeker",
    submittedAt: "2024-01-13",
    upvotes: 456,
    evidence: true,
  },
]

export default function AdminPage() {
  const [complaints, setComplaints] = useState(mockComplaints)
  const { toast } = useToast()

  const updateComplaintStatus = (id: number, newStatus: string) => {
    setComplaints((prev) =>
      prev.map((complaint) => (complaint.id === id ? { ...complaint, status: newStatus } : complaint)),
    )

    toast({
      title: "Status Updated",
      description: `Complaint status changed to ${newStatus}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600"
      case "in-review":
        return "bg-blue-600"
      case "resolved":
        return "bg-green-600"
      case "rejected":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const stats = {
    totalComplaints: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    inReview: complaints.filter((c) => c.status === "in-review").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/90 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-red-600" />
              <span className="text-white font-bold">Admin Control Center</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Stats Overview with AI */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-white mb-1">{stats.totalComplaints}</div>
              <div className="text-sm text-gray-400">Total Reports</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-white mb-1">{stats.pending}</div>
              <div className="text-sm text-gray-400">Pending Review</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-white mb-1">{stats.inReview}</div>
              <div className="text-sm text-gray-400">In Review</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-white mb-1">{stats.resolved}</div>
              <div className="text-sm text-gray-400">Resolved</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-gray-900/70 border-purple-500/30 horror-shadow">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white mb-1">94%</div>
              <div className="text-sm text-gray-400">AI Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="complaints" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="complaints" className="text-white data-[state=active]:bg-red-600">
              Manage Complaints
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-red-600">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="text-white data-[state=active]:bg-red-600">
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-red-600">
              User Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="complaints" className="mt-6">
            <Card className="bg-gray-900/90 border-red-900/30 horror-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Complaint Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{complaint.title}</h3>
                            <Badge className={`${getStatusColor(complaint.status)} text-white`}>
                              {complaint.status.replace("-", " ").toUpperCase()}
                            </Badge>
                            <span className={`text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                              {complaint.priority.toUpperCase()} PRIORITY
                            </span>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-400 mb-3">
                            <span>📍 {complaint.location}</span>
                            <span>📅 {complaint.submittedAt}</span>
                            <span>👤 {complaint.submittedBy}</span>
                            <span>👍 {complaint.upvotes} upvotes</span>
                            {complaint.evidence && <span className="text-green-400">📎 Evidence attached</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">Update Status:</span>
                          <Select
                            value={complaint.status}
                            onValueChange={(value) => updateComplaintStatus(complaint.id, value)}
                          >
                            <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-review">In Review</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent"
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white bg-transparent"
                          >
                            Contact Reporter
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-red-500" />
                    Category Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Corruption</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full">
                          <div className="w-16 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-white">67%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Civic Issues</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full">
                          <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-white">33%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Law & Order</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full">
                          <div className="w-12 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-white">50%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
                <CardHeader>
                  <CardTitle className="text-white">Resolution Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">73%</div>
                    <p className="text-gray-300 mb-4">Cases successfully resolved</p>
                    <div className="w-full h-4 bg-gray-700 rounded-full">
                      <div className="w-3/4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-insights" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/30 to-gray-900/70 border-purple-500/30 horror-shadow">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-400" />
                    AI Categorization Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Corruption Detection</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full">
                          <div className="w-20 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-white">95%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Civic Issues</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full">
                          <div className="w-18 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-white">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Law & Order</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full">
                          <div className="w-22 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-white">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Healthcare</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full">
                          <div className="w-19 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-white">91%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/70 border-red-900/30 horror-shadow">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                    AI Processing Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">1,247</div>
                      <p className="text-gray-300">Total AI Categorizations</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">2.3s</div>
                      <p className="text-gray-300">Average Processing Time</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">99.2%</div>
                      <p className="text-gray-300">System Uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 bg-gray-900/90 border-red-900/30 horror-shadow">
              <CardHeader>
                <CardTitle className="text-white">Recent AI Categorizations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Hospital overcharging patients",
                      category: "healthcare",
                      confidence: 0.94,
                      time: "2 min ago",
                    },
                    {
                      title: "Traffic police demanding bribes",
                      category: "corruption",
                      confidence: 0.97,
                      time: "5 min ago",
                    },
                    {
                      title: "Garbage not collected for weeks",
                      category: "civic",
                      confidence: 0.89,
                      time: "8 min ago",
                    },
                    { title: "Police refusing to file FIR", category: "law", confidence: 0.93, time: "12 min ago" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <span>Category: {item.category}</span>
                          <span>Confidence: {Math.round(item.confidence * 100)}%</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                        <Brain className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card className="bg-gray-900/90 border-red-900/30 horror-shadow">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-red-500" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-bold text-white mb-2">User Management</h3>
                  <p className="text-gray-400">Advanced user management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
