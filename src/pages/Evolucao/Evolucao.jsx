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

    const pesoNumerico = Number(peso.replace(',', '.'))

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

  const pesoInicial =
    registros.length > 0
      ? registros[registros.length - 1].peso
      : null

  const variacao =
    pesoAtual !== null && pesoAnterior !== null
      ? pesoAtual - pesoAnterior
      : null

  const variacaoTotal =
    pesoAtual !== null && pesoInicial !== null
      ? pesoAtual - pesoInicial
      : null

  const registrosGrafico = [...registros]
    .reverse()
    .slice(-10)

  const pesosGrafico = registrosGrafico.map(
    (registro) => registro.peso
  )

  const menorPeso =
    pesosGrafico.length > 0
      ? Math.min(...pesosGrafico)
      : 0

  const maiorPeso =
    pesosGrafico.length > 0
      ? Math.max(...pesosGrafico)
      : 0

  const intervaloPeso = maiorPeso - menorPeso || 1

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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Peso atual
          </p>

          <p className="mt-2 text-3xl font-bold">
            {pesoAtual !== null
              ? `${pesoAtual.toFixed(1)} kg`
              : '--'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Peso inicial
          </p>

          <p className="mt-2 text-3xl font-bold">
            {pesoInicial !== null
              ? `${pesoInicial.toFixed(1)} kg`
              : '--'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Evolução total
          </p>

          <p className="mt-2 text-3xl font-bold">
            {variacaoTotal !== null
              ? `${variacaoTotal > 0 ? '+' : ''}${variacaoTotal.toFixed(1)} kg`
              : '--'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Registros
          </p>

          <p className="mt-2 text-3xl font-bold">
            {registros.length}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[380px_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">
            Registrar peso
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Adicione sua medição de hoje.
          </p>

          <form
            onSubmit={registrarPeso}
            className="mt-5"
          >
            <label
              htmlFor="peso"
              className="text-sm font-medium text-slate-300"
            >
              Peso em kg
            </label>

            <div className="mt-2 flex gap-3">
              <input
                id="peso"
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
            </div>
          </form>

          <div className="mt-6 border-t border-slate-800 pt-5">
            <p className="text-sm text-slate-400">
              Última alteração
            </p>

            <p className="mt-2 font-semibold">
              {variacao === null
                ? 'Sem comparação disponível'
                : variacao === 0
                  ? 'Sem alteração'
                  : `${variacao > 0 ? '+' : ''}${variacao.toFixed(1)} kg`}
            </p>

            {pesoAnterior !== null && (
              <p className="mt-1 text-sm text-slate-500">
                Registro anterior: {pesoAnterior.toFixed(1)} kg
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                Evolução do peso
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Últimos {registrosGrafico.length} registros
              </p>
            </div>
          </div>

          {registrosGrafico.length === 0 ? (
            <div className="mt-6 flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 text-sm text-slate-500">
              Registre seu peso para iniciar o gráfico.
            </div>
          ) : (
            <div className="mt-8">
              <div className="flex h-56 items-end gap-3">
                {registrosGrafico.map((registro) => {
                  const altura =
                    25 +
                    ((registro.peso - menorPeso) /
                      intervaloPeso) *
                      75

                  return (
                    <div
                      key={registro.id}
                      className="flex min-w-0 flex-1 flex-col items-center justify-end"
                    >
                      <span className="mb-2 text-xs font-medium text-slate-300">
                        {registro.peso.toFixed(1)}
                      </span>

                      <div className="flex h-40 w-full items-end justify-center">
                        <div
                          className="w-full max-w-12 rounded-t-lg bg-emerald-500 transition-all duration-300"
                          style={{
                            height: `${altura}%`,
                          }}
                        />
                      </div>

                      <span className="mt-2 text-xs text-slate-500">
                        {registro.data
                          .split('-')
                          .slice(1)
                          .reverse()
                          .join('/')}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">
            Histórico
          </h2>

          <span className="text-sm text-slate-500">
            {registros.length} registro{registros.length === 1 ? '' : 's'}
          </span>
        </div>

        {registros.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-800 p-8 text-center text-slate-500">
            Nenhum peso registrado ainda.
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            {registros.map((registro, indice) => (
              <div
                key={registro.id}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-center gap-5">
                  <div>
                    <p className="text-xl font-semibold">
                      {registro.peso.toFixed(1)} kg
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {registro.data
                        .split('-')
                        .reverse()
                        .join('/')}
                    </p>
                  </div>

                  {indice === 0 && (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      Atual
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => excluirRegistro(registro.id)}
                  className="cursor-pointer rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-400 transition hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-400"
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
