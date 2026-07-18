import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';

const monthlyData = [
  { name: 'Jan', users: 0, credits: 0 },
  { name: 'Feb', users: 0, credits: 0 },
  { name: 'Mar', users: 0, credits: 0 },
  { name: 'Apr', users: 0, credits: 0 },
  { name: 'May', users: 0, credits: 0 },
  { name: 'Jun', users: 0, credits: 0 },
  { name: 'Jul', users: 0, credits: 0 },
  { name: 'Aug', users: 0, credits: 0 },
  { name: 'Sep', users: 0, credits: 0 },
  { name: 'Oct', users: 0, credits: 0 },
  { name: 'Nov', users: 0, credits: 0 },
  { name: 'Dec', users: 0, credits: 0 },
];

const usageData = [
  { name: 'AI Chat', value: 0 },
  { name: 'API Calls', value: 0 },
  { name: 'Other', value: 0 },
];

const COLORS = ['#d4a522', '#e8b92e', '#b8901a'];

const customTooltipStyle = {
  backgroundColor: 'var(--theme-surface)',
  border: '1px solid var(--theme-border)',
  borderRadius: '12px',
  padding: '8px 12px',
};

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
          Analytics
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          Track platform usage and growth metrics
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
          <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
            User Growth
          </h2>
          <p className="text-xs mb-6" style={{ color: 'var(--theme-text-muted)' }}>
            Monthly new user sign-ups
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,165,34,0.08)" />
                <XAxis dataKey="name" stroke="var(--theme-text-muted)" fontSize={11} />
                <YAxis stroke="var(--theme-text-muted)" fontSize={11} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="users" fill="#d4a522" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Credits Usage */}
        <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
          <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
            AI Credits Usage
          </h2>
          <p className="text-xs mb-6" style={{ color: 'var(--theme-text-muted)' }}>
            Monthly credit consumption trend
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,165,34,0.08)" />
                <XAxis dataKey="name" stroke="var(--theme-text-muted)" fontSize={11} />
                <YAxis stroke="var(--theme-text-muted)" fontSize={11} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="credits"
                  stroke="#d4a522"
                  strokeWidth={2}
                  dot={{ fill: '#d4a522', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage Distribution */}
        <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
          <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
            Usage Distribution
          </h2>
          <p className="text-xs mb-6" style={{ color: 'var(--theme-text-muted)' }}>
            How users are utilizing the platform
          </p>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            {usageData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue */}
        <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
          <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
            Revenue Overview
          </h2>
          <p className="text-xs mb-6" style={{ color: 'var(--theme-text-muted)' }}>
            Monthly recurring revenue (MRR)
          </p>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-5xl font-bold" style={{ color: 'var(--color-primary)' }}>
                $0
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--theme-text-muted)' }}>
                Connect Stripe to start tracking revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-surface rounded-2xl p-5 golden-border text-center">
          <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>0</p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>Total Users</p>
        </div>
        <div className="card-surface rounded-2xl p-5 golden-border text-center">
          <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>0</p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>Active Sessions</p>
        </div>
        <div className="card-surface rounded-2xl p-5 golden-border text-center">
          <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>0</p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>API Calls Today</p>
        </div>
      </div>
    </div>
  );
}
