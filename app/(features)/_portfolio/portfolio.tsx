"use client";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  CreditCard,
  Shield,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      icon: Building2,
      title: "Property Management",
      description:
        "Add properties and units, track occupancy, and assign tenants seamlessly.",
    },
    {
      icon: CreditCard,
      title: "Rent & Payments",
      description:
        "M-Pesa STK Push integration, automated invoices, and real-time payment tracking.",
    },
    {
      icon: Users,
      title: "Tenant Management",
      description:
        "Manage tenant profiles, lease tracking, and built-in communication tools.",
    },
    {
      icon: BarChart3,
      title: "Financial Dashboard",
      description:
        "View revenue analytics, outstanding balances, and generate monthly reports.",
    },
    {
      icon: Bell,
      title: "Notifications",
      description:
        "Automated rent reminders, payment alerts, and lease expiry notifications.",
    },
    {
      icon: Shield,
      title: "Security & Roles",
      description:
        "Multi-tenant architecture with role-based access and secure data separation.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create account & add properties",
      description: "Sign up and add your properties and units.",
    },
    {
      number: "02",
      title: "Add units & tenants",
      description: "Add units and assign tenants with lease details.",
    },
    {
      number: "03",
      title: "Enable payments",
      description: "Activate M-Pesa or Paybill to collect rent easily.",
    },
    {
      number: "04",
      title: "Automate & track",
      description: "Track rent, maintenance, and tenants in one dashboard.",
    },
  ];

  const values = [
    {
      title: "Built for African payments",
      description: "Fully integrated with M-Pesa for seamless rent collection.",
    },
    {
      title: "Multi-tenant SaaS architecture",
      description:
        "Secure, scalable system designed for multiple landlords and properties.",
    },
    {
      title: "Real-time payment tracking",
      description:
        "Monitor rent payments instantly with live updates and alerts.",
    },
    {
      title: "Simple onboarding",
      description:
        "Get started quickly with an easy setup for landlords and agents.",
    },
    {
      title: "Scales with your business",
      description:
        "Works for single properties, portfolios, and enterprise-level management.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter Plan",
      price: "KES 5000",
      period: "per month",
      description: "Perfect for individual landlords",
      features: [
        "Up to 100 units",
        "Tenant management",
        "Payment tracking",
        "Basic reporting",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Basic Plan",
      price: "KES 10,000",
      period: "per month",
      description: "For growing property portfolios",
      features: [
        "Up to 250 units",
        "All Basic features",
        "Maintenance tracking",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
      ],
      popular: true,
    },
    {
      name: "Standard Plan",
      price: "Custom",
      period: "contact sales",
      description: "For large property management companies",
      features: [
        "Unlimited units",
        "All Pro features",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "How does Qwetulink help with rent collection?",
      answer:
        "Qwetulink automates the entire rent collection process. Tenants receive automatic reminders, can pay online through multiple payment methods, and you get instant notifications when payments are received. Late payment tracking and automated follow-ups are included.",
    },
    {
      question: "Can I manage multiple properties?",
      answer:
        "Yes! Qwetulink is designed to handle everything from a single rental unit to large portfolios with hundreds of properties. Our plans scale with your needs, and you can organize properties by location, type, or any custom categories.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-level encryption, regular security audits, and comply with industry standards to keep your data safe. All sensitive information is encrypted both in transit and at rest.",
    },
    {
      question: "Can tenants access the platform?",
      answer:
        "Yes, tenants get their own portal where they can pay rent, submit maintenance requests, access documents, and communicate with you. This reduces your workload and improves tenant satisfaction.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We offer email support for all plans, priority support for Pro users, and dedicated account managers for Enterprise customers. Our help center includes detailed guides, video tutorials, and FAQs.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Smart Property & Rental Management for Africa
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Manage your entire rental business in one place from tenant
                onboarding to rent collection and financial tracking. QwetuLinks
                helps landlords and property managers automate workflows, reduce
                delays, and stay in control of their income.
              </p>
              <div className="flex flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="text-base gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-base">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="p-6">
                <Image
                  src="/images/qwetu_logo.webp"
                  width={1000}
                  height={760}
                  className="hidden md:block"
                  alt="Qwetu Links"
                  loading="eager"
                />
                <Image
                  src="/images/qwetu_logo.webp"
                  width={560}
                  height={620}
                  className="block md:hidden"
                  alt="Qwetu Links"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Manage Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to save you time and help you manage
              properties more efficiently.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-2 hover:border-primary transition-colors"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-md text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in four simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[70%] w-[70%] h-0.5 bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Why QwetuLinks</h2>
            <p className="text-gray-600 mt-2">
              Built for modern property managers in Africa
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item) => (
              <div
                key={item.title}
                className="p-6 border rounded-xl hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular
                    ? "border-2 border-primary shadow-lg scale-105"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-white">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-gray-600">
                        /{plan.period.split(" ")[1]}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.price === "Custom"
                        ? "Contact Sales"
                        : "Get Started"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">Everything you need to know</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-indigo-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Rental Business?
          </h2>
          <p className="text-lg mb-8 text-indigo-100">Join Qwetulink</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-base gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-transparent text-white border-white hover:bg-white/10"
              >
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <footer className="border-t bg-white py-12">
          {/* <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Dashboard</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Email Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>

              <div className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4" />
                support@qwetu.com
              </div>

              <div className="flex gap-3 text-gray-600">
                <Twitter className="w-5 h-5 cursor-pointer hover:text-primary" />
                <Facebook className="w-5 h-5 cursor-pointer hover:text-primary" />
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary" />
              </div>
            </div>
          </div> */}

          {/* Bottom bar */}
          <div className="text-center text-xs text-gray-500 mt-10">
            © {new Date().getFullYear()} QwetuLinks. All rights reserved.
          </div>
        </footer>
      </section>
    </div>
  );
}
