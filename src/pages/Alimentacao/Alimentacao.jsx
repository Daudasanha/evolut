import { useEffect, useState } from 'react'

import { obterDataLocal } from '../../lib/data'

import {
  refeicoes,
  resumoNutricional,
} from '../../data/planoAlimentar'

function Alimentacao() {
  const [refeicaoAberta, setRefeicaoAberta] = useState(null)
  const hoje = obterDataLocal()
  const chaveStorage = `evolut-refeicoes-${hoje}`

  const [refeicoesRealizadas, setRefeicoesRealizadas] = useState(() => {
    const dadosSalvos = localStorage.getItem(chaveStorage)

    if (!dadosSalvos) {
      return []
    }

    return JSON.parse(dadosSalvos)
  })

  useEffect(() => {
    localStorage.setItem(
      chaveStorage,
      JSON.stringify(refeicoesRealizadas)
    )
  }, [refeicoesRealizadas, chaveStorage])

  function alternarRefeicao(id) {
    if (refeicaoAberta === id) {
      setRefeicaoAberta(null)
      return
    }

    setRefeicaoAberta(id)
  }

  function alternarRefeicaoRealizada(id) {
    const jaFoiRealizada = refeicoesRealizadas.includes(id)

    if (jaFoiRealizada) {
      setRefeicoesRealizadas(
        refeicoesRealizadas.filter((refeicaoId) => refeicaoId !== id)
      )
      return
    }

    setRefeicoesRealizadas([...refeicoesRealizadas, id])
  }

  const totalRefeicoes = refeicoes.length
  const totalRealizadas = refeicoesRealizadas.length

  const caloriasRealizadas = refeicoes
    .filter((refeicao) => refeicoesRealizadas.includes(refeicao.id))
    .reduce((total, refeicao) => total + refeicao.calorias, 0)

  const progresso =
    totalRefeicoes === 0
      ? 0
      : Math.round((totalRealizadas / totalRefeicoes) * 100)

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">
          Alimentação
        </h1>

        <p className="mt-2 text-slate-400">
          Acompanhe seu plano alimentar e suas refeições do dia.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">
            Resumo diário
          </h2>

          <span className="text-sm text-slate-400">
            {totalRealizadas} de {totalRefeicoes} refeições realizadas
          </span>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Progresso do dia
            </span>

            <span className="text-sm font-medium text-slate-300">
              {progresso}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-400">
              Calorias
            </p>

            <p className="mt-1 text-xl font-semibold">
              {caloriasRealizadas}
              <span className="text-sm font-normal text-slate-500">
                {' '}/ {resumoNutricional.calorias} kcal
              </span>
            </p>

            <p className="mt-1 text-xs text-slate-500">
              realizadas / planejadas
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Carboidratos
            </p>

            <p className="mt-1 text-xl font-semibold">
              {resumoNutricional.carboidratos} g
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Proteínas
            </p>

            <p className="mt-1 text-xl font-semibold">
              {resumoNutricional.proteinas} g
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Gorduras
            </p>

            <p className="mt-1 text-xl font-semibold">
              {resumoNutricional.gorduras} g
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">
          Refeições de hoje
        </h2>

        <div className="mt-4 grid gap-4">
          {refeicoes.map((refeicao) => {
            const estaAberta = refeicaoAberta === refeicao.id

            const estaRealizada =
              refeicoesRealizadas.includes(refeicao.id)

            return (
              <div
                key={refeicao.id}
                className={`rounded-2xl border p-5 transition ${
                  estaRealizada
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-slate-800 bg-slate-900'
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        alternarRefeicaoRealizada(refeicao.id)
                      }
                      className={`flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border text-sm font-bold transition ${
                        estaRealizada
                          ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                          : 'border-slate-600 text-transparent hover:border-emerald-500'
                      }`}
                      aria-label={
                        estaRealizada
                          ? `Desmarcar ${refeicao.nome}`
                          : `Marcar ${refeicao.nome} como realizada`
                      }
                    >
                      ✓
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {refeicao.nome}
                        </h3>

                        {estaRealizada && (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                            Realizada
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-slate-400">
                        {refeicao.horario}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 lg:gap-6">
                    <span className="text-sm font-medium text-slate-300">
                      {refeicao.calorias} kcal
                    </span>

                    <button
                      type="button"
                      onClick={() => alternarRefeicao(refeicao.id)}
                      className="cursor-pointer rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
                    >
                      {estaAberta
                        ? 'Ocultar detalhes ↑'
                        : 'Ver detalhes ↓'}
                    </button>
                  </div>
                </div>

                {estaAberta && (
                  <div className="mt-5 border-t border-slate-800 pt-4">
                    <p className="mb-3 text-sm font-medium text-slate-300">
                      Plano da refeição
                    </p>

                    <div className="grid gap-2">
                      {refeicao.alimentos.map((alimento) => (
                        <div
                          key={alimento.id}
                          className="rounded-lg bg-slate-950/50 px-4 py-3"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-slate-300">
                              {alimento.nome}
                            </span>

                            <span className="shrink-0 text-sm font-medium text-slate-400">
                              {alimento.quantidade}
                            </span>
                          </div>

                          {alimento.alternativas && (
                            <div className="mt-2 border-t border-slate-800/70 pt-2">
                              <p className="text-xs leading-5 text-slate-500">
                                <span className="font-medium text-slate-400">
                                  Pode substituir por:
                                </span>{' '}
                                {alimento.alternativas}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {refeicao.opcoesCompletas && (
                      <div className="mt-5 border-t border-slate-800 pt-4">
                        <p className="mb-3 text-sm font-medium text-slate-300">
                          Outras opções da refeição
                        </p>

                        <div className="grid gap-3">
                          {refeicao.opcoesCompletas.map((opcao) => (
                            <div
                              key={opcao.id}
                              className="rounded-lg border border-slate-800 bg-slate-950/30 p-4"
                            >
                              <p className="text-sm font-medium text-slate-300">
                                {opcao.titulo}
                              </p>

                              <p className="mt-2 text-sm leading-6 text-slate-400">
                                {opcao.descricao}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {refeicao.observacao && (
                      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/30 p-4">
                        <p className="text-xs leading-5 text-slate-500">
                          <span className="font-medium text-slate-400">
                            Observação:
                          </span>{' '}
                          {refeicao.observacao}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Alimentacao







