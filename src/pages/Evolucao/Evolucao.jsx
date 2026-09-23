import { useState } from 'react'

import { obterDataLocal } from '../../lib/data'

const CHAVE_EVOLUCAO = 'evolut-evolucao-peso'

function Evolucao() {
  const [peso, setPeso] = useState('')

  const [registros, setRegistros] = useState(() => {
    const salvo = localStorage.getItem(CHAVE_EVOLUCAO)

    if (!salvo) {
      return []
    }

    try {
      return JSON.parse(salvo)
    } catch {
      return []
    }
  })

  function salvarRegistros(novosRegistros) {
    setRegistros(novosRegistros)

    localStorage.setItem(
      CHAVE_EVOLUCAO,
      JSON.stringify(novosRegistros)
    )
  }

  function registrarPeso(event) {
    event.preventDefault()

    const pesoNumerico = Number(
      peso.replace(',', '.')
    )

    if (!pesoNumerico || pesoNumerico <= 0) {
      return
    }

    const novoRegistro = {
      id: Date.now(),
      data: obterDataLocal(),
      peso: pesoNumerico,
    }

    salvarRegistros([
      novoRegistro,
      ...registros,
    ])

    setPeso('')
  }

  function excluirRegistro(id) {
    salvarRegistros(
      registros.filter((registro) => registro.id !== id)
    )
  }

  const pesoAtual =
    registros.length > 0
      ? registros[0].peso
      : null

  const pesoAnterior =
    registros.length > 1
      ? registros[1].peso
      : null

  const variacao =
    pesoAtual !== null && pesoAnterior !== null
      ? pesoAtual - pesoAnterior
      : null

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">
          Evolução
        </h1>

        <p className="mt-2 text-slate-400">
          Registre seu peso e acompanhe sua evolução.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">
            Registrar peso
          </h2>

          <form
            onSubmit={registrarPeso}
            className="mt-5 flex gap-3"
          >
            <input
              type="text"
              inputMode="decimal"
              value={peso}
              onChange={(event) => setPeso(event.target.value)}
              placeholder="Ex.: 82,5"
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
            />

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Registrar
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Peso atual
          </p>

          <p className="mt-2 text-4xl font-bold">
            {pesoAtual !== null
              ? `${pesoAtual.toFixed(1)} kg`
              : '--'}
          </p>

          <p className="mt-3 text-sm text-slate-400">
            {variacao === null
              ? 'Registre pelo menos dois pesos para comparar.'
              : variacao === 0
                ? 'Sem alteração desde o último registro.'
                : `${variacao > 0 ? '+' : ''}${variacao.toFixed(1)} kg desde o último registro.`}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">
          Histórico
        </h2>

        {registros.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-800 p-8 text-center text-slate-500">
            Nenhum peso registrado ainda.
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            {registros.map((registro) => (
              <div
                key={registro.id}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div>
                  <p className="font-semibold">
                    {registro.peso.toFixed(1)} kg
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {registro.data.split('-').reverse().join('/')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => excluirRegistro(registro.id)}
                  className="cursor-pointer rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-400 transition hover:border-red-500/50 hover:text-red-400"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Evolucao
