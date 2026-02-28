// ============================================
// FILE: app/blog/loading.tsx
// Loading skeleton for blog page
// ============================================

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function BlogLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <Section variant="ocean" padding="lg">
        <Container>
          <div className="text-center">
            <div className="h-12 bg-white/20 rounded-lg w-64 mx-auto mb-6" />
            <div className="h-6 bg-white/20 rounded-lg w-96 mx-auto" />
          </div>
        </Container>
      </Section>

      {/* Featured Post Skeleton */}
      <Section variant="light" padding="md">
        <Container>
          <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
          <div className="h-80 bg-gray-200 rounded-2xl" />
        </Container>
      </Section>

      {/* Category Filter Skeleton */}
      <Section variant="default" padding="md">
        <Container>
          <div className="flex flex-wrap gap-3 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-32 bg-gray-200 rounded-full" />
            ))}
          </div>
        </Container>
      </Section>

      {/* Posts Grid Skeleton */}
      <Section variant="light" padding="lg">
        <Container>
          <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 bg-gray-200 rounded-2xl" />
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}