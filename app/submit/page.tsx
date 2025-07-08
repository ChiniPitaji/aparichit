"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Skull,
  Upload,
  MapPin,
  AlertTriangle,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  Sparkles,
  Brain,
  X,
  FileImage,
  FileVideo,
  FileText,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useRealTimeComplaints } from "@/hooks/useRealTimeComplaints"

interface UploadedFile {
  url: string
  filename: string
  size: number
  type: string
}

export default function SubmitPage() {
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  })

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string
    confidence: number
    reasoning: string
  } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAiSuggestion, setShowAiSuggestion] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { submitComplaint } = useRealTimeComplaints({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const complaintData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        author_name: isAnonymous ? "Anonymous Vigilante" : "Concerned Citizen",
        is_anonymous: isAnonymous,
        ai_categorized: !!aiSuggestion,
        ai_confidence: aiSuggestion?.confidence || 0,
        evidence_files: uploadedFiles,
        user_id: null, // In real app, get from auth
      }

      await submitComplaint(complaintData)

      toast({
        title: "Justice Report Submitted",
        description: `Your report has been added to the shadows${uploadedFiles.length > 0 ? ` with ${uploadedFiles.length} evidence file(s)` : ""}. The vigilantes will see it.`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit report",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Upload failed")
        }

        const uploadedFile = await response.json()
        setUploadedFiles((prev) => [...prev, uploadedFile])
        setUploadProgress(((i + 1) / files.length) * 100)
      }

      toast({
        title: "Evidence Uploaded",
        description: `${files.length} file(s) uploaded successfully to the shadows.`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload evidence",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    toast({
      title: "Evidence Removed",
      description: "File removed from your report.",
    })
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return FileImage
    if (type.startsWith("video/")) return FileVideo
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const analyzeComplaint = useCallback(async (title: string, description: string) => {
    if (!title.trim() && !description.trim()) {
      setAiSuggestion(null)
      setShowAiSuggestion(false)
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      })

      const result = await response.json()
      setAiSuggestion(result)
      setShowAiSuggestion(true)
    } catch (error) {
      console.error("AI categorization failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  // Debounced AI analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.title || formData.description) {
        analyzeComplaint(formData.title, formData.description)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [formData.title, formData.description, analyzeComplaint])

  const acceptAiSuggestion = () => {
    if (aiSuggestion) {
      setFormData((prev) => ({ ...prev, category: aiSuggestion.category }))
      setShowAiSuggestion(false)
      toast({
        title: "AI Suggestion Accepted",
        description: `Category set to ${aiSuggestion.category}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/90 border-b border-red-900/30">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
              <Skull className="w-6 h-6 text-red-600" />
              <span className="text-white font-bold">Report Injustice</span>
              <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-gray-900/90 border-red-900/30 horror-shadow">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />
              Expose the Truth
            </CardTitle>
            <p className="text-gray-400">
              Every injustice reported brings us closer to a just society. Your voice matters.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Anonymous Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-red-900/20">
                <div className="flex items-center space-x-3">
                  {isAnonymous ? (
                    <EyeOff className="w-5 h-5 text-red-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-blue-500" />
                  )}
                  <div>
                    <Label className="text-white font-medium">Anonymous Reporting</Label>
                    <p className="text-sm text-gray-400">
                      {isAnonymous ? "Your identity will be hidden" : "Your identity will be visible"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Report Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Describe the injustice in one line..."
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              {/* Category with AI Suggestion */}
              <div className="space-y-2">
                <Label className="text-white">
                  Category <span className="text-red-500">*</span>
                </Label>

                {/* AI Suggestion Card */}
                {showAiSuggestion && aiSuggestion && (
                  <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg mb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium text-purple-400">AI Analysis Complete</span>
                          <Badge className="bg-purple-600/20 text-purple-300 text-xs">
                            {Math.round(aiSuggestion.confidence * 100)}% confident
                          </Badge>
                        </div>
                        <p className="text-sm text-white mb-2">
                          <strong>Suggested Category:</strong> {aiSuggestion.category}
                        </p>
                        <p className="text-xs text-gray-300">{aiSuggestion.reasoning}</p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={acceptAiSuggestion}
                        className="bg-purple-600 hover:bg-purple-700 text-white ml-3"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                )}

                {/* Loading indicator */}
                {isAnalyzing && (
                  <div className="flex items-center space-x-2 text-purple-400 text-sm mb-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI analyzing your complaint...</span>
                  </div>
                )}

                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  required
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select category of injustice" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="corruption">💰 Corruption</SelectItem>
                    <SelectItem value="civic">🏛️ Civic Issues</SelectItem>
                    <SelectItem value="law">⚖️ Law & Order</SelectItem>
                    <SelectItem value="environment">🌍 Environmental</SelectItem>
                    <SelectItem value="healthcare">🏥 Healthcare</SelectItem>
                    <SelectItem value="education">📚 Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="location"
                    placeholder="Where did this injustice occur?"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Detailed Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the injustice. Include dates, people involved, and any other relevant details..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  required
                />
              </div>

              {/* Evidence Upload */}
              <div className="space-y-2">
                <Label className="text-white">Evidence (Optional)</Label>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                  <input
                    type="file"
                    id="evidence"
                    accept="image/*,video/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    disabled={isUploading}
                  />
                  <label htmlFor="evidence" className="cursor-pointer">
                    {isUploading ? (
                      <div className="space-y-4">
                        <Loader2 className="w-8 h-8 mx-auto text-red-500 animate-spin" />
                        <p className="text-red-400">Uploading evidence to the shadows...</p>
                        <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-400 mb-1">Upload photos, videos, or documents</p>
                        <p className="text-sm text-gray-500">Max file size: 10MB per file</p>
                      </>
                    )}
                  </label>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <h4 className="text-white font-medium">Uploaded Evidence:</h4>
                    {uploadedFiles.map((file, index) => {
                      const FileIcon = getFileIcon(file.type)
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                        >
                          <div className="flex items-center space-x-3">
                            <FileIcon className="w-5 h-5 text-blue-400" />
                            <div>
                              <p className="text-white text-sm font-medium">{file.filename}</p>
                              <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                              <Check className="w-3 h-3 mr-1" />
                              Uploaded
                            </Badge>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Warning */}
              <div className="p-4 bg-red-900/20 border border-red-900/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-medium mb-1">Important Notice</h4>
                    <p className="text-sm text-gray-300">
                      Ensure all information provided is accurate and truthful. False reports undermine the cause of
                      justice. Your report will be reviewed by the community and relevant authorities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg horror-shadow pulse-red"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting to the Shadows...
                  </>
                ) : (
                  <>
                    <Skull className="w-5 h-5 mr-2" />
                    Submit Justice Report
                    {uploadedFiles.length > 0 && (
                      <Badge className="ml-2 bg-green-600/20 text-green-300">
                        {uploadedFiles.length} evidence file{uploadedFiles.length > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
