"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { sendToVoid } from "@/lib/actions"
import { AnimatePresence, motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

export default function VoidInbox() {
  const [message, setMessage] = useState("")
  const [voidResponse, setVoidResponse] = useState<string | null>(null)
  const [showResponse, setShowResponse] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedResponse, setDisplayedResponse] = useState("")
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const typewriterEffect = (text: string) => {
    setDisplayedResponse("")
    setIsTyping(true)
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedResponse(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setIsTyping(false)
        // Auto-hide void response after 12 seconds
        setTimeout(() => {
          setShowResponse(false)
        }, 12000)
      }
    }, 50)
  }

  const createParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 2000)
  }

  const handleSend = async () => {
    if (!message.trim()) return

    // Create particle effect
    createParticles()

    // Clear message instantly
    const currentMessage = message
    setMessage("")

    // Keep focus on textarea to prevent keyboard from closing on mobile
    if (textareaRef.current) {
      textareaRef.current.focus()
    }

    // Check for void response
    const response = await sendToVoid(currentMessage)

    if (response) {
      setVoidResponse(response)
      setShowResponse(true)
      typewriterEffect(response)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleGitHubClick = () => {
    // Verify the URL and open in new tab with proper security
    const githubUrl = "https://github.com/bijanmurmu/void-inbox"
    console.log("Navigating to:", githubUrl) // For debugging
    window.open(githubUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 0,
              scale: 0,
              x: `${particle.x}vw`,
              y: `${particle.y}vh`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: `${particle.y - 20}vh`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-1 h-1 bg-gray-500 rounded-full pointer-events-none"
          />
        ))}
      </AnimatePresence>

      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #333 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #333 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, #333 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, #333 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-full h-full"
        />
      </div>

      {/* Enhanced Header with GitHub Integration */}
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        {/* Left side - GitHub Repository Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <motion.button
            onClick={handleGitHubClick}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 
                     bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm rounded-lg px-3 py-2
                     border border-gray-800 hover:border-gray-600"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View source code on GitHub"
            title="View source code on GitHub"
          >
            <Github size={16} className="md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-medium hidden sm:inline">Source</span>
            <ExternalLink size={12} className="md:w-3 md:h-3 opacity-60" />
          </motion.button>
        </motion.div>

        {/* Right side - Attribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-3 text-gray-400"
        ></motion.div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:p-4 relative z-10 mt-16">
        <div className="w-full max-w-sm md:max-w-md">
          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-2xl md:text-4xl font-light tracking-wider mb-3 md:mb-4"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 5px rgba(255,255,255,0.1)",
                    "0 0 0px rgba(255,255,255,0)",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                VOID INBOX
              </motion.h1>
              <p className="text-xs md:text-sm text-gray-400 px-4 leading-relaxed">
                Write messages to no one. They disappear after you send them. Occasionally, the Void replies.
              </p>
            </motion.div>

            <div className="w-full space-y-4 md:space-y-4">
              <AnimatePresence mode="wait">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                  <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Write to the void..."
                    className="bg-gray-900 border-gray-800 resize-none h-32 md:h-32 text-white text-base md:text-sm 
                             focus:outline-none focus:ring-0 focus:border-gray-700 
                             placeholder:text-gray-500 leading-relaxed p-4
                             transition-all duration-200 hover:border-gray-700"
                    autoFocus
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {showResponse && voidResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="bg-gray-900 border border-gray-800 p-4 md:p-4 rounded-md relative overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800"
                    />
                    <p className="text-gray-300 italic text-sm md:text-sm leading-relaxed">
                      {displayedResponse}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                          className="ml-1"
                        >
                          |
                        </motion.span>
                      )}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white h-12 md:h-10 
                           text-base md:text-sm font-medium transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           active:bg-gray-600 touch-manipulation
                           hover:shadow-lg hover:shadow-gray-900/20"
                >
                  <motion.span
                    animate={
                      !message.trim()
                        ? {}
                        : {
                            textShadow: [
                              "0 0 0px rgba(255,255,255,0)",
                              "0 0 3px rgba(255,255,255,0.3)",
                              "0 0 0px rgba(255,255,255,0)",
                            ],
                          }
                    }
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Send to Void
                  </motion.span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
