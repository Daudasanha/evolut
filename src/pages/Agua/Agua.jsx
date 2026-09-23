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

  const [quantidadePersonalizada, setQuantidadePersonalizada] = useState('')

  useEffect(() => {
    localStorage.setItem(chaveStorage, String(consumo))
  }, [consumo, chaveStorage])

  const progresso = Math.min(
    Math.round((consumo / META_AGUA) * 100),
    100
  )

  const restante = Math.max(META_AGUA - consumo, 0)

  function adicionarQuantidade(quantidade) {
    setConsumo((atual) => atual + quantidade)
  }

  function removerAgua() {
    setConsumo((atual) => Math.max(0, atual - DOSE_AGUA))
  }

  function adicionarPersonalizado(event) {
    event.preventDefault()

    const quantidade = Number(quantidadePersonalizada)

    if (!quantidade || quantidade <= 0) {
      return
    }

    setConsumo((atual) => atual + quantidade)
    setQuantidadePersonalizada('')
  }

  function zerarConsumo() {
    const confirmar = window.confirm(
      'Deseja realmente zerar o consumo de água de hoje?'
    )

    if (!confirmar) {
      return
    }

    setConsumo(0)
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

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Consumo de hoje
              </p>

              <p className="mt-2 text-4xl font-bold">
                {(consumo / 1000).toFixed(2)} L
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Meta diária: {(META_AGUA / 1000).toFixed(1)} L
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm text-slate-400">
                Progresso
              </p>

              <p className="mt-2 text-3xl font-bold text-cyan-400">
                {progresso}%
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${progresso}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-sm text-slate-500">
              <span>{consumo} ml consumidos</span>
              <span>{restante} ml restantes</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium text-slate-300">
              Adicionar água
            </p>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {[250, 500, 750].map((quantidade) => (
                <button
                  key={quantidade}
                  type="button"
                  onClick={() => adicionarQuantidade(quantidade)}
                  className="cursor-pointer rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-cyan-400"
                >
                  + {quantidade} ml
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={adicionarPersonalizado}
            className="mt-6"
          >
            <p className="text-sm font-medium text-slate-300">
              Outra quantidade
            </p>

            <div className="mt-3 flex gap-3">
              <input
                type="number"
                min="1"
                inputMode="numeric"
                value={quantidadePersonalizada}
                onChange={(event) =>
                  setQuantidadePersonalizada(event.target.value)
                }
                placeholder="Ex.: 350 ml"
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-cyan-500"
              />

              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">
            Resumo
          </h2>

          <div className="mt-6 grid gap-4">
            <div className="rounded-xl bg-slate-950/40 p-4">
              <p className="text-sm text-slate-500">
                Consumido
              </p>

              <p className="mt-1 text-xl font-semibold">
                {consumo} ml
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/40 p-4">
              <p className="text-sm text-slate-500">
                Restante
              </p>

              <p className="mt-1 text-xl font-semibold">
                {restante} ml
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/40 p-4">
              <p className="text-sm text-slate-500">
                Copos de 250 ml
              </p>

              <p className="mt-1 text-xl font-semibold">
                {(consumo / DOSE_AGUA).toFixed(1)}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={removerAgua}
              disabled={consumo === 0}
              className="cursor-pointer rounded-xl border border-slate-700 px-4 py-3 font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              - 250 ml
            </button>

            <button
              type="button"
              onClick={zerarConsumo}
              disabled={consumo === 0}
              className="cursor-pointer rounded-xl border border-red-500/30 px-4 py-3 font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Zerar consumo de hoje
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Agua
