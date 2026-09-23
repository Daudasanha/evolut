import { useEffect, useState } from 'react'

import { obterDataLocal } from '../../lib/data'

const META_AGUA = 3000
const DOSE_AGUA = 250

function Agua() {
  const hoje = obterDataLocal()
  const chaveStorage = `evolut-agua-${hoje}`

  const [consumo, setConsumo] = useState(() => {
    const salvo = localStorage.getItem(chaveStorage)

    if (!salvo) {
      return 0
    }

    const valor = Number(salvo)

    return Number.isNaN(valor) ? 0 : valor
  })

  useEffect(() => {
    localStorage.setItem(chaveStorage, String(consumo))
  }, [consumo, chaveStorage])

  const progresso = Math.min(
    Math.round((consumo / META_AGUA) * 100),
    100
  )

  function adicionarAgua() {
    setConsumo((atual) => atual + DOSE_AGUA)
  }

  function removerAgua() {
    setConsumo((atual) => Math.max(0, atual - DOSE_AGUA))
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">
          Água
        </h1>

        <p className="mt-2 text-slate-400">
          Acompanhe sua hidratação durante o dia.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Consumo de hoje
            </p>

            <p className="mt-2 text-4xl font-bold">
              {(consumo / 1000).toFixed(2)} L
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Meta: {(META_AGUA / 1000).toFixed(1)} L
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={removerAgua}
              className="cursor-pointer rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
            >
              - 250 ml
            </button>

            <button
              type="button"
              onClick={adicionarAgua}
              className="cursor-pointer rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              + 250 ml
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">
              Progresso
            </span>

            <span className="font-medium">
              {progresso}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-950/40 p-4">
            <p className="text-sm text-slate-500">
              Consumido
            </p>

            <p className="mt-1 text-lg font-semibold">
              {consumo} ml
            </p>
          </div>

          <div className="rounded-xl bg-slate-950/40 p-4">
            <p className="text-sm text-slate-500">
              Restante
            </p>

            <p className="mt-1 text-lg font-semibold">
              {Math.max(META_AGUA - consumo, 0)} ml
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Agua
