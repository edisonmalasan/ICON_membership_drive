import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [members, setMembers] = useState([])
  const [allMembers, setAllMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showRefreshIndicator, setShowRefreshIndicator] = useState(false)
  const lastMemberCount = useRef(0)

  // Load members on component mount and set up auto-refresh
  useEffect(() => {
    loadMembers()
    const interval = setInterval(autoRefresh, 30000)
    return () => clearInterval(interval)
  }, [])

  // Filter members when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setMembers(allMembers)
    } else {
      const filtered = allMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.year.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setMembers(filtered)
    }
  }, [searchTerm, allMembers])

  const loadMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/members')
      const data = await response.json()
      
      setAllMembers(data)
      setMembers(data)
      
      // Check for new members
      if (lastMemberCount.current > 0 && data.length > lastMemberCount.current) {
        setShowRefreshIndicator(true)
        setTimeout(() => setShowRefreshIndicator(false), 3000)
      }
      lastMemberCount.current = data.length
      
    } catch (error) {
      console.error('Error loading members:', error)
    } finally {
      setLoading(false)
    }
  }

  const autoRefresh = async () => {
    try {
      const response = await fetch('/api/count')
      const data = await response.json()
      
      if (data.count > lastMemberCount.current) {
        loadMembers()
      }
    } catch (error) {
      console.log('Auto-refresh failed:', error)
    }
  }

  const exportCSV = async () => {
    try {
      const response = await fetch('/api/export/csv')
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'members.csv'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error exporting CSV:', error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStats = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)

    const todayMembers = allMembers.filter(member =>
      new Date(member.joinedAt) >= today
    ).length

    const thisWeekMembers = allMembers.filter(member =>
      new Date(member.joinedAt) >= weekAgo
    ).length

    return {
      total: allMembers.length,
      today: todayMembers,
      thisWeek: thisWeekMembers
    }
  }

  const stats = getStats()

  return (
    <>
      {/* Refresh Indicator */}
      <div className={`fixed top-5 right-5 bg-green-500 bg-opacity-90 text-white px-5 py-2.5 rounded-full font-semibold refresh-indicator ${showRefreshIndicator ? 'show' : ''}`}>
        ✨ New member joined!
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto p-5">
        {/* Header */}
        <div className="glass-effect rounded-2xl p-8 text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">👑 Admin Dashboard</h1>
          <p className="text-slate-300">Manage your organization's membership</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="glass-effect rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="text-5xl font-bold stat-gradient">{stats.total}</div>
            <div className="mt-2 opacity-80 text-lg">Total Members</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="text-5xl font-bold stat-gradient">{stats.today}</div>
            <div className="mt-2 opacity-80 text-lg">Joined Today</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="text-5xl font-bold stat-gradient">{stats.thisWeek}</div>
            <div className="mt-2 opacity-80 text-lg">This Week</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
          <input
            type="text"
            className="flex-1 min-w-64 px-5 py-3 glass-input rounded-xl text-white text-base outline-none placeholder:text-slate-400"
            placeholder="Search members by name, email, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-4">
            <button 
              className="btn-primary text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center gap-2"
              onClick={loadMembers}
            >
              🔄 Refresh
            </button>
            <button 
              className="btn-secondary text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center gap-2"
              onClick={exportCSV}
            >
              📊 Export CSV
            </button>
          </div>
        </div>

        {/* Members Table */}
        <div className="glass-effect rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="glass-effect">
                  <th className="px-5 py-4 text-left font-semibold uppercase tracking-wide text-sm border-b border-white border-opacity-10">Name</th>
                  <th className="px-5 py-4 text-left font-semibold uppercase tracking-wide text-sm border-b border-white border-opacity-10">Year</th>
                  <th className="px-5 py-4 text-left font-semibold uppercase tracking-wide text-sm border-b border-white border-opacity-10">Course</th>
                  <th className="px-5 py-4 text-left font-semibold uppercase tracking-wide text-sm border-b border-white border-opacity-10">Email</th>
                  <th className="px-5 py-4 text-left font-semibold uppercase tracking-wide text-sm border-b border-white border-opacity-10">Joined</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-xl">
                      <div className="inline-block w-10 h-10 border-3 border-white border-opacity-30 rounded-full border-t-indigo-500 animate-spin mr-4"></div>
                      Loading members...
                    </td>
                  </tr>
                ) : members.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 opacity-70">
                      {searchTerm
                        ? `🔍 No members found matching "${searchTerm}"`
                        : '🎓 No members yet. Share the registration link to get started!'
                      }
                    </td>
                  </tr>
                ) : (
                  members.map((member, index) => (
                    <tr key={index} className="hover:bg-white hover:bg-opacity-5 border-b border-white border-opacity-10">
                      <td className="px-5 py-4">
                        <strong className="text-white">{member.name}</strong>
                      </td>
                      <td className="px-5 py-4">
                        <span className="year-badge text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {member.year}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-300">{member.course}</td>
                      <td className="px-5 py-4 text-sky-300">{member.email}</td>
                      <td className="px-5 py-4 text-pink-300 text-sm">{formatDate(member.joinedAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)