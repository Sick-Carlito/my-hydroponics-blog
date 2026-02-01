// ============================================
// FILE: app/page.tsx
// Test homepage to verify Phase 3 components
// ============================================

import { Container, Section, Button, Card, Badge } from '@/components/ui/Index';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Section variant="ocean" padding="xl">
        <Container>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Grow Smarter with Hydroponics
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Your complete guide to soilless gardening. Learn to grow fresh produce faster, cleaner, and year-round.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Start Learning
              </Button>
              <Button size="lg" variant="outline">
                Popular Guides
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Test Components Section */}
      <Section variant="light" padding="lg">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Phase 3 Components Test
          </h2>

          {/* Buttons */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="ocean">Ocean</Badge>
              <Badge variant="cyan">Cyan</Badge>
              <Badge variant="green">Green</Badge>
              <Badge variant="blue">Blue</Badge>
              <Badge variant="purple">Purple</Badge>
              <Badge variant="orange">Orange</Badge>
              <Badge variant="pink">Pink</Badge>
            </div>
          </div>

          {/* Cards */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hover>
                <div className="h-32 bg-gradient-to-br from-ocean-400 to-cyan-500 rounded-lg mb-4"></div>
                <Badge variant="ocean" className="mb-2">Beginner Guide</Badge>
                <h4 className="text-lg font-bold mb-2">Card Title</h4>
                <p className="text-gray-600 text-sm">This is a test card with hover effect.</p>
              </Card>
              <Card variant="bordered" hover>
                <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-4"></div>
                <Badge variant="purple" className="mb-2">Systems</Badge>
                <h4 className="text-lg font-bold mb-2">Bordered Card</h4>
                <p className="text-gray-600 text-sm">Card with border variant.</p>
              </Card>
              <Card variant="elevated" hover>
                <div className="h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4"></div>
                <Badge variant="green" className="mb-2">Tips</Badge>
                <h4 className="text-lg font-bold mb-2">Elevated Card</h4>
                <p className="text-gray-600 text-sm">Card with elevated shadow.</p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="ocean" padding="lg">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Growing?
            </h2>
            <p className="text-xl text-ocean-50 mb-8 max-w-2xl mx-auto">
              Join thousands of hydroponic gardeners and start your journey today!
            </p>
            <Button size="lg" variant="primary">
              Get Started Now
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}