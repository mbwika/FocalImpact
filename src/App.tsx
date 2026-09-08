import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { toast } from "sonner";
import {
  Menu,
  X,
  Target,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Lightbulb,
  Globe,
  Building2,
  Briefcase,
  GraduationCap
} from "lucide-react";

// Lazy loading hook
function useLazyLoad() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Services data with detailed information (merged to 15 services)
const services = [
  {
    id: 1,
    title: "Program Design & Implementation",
    icon: Target,
    description: "Strategic program development and execution for maximum impact",
    details: "We specialize in designing and delivering customized programs that strengthen local systems, \n\nenhance organizational capacity, and drive lasting impact. Our solutions are tailored to meet the unique needs of communities, institutions, and stakeholders, combining innovation, inclusivity, and sustainability."
  },
  {
    id: 2,
    title: "Market Systems Development (MSD)",
    icon: TrendingUp,
    description: "Building sustainable and inclusive market ecosystems",
    details: "Our MSD approach focuses on addressing systemic constraints that limit market efficiency and inclusivity. We work with stakeholders to identify leverage points, facilitate market actor engagement, and catalyze sustainable market changes that benefit the poor and marginalized. Our interventions are designed to be systemic, scalable, and sustainable beyond project timelines."
  },
  {
    id: 3,
    title: "Value Chain Strengthening",
    icon: BarChart3,
    description: "Optimizing supply chains for enhanced competitiveness",
    details: "We analyze and strengthen value chains to improve productivity, efficiency, and market access. Our services include value chain mapping, competitiveness analysis, linkage facilitation, and capacity building for value chain actors. We help identify bottlenecks, upgrade opportunities, and strategies for inclusive growth that benefits all chain participants."
  },
  {
    id: 4,
    title: "Business Development Services for MSMEs & Cooperatives",
    icon: Users,
    description: "Empowering MSMEs & Cooperatives for growth",
    details: "We provide tailored business development services to micro, small, and medium enterprises and cooperatives. Our offerings include business planning, financial management training, market linkage facilitation, organizational development, and access to finance support. We help these organizations build sustainable business models and achieve long-term viability."
  },
  {
    id: 5,
    title: "Financial Literacy",
    icon: Award,
    description: "Building financial capability and inclusion",
    details: "Our financial literacy programs equip individuals and organizations with essential money management skills. We cover budgeting, saving, investing, credit management, and financial planning. Our training is contextual, practical, and designed to promote informed financial decision-making and improved economic outcomes for participants."
  },
  {
    id: 6,
    title: "ESG & Sustainability Integration",
    icon: Globe,
    description: "Embedding sustainable practices in business operations",
    details: "We help organizations integrate Environmental, Social, and Governance (ESG) principles into their strategies and operations. Our services include ESG assessments, sustainability strategy development, reporting frameworks, stakeholder engagement, and impact measurement. We support businesses in creating value while contributing to sustainable development goals."
  },
  {
    id: 7,
    title: "Digital Transformation & AgTech",
    icon: Lightbulb,
    description: "Leveraging technology for agricultural innovation",
    details: "We drive digital transformation in agriculture through innovative AgTech solutions. Our services include digital strategy development, technology adoption facilitation, AgTech platform design, and farmer digital literacy training. We help agricultural value chain actors leverage digital tools for improved productivity, market access, and decision-making."
  },
  {
    id: 8,
    title: "Policy & Strategy Advisory",
    icon: ShieldCheck,
    description: "Evidence-based policy development and strategic guidance",
    details: "We provide expert policy analysis and strategic advisory services to governments, development partners, and private sector organizations. Our work includes policy research, stakeholder consultations, policy brief development, and implementation planning. We ensure recommendations are evidence-based, contextually appropriate, and aligned with best practices."
  },
  {
    id: 9,
    title: "Capacity Building & Training",
    icon: GraduationCap,
    description: "Developing skills and competencies for excellence",
    details: "Our capacity building programs are designed to enhance individual and organizational capabilities. We offer customized training in technical skills, leadership development, project management, and specialized domains. Our approach combines classroom learning, practical exercises, and ongoing mentorship to ensure sustainable skill development and application."
  },
  {
    id: 10,
    title: "Coaching and Mentorship",
    icon: Users,
    description: "Personalized guidance for professional growth",
    details: "We provide one-on-one and group coaching services for leaders, entrepreneurs, and professionals. Our coaching focuses on goal setting, performance improvement, leadership development, and career advancement. Our experienced mentors offer personalized guidance, accountability, and support to help individuals achieve their full potential."
  },
  {
    id: 11,
    title: "Monitoring, Evaluation, Accountability, Learning (MEAL)",
    icon: BarChart3,
    description: "Evidence-based program monitoring and evaluation",
    details: "Our MEAL services ensure programs deliver intended results and generate learning for continuous improvement. We design M&E frameworks, develop data collection tools, conduct baseline and endline surveys, perform impact evaluations, and facilitate learning events. We use mixed-methods approaches to generate actionable insights that inform adaptive management."
  },
  {
    id: 12,
    title: "Cybersecurity",
    icon: ShieldCheck,
    description: "Protecting digital assets and infrastructure",
    details: "We provide comprehensive cybersecurity solutions to protect organizations from digital threats. Our services include security assessments, vulnerability testing, security policy development, incident response planning, and staff training. We help organizations build robust security postures that protect sensitive data and maintain business continuity."
  },
  {
    id: 13,
    title: "AI & Machine Learning Analytics",
    icon: Lightbulb,
    description: "Intelligent solutions and data-driven insights",
    details: "We combine artificial intelligence, machine learning, and advanced analytics to solve complex business challenges. Our services include predictive analytics, data visualization, business intelligence solutions, AI model development, and data strategy consulting. We transform raw data into actionable insights that drive informed decision-making and competitive advantage."
  },
  {
    id: 14,
    title: "Software Development",
    icon: Target,
    description: "Custom software solutions for your needs",
    details: "We design and develop custom software applications tailored to your specific business requirements. Our expertise spans web applications, mobile apps, enterprise systems, and API integrations. We follow agile methodologies, ensuring iterative development, continuous feedback, and solutions that truly meet user needs and business objectives."
  },
  {
    id: 15,
    title: "IT Consulting & Cloud Transformation",
    icon: Globe,
    description: "Expert IT guidance and seamless cloud migration",
    details: "We provide strategic IT consulting and cloud transformation services to modernize your technology infrastructure. Our offerings include IT strategy development, technology assessments, cloud migration planning and execution, cloud optimization, and digital transformation roadmaps. We help organizations leverage cloud technologies to improve agility, reduce costs, and drive innovation."
  }
];

