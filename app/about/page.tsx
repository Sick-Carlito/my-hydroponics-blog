// ============================================
// FILE: app/about/page.tsx
// About page
// ============================================

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Newsletter } from '@/components/blog/Newsletter';
import { siteConfig } from '@/data/siteConfig';
import Link from 'next/link';

export const metadata = {
  title: 'About - HydroGrow',
  description: 'Learn about our mission to help people grow their own fresh food using hydroponic gardening techniques.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <Section variant="ocean" padding="lg">
        <Container>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About HydroGrow
            </h1>
            <p className="text-xl md:text-2xl text-ocean-50 max-w-3xl mx-auto">
              Empowering people to grow fresh, healthy food at home
            </p>
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section variant="light" padding="lg">
        <Container size="md">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At HydroGrow, we believe everyone should have access to fresh, nutritious food - 
              regardless of where they live or how much space they have. Our mission is to make 
              hydroponic gardening accessible, affordable, and achievable for everyone.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Whether you're a complete beginner curious about growing your first lettuce plant, 
              or an experienced gardener looking to optimize your hydroponic system, we're here 
              to help you succeed.
            </p>
          </div>
        </Container>
      </Section>

      {/* Why Hydroponics Section */}
      <Section variant="default" padding="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why We're Passionate About Hydroponics
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hydroponics isn't just a growing method - it's a solution to modern challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Reason 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Sustainability</h3>
              <p className="text-gray-600">
                Hydroponics uses 90% less water than traditional farming and requires no pesticides. 
                It's one of the most sustainable ways to grow food.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Urban Solution</h3>
              <p className="text-gray-600">
                Perfect for apartments and small spaces. You don't need a backyard to grow 
                your own food anymore.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Food Security</h3>
              <p className="text-gray-600">
                Grow fresh produce year-round, regardless of weather or season. Take control 
                of your food supply.
              </p>
            </div>

            {/* Reason 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Educational</h3>
              <p className="text-gray-600">
                Perfect for teaching kids about plant biology, sustainability, and where 
                food comes from.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* What We Offer Section */}
      <Section variant="light" padding="lg">
        <Container size="md">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">What We Offer</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-ocean-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Beginner-Friendly Guides</h3>
                <p className="text-gray-600">
                  Step-by-step tutorials that assume no prior knowledge. We break down complex 
                  concepts into easy-to-understand lessons.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-ocean-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">System Reviews</h3>
                <p className="text-gray-600">
                  Honest reviews of hydroponic systems, from budget DIY setups to premium 
                  commercial solutions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-ocean-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Troubleshooting Help</h3>
                <p className="text-gray-600">
                  Problem-solving guides to help you diagnose and fix common issues before 
                  they become major problems.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-ocean-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Plant Care Tips</h3>
                <p className="text-gray-600">
                  Specific growing guides for popular crops like lettuce, tomatoes, herbs, 
                  and more.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Commitment Section */}
      <Section variant="default" padding="lg">
        <Container size="md">
          <div className="bg-gradient-to-br from-ocean-50 to-cyan-50 p-8 md:p-12 rounded-2xl border-2 border-ocean-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Commitment to You</h2>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                <strong className="text-ocean-700">Always Free:</strong> All our content is and 
                will always be free. We believe knowledge about growing food should be accessible 
                to everyone.
              </p>
              <p>
                <strong className="text-ocean-700">No BS:</strong> We only recommend products and 
                techniques we've tested ourselves. No sponsored fluff.
              </p>
              <p>
                <strong className="text-ocean-700">Beginner-Focused:</strong> We remember what it's 
                like to be a complete beginner. Our guides assume zero prior knowledge.
              </p>
              <p>
                <strong className="text-ocean-700">Community-Driven:</strong> Your questions and 
                feedback shape our content. We write about what you want to learn.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="ocean" padding="lg">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Hydroponic Journey?
            </h2>
            <p className="text-xl text-ocean-50 mb-8 max-w-2xl mx-auto">
              Join our community and get weekly tips, guides, and inspiration
            </p>
            <Link href="/blog">
              <Button size="lg" variant="primary" className="bg-white text-ocean-600 hover:bg-ocean-50">
                Explore Our Guides
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section variant="light" padding="lg">
        <Container>
          <Newsletter />
        </Container>
      </Section>
    </div>
  );
}