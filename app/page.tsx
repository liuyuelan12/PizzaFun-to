"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Shield,
  Github,
  Twitter,
  MessageCircle,
  Play,
  Download,
  ChevronRight,
  Menu,
  X,
  Rocket,
  Target,
  Code,
  Database,
  Network,
  Sparkles,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts"
import Link from "next/link"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const glowVariants = {
  initial: { boxShadow: "0 0 0 rgba(255, 147, 37, 0)" },
  animate: {
    boxShadow: [
      "0 0 20px rgba(255, 147, 37, 0.3)",
      "0 0 40px rgba(255, 147, 37, 0.6)",
      "0 0 20px rgba(255, 147, 37, 0.3)",
    ],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
  },
}

// 打字机效果组件
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }
      },
      delay + currentIndex * 50,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// 磁性按钮效果组件
function MagneticButton({ children, className = "", ...props }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 文字逐字显示动画组件
function AnimatedText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.div className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.05,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// 鼠标跟随光标效果
function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-orange-500/30 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    />
  )
}

// 波浪动画组件
function WaveAnimation() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      <svg
        className="relative block w-full h-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill="rgba(255, 147, 37, 0.1)"
          animate={{
            d: [
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
              "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
}

// 脉冲圆环动画
function PulseRing({ size = 100, color = "#FF9325" }: { size?: number; color?: string }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 opacity-75"
          style={{ borderColor: color }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.6,
          }}
        />
      ))}
      <div className="absolute inset-2 rounded-full" style={{ backgroundColor: color, opacity: 0.2 }} />
    </div>
  )
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? "rgba(255,147,37,0.6)" : "rgba(147,51,234,0.4)"
            }, transparent)`,
          }}
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            scale: 0,
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Grid background component
function GridBackground() {
  return (
    <div className="absolute inset-0 opacity-20">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 147, 37, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 147, 37, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}

// Animated counter with glitch effect
function GlitchCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      // Random glitch effect
      if (Math.random() < 0.1) {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 100)
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span className={`font-mono ${glitch ? "animate-pulse text-red-500" : ""}`}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Holographic card component
function HolographicCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]))
  const scale = useSpring(1)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
    scale.set(1.05)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu ${className}`}
      whileHover={{ z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-lg blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />
      <div className="relative bg-black/80 backdrop-blur-xl border border-orange-500/30 rounded-lg overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(255,147,37,0.1), transparent, rgba(147,51,234,0.1))",
              "linear-gradient(135deg, rgba(147,51,234,0.1), transparent, rgba(255,147,37,0.1))",
              "linear-gradient(225deg, rgba(255,147,37,0.1), transparent, rgba(147,51,234,0.1))",
              "linear-gradient(315deg, rgba(147,51,234,0.1), transparent, rgba(255,147,37,0.1))",
            ],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        {children}
      </div>
    </motion.div>
  )
}

