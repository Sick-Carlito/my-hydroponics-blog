// ============================================
// FILE: app/blog/[slug]/loading.tsx
// Loading skeleton for individual blog post
// ============================================

export default function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-b from-vegetation-50 via-white to-white pt-32 pb-14 px-5">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex gap-2 mb-8">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>

          {/* Category badge */}
          <div className="h-6 w-32 bg-gray-200 rounded-full mb-6" />

          {/* Title */}
          <div className="space-y-3 mb-6">
            <div className="h-12 bg-gray-200 rounded w-full" />
            <div className="h-12 bg-gray-200 rounded w-4/5" />
          </div>

          {/* Excerpt */}
          <div className="space-y-2 mb-10">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Meta */}
          <div className="flex gap-6 pb-10 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 pt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="flex gap-14">
          {/* Sidebar Skeleton */}
          <aside className="hidden xl:block w-[240px] space-y-5">
            <div className="h-64 bg-gray-200 rounded-2xl" />
            <div className="h-32 bg-gray-200 rounded-2xl" />
            <div className="h-48 bg-gray-200 rounded-2xl" />
          </aside>

          {/* Article Skeleton */}
          <div className="flex-1 max-w-[72ch] space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i}>
                {i % 3 === 0 && <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />}
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}