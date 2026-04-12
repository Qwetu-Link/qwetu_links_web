import DummySidebar from '@/components/sidebar/DummySidebar'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-72 border-r bg-background">
        {/* sidebar items */}
        <DummySidebar/>
      </aside>

      <main className="flex-1 p-6">
        {/* dashboard pages */}
        
      </main>
    </div>
  )
}