// Case studies data
const caseStudies = [
  {
    id: 1,
    title: "Agricultural Value Chain Transformation",
    client: "Regional Development Agency",
    category: "Market Systems Development",
    image: "https://images.unsplash.com/photo-1569227997603-33b9f12af927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MjA2MjI2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Implemented market systems approach to increase smallholder farmer incomes by 45% through improved market linkages and value addition.",
    results: ["45% income increase", "2,500+ farmers reached", "15 new market partnerships"]
  },
  {
    id: 2,
    title: "Digital Financial Services Platform",
    client: "National Microfinance Institution",
    category: "Digital Transformation",
    image: "https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzYyMDk4MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Designed and deployed a mobile-first digital lending platform, increasing financial inclusion and reducing processing time by 70%.",
    results: ["70% faster processing", "50,000+ active users", "95% customer satisfaction"]
  },
  {
    id: 3,
    title: "Cooperative Capacity Strengthening Program",
    client: "International Development Partner",
    category: "Capacity Building",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NjIwNDc4NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Comprehensive training program for 80 cooperatives, improving governance, financial management, and business operations.",
    results: ["80 cooperatives trained", "90% governance improvement", "35% revenue growth"]
  },
  {
    id: 4,
    title: "Cloud Migration & Infrastructure Modernization",
    client: "Regional Healthcare Provider",
    category: "Cloud Transformation",
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjIwMjc0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Successfully migrated legacy systems to cloud infrastructure, improving reliability and reducing IT costs by 40%.",
    results: ["40% cost reduction", "99.9% uptime achieved", "Enhanced data security"]
  },
  {
    id: 5,
    title: "Impact Evaluation Framework",
    client: "Youth Empowerment Initiative",
    category: "MEAL Services",
    image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2MjA2MTA2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Designed comprehensive M&E framework and conducted impact evaluation demonstrating 65% improvement in youth employability.",
    results: ["65% employability increase", "5-year impact tracked", "Evidence-based insights"]
  },
  {
    id: 6,
    title: "ESG Integration Strategy",
    client: "Manufacturing Conglomerate",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1759884247134-89b8fc25f726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzYyMTIzMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Developed and implemented comprehensive ESG strategy, achieving industry-leading sustainability ratings and certifications.",
    results: ["Top ESG ratings", "30% carbon reduction", "Enhanced investor confidence"]
  }
];