export default function PizzaFunLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  // Performance data for charts
  const performanceData = [
    { name: "0s", traditional: 0, pizzafun: 0 },
    { name: "2s", traditional: 0, pizzafun: 100 },
    { name: "60s", traditional: 10, pizzafun: 100 },
    { name: "300s", traditional: 50, pizzafun: 100 },
    { name: "600s", traditional: 100, pizzafun: 100 },
  ]

  // Tokenomics data with futuristic colors
  const tokenomicsData = [
    { name: "Ecosystem Development", value: 30, color: "#FF9325" },
    { name: "Trading Mining", value: 15, color: "#00D4FF" },
    { name: "Founding Team", value: 14, color: "#9D4EDD" },
    { name: "Private Rounds", value: 10, color: "#06FFA5" },
    { name: "Liquidity Pool", value: 10, color: "#FF006E" },
    { name: "Marketing", value: 6, color: "#FB8500" },
    { name: "Advisors", value: 5, color: "#8ECAE6" },
    { name: "Reserve", value: 5, color: "#FFB3BA" },
    { name: "Airdrops", value: 5, color: "#BAFFC9" },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* 鼠标跟随光标 */}
      <MouseFollower />

      {/* Animated grid background */}
      <GridBackground />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Cyber header */}
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-orange-500/30">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-purple-500/5" />
        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Futuristic logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-50" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-lg">🍕</span>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                  PizzaFun
                </span>
                <div className="text-xs text-orange-500/70 font-mono">v2.0.1</div>
              </div>
            </motion.div>

            {/* Futuristic navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Features", "Technology", "Tokenomics", "Roadmap", "Community"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="relative text-gray-300 hover:text-orange-500 transition-all duration-300 font-mono text-sm group"
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-orange-500/20 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Cyber CTA buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-orange-500/50 text-orange-500 hover:bg-orange-500/20 bg-transparent backdrop-blur-sm font-mono"
              >
                <Code className="mr-2 w-4 h-4" />
                Whitepaper
              </Button>
              <motion.div variants={glowVariants} initial="initial" animate="animate">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-mono relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                  <Rocket className="mr-2 w-4 h-4" />
                  Launch App
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {/* Futuristic Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-6xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Cyber title */}
            <motion.div className="mb-8" variants={fadeInUp}>
              <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
                <span className="text-orange-500 font-mono text-sm">NEXT-GEN TRADING PROTOCOL</span>
              </div>
            </motion.div>

            <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight" variants={fadeInUp}>
              <AnimatedText
                text="BITCOIN TRADING"
                className="block bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent"
                delay={0.5}
              />
              <AnimatedText
                text="REDEFINED"
                className="block bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500 bg-clip-text text-transparent"
                delay={2}
              />
              <motion.div
                className="inline-block ml-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ⚡
              </motion.div>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-light"
              variants={fadeInUp}
            >
              Experience the future of decentralized finance with{" "}
              <span className="text-orange-500 font-semibold">2-second confirmations</span>,{" "}
              <span className="text-orange-500 font-semibold">zero gas fees</span>, and{" "}
              <span className="text-orange-500 font-semibold">military-grade security</span>
            </motion.p>

            {/* Futuristic stats display */}
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" variants={fadeInUp}>
              {[
                { value: "2", suffix: "SEC", label: "Confirmation Time", icon: <Zap className="w-8 h-8" /> },
                { value: "35000", suffix: "TPS", label: "Peak Throughput", icon: <Database className="w-8 h-8" /> },
                { value: "0", suffix: "$", label: "Gas Fees", icon: <Target className="w-8 h-8" /> },
              ].map((stat, index) => (
                <HolographicCard key={index} className="p-8">
                  <CardContent className="p-0 text-center relative">
                    <div className="absolute -top-4 -right-4">
                      <PulseRing size={60} />
                    </div>
                    <motion.div
                      className="text-orange-500 mb-4 flex justify-center"
                      animate={{
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotateY: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 mb-2">
                      <GlitchCounter end={Number.parseInt(stat.value)} suffix={stat.suffix} />
                    </div>
                    <div className="text-gray-400 font-mono text-sm">{stat.label}</div>
                    <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />
                  </CardContent>
                </HolographicCard>
              ))}
            </motion.div>

            {/* Cyber CTAs */}
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" variants={fadeInUp}>
              <MagneticButton>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-12 py-6 font-mono relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Rocket className="mr-3 w-5 h-5" />
                  </motion.div>
                  INITIALIZE TRADING
                  <ChevronRight className="ml-3 w-5 h-5" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-500/50 text-orange-500 hover:bg-orange-500/20 text-lg px-12 py-6 bg-transparent backdrop-blur-sm font-mono"
                >
                  <Play className="mr-3 w-5 h-5" />
                  SYSTEM DEMO
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Futuristic Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
                <span className="text-orange-500 font-mono text-sm">CORE ARCHITECTURE</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
                QUANTUM LEAP TECHNOLOGY
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-16 h-16" />,
                  title: "HYPER-SPEED PROCESSING",
                  description:
                    "CrustNet quantum backend processes Bitcoin transactions in 2 seconds using advanced sharding and parallel computation.",
                  stats: ["300x Faster", "2s Confirmation", "35K TPS"],
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: <Shield className="w-16 h-16" />,
                  title: "QUANTUM SECURITY",
                  description:
                    "Military-grade TSS and MPC protocols ensure your assets are protected by distributed cryptographic signatures.",
                  stats: ["Zero Trust", "TSS Protocol", "MPC Secured"],
                  color: "from-blue-500 to-purple-500",
                },
                {
                  icon: <Network className="w-16 h-16" />,
                  title: "NEURAL TRADING ENGINE",
                  description:
                    "AI-powered AMM with dynamic bonding curves and intelligent liquidity distribution across multiple phases.",
                  stats: ["AI Powered", "Dynamic AMM", "Smart Routes"],
                  color: "from-green-500 to-teal-500",
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <HolographicCard className="h-full">
                    <CardContent className="p-8">
                      <motion.div
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.color} mb-6 flex justify-center`}
                        animate={{
                          y: [0, -10, 0],
                          rotateX: [0, 10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold mb-4 text-center font-mono">{feature.title}</h3>
                      <p className="text-gray-300 mb-6 leading-relaxed text-center">{feature.description}</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {feature.stats.map((stat, statIndex) => (
                          <Badge
                            key={statIndex}
                            className={`bg-gradient-to-r ${feature.color} text-white font-mono text-xs`}
                          >
                            {stat}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </HolographicCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance Comparison Chart */}
      <section className="py-20 bg-gradient-to-b from-transparent to-orange-500/5 relative">
        <WaveAnimation />
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent mb-8">
                PERFORMANCE MATRIX
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <HolographicCard>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-orange-500 font-mono">TRANSACTION SPEED ANALYSIS</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                          <defs>
                            <linearGradient id="pizzafun" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FF9325" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#FF9325" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="traditional" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#666666" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#666666" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" stroke="#666" />
                          <YAxis stroke="#666" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0,0,0,0.8)",
                              border: "1px solid #FF9325",
                              borderRadius: "8px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="traditional"
                            stroke="#666666"
                            fillOpacity={1}
                            fill="url(#traditional)"
                            name="Traditional Bitcoin"
                          />
                          <Area
                            type="monotone"
                            dataKey="pizzafun"
                            stroke="#FF9325"
                            fillOpacity={1}
                            fill="url(#pizzafun)"
                            name="PizzaFun Protocol"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </HolographicCard>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-orange-500 font-mono">SYSTEM METRICS</h3>
                  {[
                    { metric: "LATENCY", value: "< 2ms", description: "Ultra-low latency trading execution" },
                    { metric: "THROUGHPUT", value: "35,000 TPS", description: "Peak transaction processing capacity" },
                    { metric: "UPTIME", value: "99.99%", description: "Enterprise-grade reliability" },
                    { metric: "SECURITY", value: "QUANTUM", description: "Post-quantum cryptographic protection" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-black/50 border border-orange-500/30 rounded-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.02, borderColor: "rgba(255, 147, 37, 0.6)" }}
                    >
                      <div>
                        <div className="text-orange-500 font-mono font-bold">{item.metric}</div>
                        <div className="text-gray-400 text-sm">{item.description}</div>
                      </div>
                      <div className="text-2xl font-bold text-white font-mono">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Futuristic Tokenomics */}
      <section id="tokenomics" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-purple-500/5" />
        <div className="container mx-auto px-4 relative">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
                <span className="text-orange-500 font-mono text-sm">TOKEN ECONOMICS</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
                $PIZZA DISTRIBUTION
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <HolographicCard>
                  <CardContent className="p-8">
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={tokenomicsData}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${value}%`}
                          >
                            {tokenomicsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0,0,0,0.9)",
                              border: "1px solid #FF9325",
                              borderRadius: "8px",
                              fontFamily: "monospace",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </HolographicCard>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 mb-2 font-mono">
                      210,000,000
                    </div>
                    <div className="text-gray-400 font-mono">TOTAL $PIZZA SUPPLY</div>
                    <div className="text-sm text-orange-500/70 mt-2 font-mono">// Tribute to Bitcoin's 21M × 10</div>
                  </div>

                  <div className="space-y-3">
                    {tokenomicsData.slice(0, 5).map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-4 bg-black/50 border border-orange-500/20 rounded-lg backdrop-blur-sm font-mono"
                        whileHover={{ borderColor: "rgba(255, 147, 37, 0.5)" }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-gray-300">{item.name}</span>
                        </div>
                        <span className="font-bold text-orange-500">{item.value}%</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/30 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4 text-orange-500 font-mono">TOKEN UTILITIES</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {["Trading Discounts", "Governance Rights", "Staking Rewards", "Deflationary Burns"].map(
                        (utility, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span className="text-gray-300 font-mono">{utility}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cyber Roadmap */}
      <section id="roadmap" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
                <span className="text-orange-500 font-mono text-sm">DEVELOPMENT TIMELINE</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
                MISSION ROADMAP
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-purple-500 rounded-full" />

              <div className="space-y-16">
                {[
                  {
                    period: "Q4 2024",
                    title: "GENESIS PROTOCOL",
                    items: ["Mainnet deployment", "Runes integration", "Core trading engine"],
                    status: "ACTIVE",
                  },
                  {
                    period: "Q1 2025",
                    title: "MOBILE MATRIX",
                    items: ["iOS/Android apps", "User acquisition", "Community rewards"],
                    status: "NEXT",
                  },
                  {
                    period: "Q2 2025",
                    title: "ECOSYSTEM EXPANSION",
                    items: ["Ordinals support", "BRC-20 integration", "Advanced features"],
                    status: "PLANNED",
                  },
                  {
                    period: "Q3 2025",
                    title: "CROSS-CHAIN BRIDGE",
                    items: ["Multi-chain support", "Developer APIs", "Third-party tools"],
                    status: "PLANNED",
                  },
                  {
                    period: "2026+",
                    title: "DEFI SINGULARITY",
                    items: ["Full DeFi suite", "Global adoption", "Quantum upgrades"],
                    status: "FUTURE",
                  },
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                    variants={fadeInUp}
                  >
                    <div className="flex-1" />
                    <div className="relative z-10 mx-8">
                      <motion.div
                        className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full border-4 border-black"
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(255, 147, 37, 0.7)",
                            "0 0 0 10px rgba(255, 147, 37, 0)",
                            "0 0 0 0 rgba(255, 147, 37, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.3,
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <HolographicCard>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge
                              className={`font-mono ${
                                milestone.status === "ACTIVE"
                                  ? "bg-green-500"
                                  : milestone.status === "NEXT"
                                    ? "bg-orange-500"
                                    : "bg-gray-500"
                              }`}
                            >
                              {milestone.status}
                            </Badge>
                            <span className="text-orange-500 font-mono font-bold">{milestone.period}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-orange-500 font-mono">{milestone.title}</h3>
                          <ul className="space-y-2">
                            {milestone.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-center space-x-2 text-gray-300 font-mono text-sm"
                              >
                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </HolographicCard>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,147,37,0.1),transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-8">
                <span className="text-orange-500 font-mono text-sm">JOIN THE REVOLUTION</span>
              </div>
            </motion.div>

            <motion.h2 className="text-4xl md:text-6xl font-bold mb-8" variants={fadeInUp}>
              <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
                ENTER THE FUTURE
              </span>
            </motion.h2>

            <motion.p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light" variants={fadeInUp}>
              Join thousands of traders already experiencing the next generation of Bitcoin token trading.
              <br />
              <span className="text-orange-500 font-semibold">The future is now.</span>
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" variants={fadeInUp}>
              <MagneticButton>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-xl px-16 py-8 font-mono relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Rocket className="mr-3 w-6 h-6" />
                  LAUNCH PROTOCOL
                  <ChevronRight className="ml-3 w-6 h-6" />
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-500/50 text-orange-500 hover:bg-orange-500/20 text-xl px-16 py-8 bg-transparent backdrop-blur-sm font-mono"
                >
                  <Download className="mr-3 w-6 h-6" />
                  ACCESS TOKENS
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cyber Footer */}
      <footer className="py-16 bg-black border-t border-orange-500/30 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-50" />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-lg">🍕</span>
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                    PizzaFun
                  </span>
                  <div className="text-xs text-orange-500/70 font-mono">PROTOCOL v2.0</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 font-mono text-sm">
                // Revolutionizing Bitcoin Token Trading
                <br />
                // Through Quantum Technology
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Twitter />, href: "#" },
                  { icon: <MessageCircle />, href: "#" },
                  { icon: <Github />, href: "#" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 0 20px rgba(255, 147, 37, 0.5)",
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={social.href}
                      className="w-10 h-10 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center text-orange-500 hover:bg-orange-500/30 transition-colors"
                    >
                      {social.icon}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Links sections */}
            {[
              {
                title: "PROTOCOL",
                links: ["Features", "Technology", "Security", "Documentation"],
              },
              {
                title: "COMMUNITY",
                links: ["Discord", "Twitter", "Telegram", "GitHub"],
              },
              {
                title: "RESOURCES",
                links: ["Whitepaper", "API Docs", "Blog", "Support"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4 text-orange-500 font-mono">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-orange-500 transition-colors font-mono text-sm"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-orange-500/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-mono">
              © 2024 PizzaFun Protocol. All rights reserved. | Built for the future.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Terms", "Privacy", "Security"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-mono"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Custom styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        
        .glow-text {
          text-shadow: 0 0 20px rgba(255, 147, 37, 0.5);
        }
        
        .glow-button {
          box-shadow: 0 0 30px rgba(255, 147, 37, 0.3);
        }
        
        .glow-button:hover {
          box-shadow: 0 0 40px rgba(255, 147, 37, 0.5);
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
