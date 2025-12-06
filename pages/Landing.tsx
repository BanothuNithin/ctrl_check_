import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  MessageCircle,
  BarChart3,
  Shield,
  CheckSquare,
  Star,
} from "lucide-react";
import { Button, Card, Badge } from "../components/ui/design-system";

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <Card className="p-6 border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
      <Icon className="text-slate-900 h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </Card>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="../assets/add-logo.png"
              alt="CtrlCheck Logo"
              className="h-8 w-8"
            />
            <span className="font-bold text-lg tracking-tight">CtrlCheck</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a
              href="#features"
              className="hover:text-slate-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="hover:text-slate-900 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="hover:text-slate-900 transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 rounded-full px-4 py-1.5"
            >
              <span className="mr-2">✨</span> Introducing Future Integration
              Agents.
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
              Build AI Agents <br className="hidden sm:block" /> without code.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Design sophisticated conversational flows, connect APIs, and
              deploy intelligent chatbots in minutes. The power of LLMs,
              visualized.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base rounded-full shadow-lg shadow-slate-200"
                >
                  Start Building Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base rounded-full"
              >
                View Documentation
              </Button>
            </div>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            <div className="rounded-2xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:rounded-3xl lg:p-4">
              <div className="rounded-xl bg-white shadow-2xl ring-1 ring-slate-900/10 overflow-hidden">
                <img
                  src="../assets/ai-agent.jpg"
                  alt="Dashboard Preview"
                  className="w-full h-auto opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
              </div>
            </div>
            {/* Floating Elements */}
            <div
              className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl hidden md:block animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-sm">Workflow Active</p>
                  <p className="text-xs text-slate-500">98% Success Rate</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Everything you need to scale
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              From simple auto-responders to complex multi-step agents that
              integrate with your database.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="Visual Workflow Builder"
              description="Drag and drop nodes to create complex logic. Connect triggers, conditions, and AI actions effortlessly."
            />
            <FeatureCard
              icon={MessageCircle}
              title="Advanced Chatbots"
              description="Deploy bots trained on your data. Customize persona, tone, and response style with ease."
            />
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="SOC2 compliant infrastructure. Role-based access control and encrypted data storage."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What Our Users Say
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Join thousands of professionals who have transformed their
              workflows with CtrlCheck.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <Card className="p-6 border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    SZ
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Sarah Zhang</p>
                    <p className="text-xs text-slate-500">Product Manager</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                "This platform made building workflows incredibly easy. What
                used to take me days now takes hours. The visual builder is
                intuitive and the AI integration is seamless."
              </p>
            </Card>

            {/* Testimonial Card 2 */}
            <Card className="p-6 border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    MJ
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Marcus Johnson
                    </p>
                    <p className="text-xs text-slate-500">Software Engineer</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                "The AI assistant helped me automate customer support tasks in
                minutes. The learning curve was minimal, and the results
                exceeded our expectations. Highly recommended!"
              </p>
            </Card>

            {/* Testimonial Card 3 */}
            <Card className="p-6 border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                    EC
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Emily Chen</p>
                    <p className="text-xs text-slate-500">Founder & CEO</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                "Very clean UI and powerful features. The integration options
                are extensive. We've been able to connect all our tools
                seamlessly. This is exactly what we were looking for."
              </p>
            </Card>

            {/* Testimonial Card 4 */}
            <Card className="p-6 border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                    AR
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Alex Rodriguez
                    </p>
                    <p className="text-xs text-slate-500">Operations Lead</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                "Reduced our manual workflow processing by 80% in just two
                weeks. The ROI has been incredible. The customer support team is
                responsive and helpful too."
              </p>
            </Card>

            {/* Testimonial Card 5 */}
            <Card className="p-6 border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                    KP
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Kayla Patterson
                    </p>
                    <p className="text-xs text-slate-500">Data Analyst</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                "The automation capabilities are outstanding. We've streamlined
                our entire data pipeline. The documentation is clear and the API
                is well-designed."
              </p>
            </Card>

            {/* Testimonial Card 6 */}
            <Card className="p-6 border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    NM
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Naveen Mehta</p>
                    <p className="text-xs text-slate-500">Tech Lead</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                "Exceptional product with exceptional support. The no-code
                interface doesn't sacrifice power. We've deployed 5 major
                workflows already."
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Join 5,000+ companies automating their workflows with CtrlCheck
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="rounded-full">
                Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {["Starter", "Pro", "Agency"].map((plan, i) => (
              <Card
                key={plan}
                className={`p-8 flex flex-col ${
                  i === 1
                    ? "border-slate-900 shadow-xl scale-105"
                    : "border-slate-200"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{plan}</h3>
                <div className="text-4xl font-bold mb-6">
                  {i === 0 ? "$0" : i === 1 ? "$29" : "$99"}{" "}
                  <span className="text-base font-normal text-slate-500">
                    /mo
                  </span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[1, 2, 3, 4].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <span>Feature requirement {feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={i === 1 ? "default" : "outline"}
                  className="w-full"
                >
                  Choose {plan}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <span className="text-white font-bold text-lg">CtrlCheck</span>
            <p className="mt-4 text-sm">
              Building the future of automated work.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>Features</li>
              <li>Integrations</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
