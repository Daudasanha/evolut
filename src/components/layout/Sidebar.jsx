import { NavLink } from 'react-router-dom'

function Sidebar() {
  const links = [
    {
      to: '/',
      label: 'Dashboard',
      mobileLabel: 'Início',
      sigla: 'D',
    },
    {
      to: '/alimentacao',
      label: 'Alimentação',
      mobileLabel: 'Aliment.',
      sigla: 'A',
    },
    {
      to: '/agua',
      label: 'Água',
      mobileLabel: 'Água',
      sigla: 'H',
    },
    {
      to: '/treino',
      label: 'Treino',
      mobileLabel: 'Treino',
      sigla: 'T',
    },
    {
      to: '/evolucao',
      label: 'Evolução',
      mobileLabel: 'Evolução',
      sigla: 'E',
    },
  ]

  return (
    <aside className="border-b border-slate-800 bg-slate-900 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-6">
      <div className="px-5 pb-4 pt-5 lg:mb-10 lg:p-0">
        <h1 className="text-2xl font-bold tracking-tight">
          EVOLUT
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Sua rotina. Sua evolução.
        </p>
      </div>

      <nav className="grid grid-cols-5 border-t border-slate-800 lg:block lg:space-y-2 lg:border-t-0">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-3 text-xs transition lg:flex-row lg:justify-start lg:gap-3 lg:rounded-lg lg:px-4 lg:py-3 lg:text-sm ${
                isActive
                  ? 'bg-slate-800 font-medium text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-slate-400">
              {link.sigla}
            </span>

            <span className="max-w-full truncate lg:hidden">
              {link.mobileLabel}
            </span>

            <span className="hidden lg:inline">
              {link.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