// Rotating hero text
const heroTexts = [
  "Driving Impact Through Innovation",
  "Building Sustainable Solutions",
  "Empowering Growth & Development",
  "Transforming Ideas Into Reality"
];

// Stats data
const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "15+", label: "Years Experience" },
  { value: "100+", label: "Global Clients" },
  { value: "98%", label: "Client Satisfaction" }
];

// Smooth scroll function
const smoothScroll = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    const offset = 80; // Account for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHeroText, setCurrentHeroText] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rotate hero text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScroll(targetId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <a href="https://www.focalimpact.co.ke/" aria-label="Focal Impact Limited home">
                <img
                  src="/logo.png"
                  alt="Focal Impact Limited"
                  className="h-12 w-auto"
                />
              </a>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "home")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, "services")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Services
              </a>
              <a
                href="#case-studies"
                onClick={(e) => handleNavClick(e, "case-studies")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Case Studies
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "about")}
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
              <Button onClick={() => smoothScroll("contact")}>Get Started</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-6 space-y-4">
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, "home")}
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  Home
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, "services")}
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  Services
                </a>
                <a
                  href="#case-studies"
                  onClick={(e) => handleNavClick(e, "case-studies")}
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  Case Studies
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, "about")}
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
                <Button className="w-full" onClick={() => smoothScroll("contact")}>Get Started</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/header-image.jpg"
            // src="https://images.unsplash.com/photo-1637855195094-992d3d578f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRpbmclMjB0ZWFtfGVufDF8fHx8MTc2MjA3MzAzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Handshake representing partnership"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/90 via-foreground/70 to-purple-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentHeroText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="block"
                >
                  {heroTexts[currentHeroText]}
                </motion.span>
              </AnimatePresence>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10"
            >
              Focal Impact Limited delivers transformative solutions across development,
              technology, and business strategy to create lasting positive change.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                variant="secondary"
                className="group"
                onClick={() => smoothScroll("services")}
              >
                Explore Services
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={() => smoothScroll("contact")}
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <ServicesSection onServiceClick={setSelectedService} />

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              {selectedService && (
                <>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <selectedService.icon className="text-primary" size={24} />
                  </div>
                  {selectedService.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              {selectedService?.details}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <h4 className="mb-3 text-foreground">Key Benefits:</h4>
            <ul className="space-y-2">
              {selectedService && [
                "Evidence-based approach with proven results",
                "Customized solutions tailored to your context",
                "Expert team with extensive field experience",
                "Sustainable impact beyond project timeline",
                "Ongoing support and capacity building"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={18} />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full mt-6"
              onClick={() => {
                setSelectedService(null);
                smoothScroll("contact");
              }}
            >
              Get Started with This Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* About Section */}
      <AboutSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Stats Section Component
function StatsSection() {
  const { ref, isVisible } = useLazyLoad();

  return (
    <section ref={ref} className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl text-primary mb-2">{stat.value}</div>
              <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section Component
function ServicesSection({ onServiceClick }: { onServiceClick: (service: typeof services[0]) => void }) {
  const { ref, isVisible } = useLazyLoad();

  return (
    <section id="services" ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions tailored to drive your organization's success
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50 hover:border-primary/50 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <h3 className="text-lg mb-2 text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <button
                      onClick={() => onServiceClick(service)}
                      className="text-primary hover:text-primary/80 text-sm flex items-center gap-1 group/btn"
                    >
                      Learn more
                      <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={16} />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Case Studies Section Component
function CaseStudiesSection() {
  const { ref, isVisible } = useLazyLoad();

  return (
    <section id="case-studies" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">Case Studies</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of successful projects and transformative outcomes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  {isVisible && (
                    <ImageWithFallback
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                      {study.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Building2 size={16} />
                    <span>{study.client}</span>
                  </div>
                  <h3 className="text-xl text-foreground mb-3">{study.title}</h3>
                  <p className="text-muted-foreground mb-4">{study.description}</p>
                  <div className="space-y-2">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="text-primary flex-shrink-0" size={16} />
                        <span className="text-muted-foreground">{result}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  const { ref, isVisible } = useLazyLoad();

  return (
    <section id="about" ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">About Focal Impact</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Focal Impact Limited is a dynamic firm founded and registered in Nairobi, Kenya, specializing in development consulting,
              technology solutions, and strategic business advisory. We partner with organizations
              to create sustainable impact through evidence-based approaches and innovative solutions.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our multidisciplinary team combines expertise in program management, market systems
              development, digital transformation, and cutting-edge technology to deliver
              comprehensive solutions that drive meaningful change.
            </p>
            <div className="space-y-3">
              {[
                "Client-Centric Approach",
                "Evidence-Based Solutions",
                "Sustainable Impact Focus",
                "Innovation & Technology"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
            {/* <p className="text-lg text-muted-foreground mb-6">
              We combine global best practices with deep local expertise to deliver solutions that work in the real world. Our commitment to excellence, integrity, and collaboration drives us to exceed client expectations and create lasting value.
            </p> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {isVisible && (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NjIwNDc4NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section Component
function WhyChooseUsSection() {
  const { ref, isVisible } = useLazyLoad();

  const features = [
    {
      icon: Target,
      title: "Strategic Expertise",
      description: "Deep industry knowledge and proven methodologies"
    },
    {
      icon: Users,
      title: "Collaborative Partnership",
      description: "Working alongside you to achieve shared goals"
    },
    {
      icon: Lightbulb,
      title: "Innovation-Driven",
      description: "Leveraging cutting-edge technology and approaches"
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "International experience with local understanding"
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary/5 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Partner with a team committed to your success
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection() {
  const { ref, isVisible } = useLazyLoad();

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {isVisible && (
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyb3d0aHxlbnwxfHx8fDE3NjIxMDUwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Business growth"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-purple-900/95" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Ready to Transform Your Impact?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let's discuss how Focal Impact can help you achieve your strategic objectives
            and create lasting positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="group"
              onClick={() => {
              window.open("https://calendly.com/cmm230004-utdallas/30min", "_blank", "noopener,noreferrer");
              }}
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              onClick={() => smoothScroll("about")}
            >
              Learn More
            </Button> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  const { ref, isVisible } = useLazyLoad();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    toast.success("Thank you! We'll get back to you soon.");
    reset();
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you. Reach out to discuss your project or partnership opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Email", content: "info@focalimpact.co.ke" },
                  { icon: Phone, title: "Phone", content: "+254 738 617 617" },
                  { icon: MapPin, title: "Location", content: "Nairobi, Kenya" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <div>
                        <h4 className="text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.content}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-foreground mb-4">Let's Engage</h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://wa.me/254738617617"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <MessageCircle size={24} />
                </a>

                <a
                  href="https://www.linkedin.com/company/focal-impact-limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Linkedin size={24} />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Twitter size={24} />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Facebook size={24} />
                </a>
              </div>

            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message as string}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message as string}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="+254 700 000 000"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      {...register("organization")}
                      placeholder="Your Organization"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message", { required: "Message is required" })}
                      placeholder="Tell us about your project or inquiry..."
                      className="mt-2 min-h-[120px]"
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message as string}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <a href="https://www.focalimpact.co.ke/" aria-label="Focal Impact Limited home">
                <img
                  src="/logo-white.png"
                  alt="Focal Impact Limited"
                  className="h-7 w-auto"
                />
              </a>
            </div>
            <p className="text-white/70 text-sm">
              Transforming organizations through strategic consulting and innovative solutions.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#services" onClick={(e) => { e.preventDefault(); smoothScroll("services"); }} className="hover:text-primary transition-colors">Program Design</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); smoothScroll("services"); }} className="hover:text-primary transition-colors">Digital Transformation</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); smoothScroll("services"); }} className="hover:text-primary transition-colors">Data Analytics</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); smoothScroll("services"); }} className="hover:text-primary transition-colors">MEAL Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); smoothScroll("about"); }} className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#case-studies" onClick={(e) => { e.preventDefault(); smoothScroll("case-studies"); }} className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); smoothScroll("services"); }} className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); smoothScroll("contact"); }} className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                  href="https://wa.me/254738617617"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <MessageCircle size={20} />
                </a>

                <a
                  href="https://www.linkedin.com/company/focal-impact-limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Linkedin size={20} />
                </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Focal Impact Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
