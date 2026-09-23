import { NavLink } from 'react-router-dom'

function Sidebar() {
  const links = [
    {
      to: '/',
      label: 'Dashboard',
      sigla: 'D',
    },
    {
      to: '/alimentacao',
      label: 'Alimentação',
      sigla: 'A',
    },
    {
      to: '/agua',
      label: 'Água',
      sigla: 'H',
    },
    {
      to: '/treino',
      label: 'Treino',
      sigla: 'T',
    },
    {
      to: '/evolucao',
      label: 'Evolução',
      sigla: 'E',
    },
  ]

  return (
    <aside className="min-h-screen w-64 border-r border-slate-800 bg-slate-900 p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight">
          EVOLUT
        </h1>

        <p className="mt-1 text-xs text-slate-400">
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
                  ? 'bg-slate-800 font-medium text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-slate-400">
              {link.sigla}
            </span>

            <span>
              {link.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
