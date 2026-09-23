import { NavLink } from 'react-router-dom'

function Sidebar() {
  const links = [
    {
      to: '/',
      label: 'Dashboard',
      icon: '🏠',
    },
    {
      to: '/alimentacao',
      label: 'Alimentação',
      icon: '🍽️',
    },
    {
      to: '/agua',
      label: 'Água',
      icon: '💧',
    },
    {
      to: '/treino',
      label: 'Treino',
      icon: '🏋️',
    },
    {
      to: '/evolucao',
      label: 'Evolução',
      icon: '📈',
    },
  ]

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight">
          EVOLUT
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Sua rotina. Sua evolução.
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

    </aside>
  )
}

export default Sidebar