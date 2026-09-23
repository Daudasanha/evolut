import { useState } from 'react'

import {
  refeicoes,
  resumoNutricional,
} from '../../data/planoAlimentar'

function Alimentacao() {
  const [refeicaoAberta, setRefeicaoAberta] = useState(null)

  function alternarRefeicao(id) {
    if (refeicaoAberta === id) {
      setRefeicaoAberta(null)
      return
    }

    setRefeicaoAberta(id)
  }

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
        <h2 className="text-lg font-semibold">
          Resumo diário
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-400">
              Calorias
            </p>
            <p className="mt-1 text-xl font-semibold">
              {resumoNutricional.calorias} kcal
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

            return (
              <div
                key={refeicao.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h3 className="font-semibold">
                      {refeicao.nome}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {refeicao.horario}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
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
