import { useState } from 'react'

import { treinos } from '../../data/planoTreino'

function obterDataLocal() {
  const agora = new Date()
  const ano = agora.getFullYear()
  const mes = String(agora.getMonth() + 1).padStart(2, '0')
  const dia = String(agora.getDate()).padStart(2, '0')

  return `${ano}-${mes}-${dia}`
}

function obterChaveStorage(treinoId) {
  return `evolut-treino-${obterDataLocal()}-${treinoId}`
}

function carregarTreino(treinoId) {
  const dadosSalvos = localStorage.getItem(obterChaveStorage(treinoId))

  if (!dadosSalvos) {
    return {
      exerciciosConcluidos: [],
      registros: {},
    }
  }

  try {
    const dados = JSON.parse(dadosSalvos)

    return {
      exerciciosConcluidos: dados.exerciciosConcluidos || [],
      registros: dados.registros || {},
    }
  } catch {
    return {
      exerciciosConcluidos: [],
      registros: {},
    }
  }
}

function Treino() {
  const [treinoSelecionado, setTreinoSelecionado] = useState('A')

  const [dadosTreinos, setDadosTreinos] = useState(() => {
    const dadosIniciais = {}

    treinos.forEach((treino) => {
      dadosIniciais[treino.id] = carregarTreino(treino.id)
    })

    return dadosIniciais
  })

  const [exercicioAberto, setExercicioAberto] = useState(null)
  const [rascunhos, setRascunhos] = useState({})
  const [registroSalvo, setRegistroSalvo] = useState(null)

  const treinoAtual =
    treinos.find((treino) => treino.id === treinoSelecionado) || treinos[0]

  const dadosAtuais = dadosTreinos[treinoSelecionado] || {
    exerciciosConcluidos: [],
    registros: {},
  }

  const exerciciosConcluidos = dadosAtuais.exerciciosConcluidos
  const registros = dadosAtuais.registros

  function persistirTreino(treinoId, novosDados) {
    localStorage.setItem(
      obterChaveStorage(treinoId),
      JSON.stringify(novosDados)
    )

    setDadosTreinos((atuais) => ({
      ...atuais,
      [treinoId]: novosDados,
    }))
  }

  function selecionarTreino(id) {
    setTreinoSelecionado(id)
    setExercicioAberto(null)
    setRegistroSalvo(null)
  }

  function alternarExercicio(id) {
    if (exercicioAberto === id) {
      setExercicioAberto(null)
      return
    }

    const registroExistente = registros[id] || {
      series: {},
      observacao: '',
    }

    setRascunhos((atuais) => ({
      ...atuais,
      [id]: JSON.parse(JSON.stringify(registroExistente)),
    }))

    setExercicioAberto(id)
    setRegistroSalvo(null)
  }

  function alternarConcluido(id) {
    const jaConcluido = exerciciosConcluidos.includes(id)

    const novosConcluidos = jaConcluido
      ? exerciciosConcluidos.filter((exercicioId) => exercicioId !== id)
      : [...exerciciosConcluidos, id]

    persistirTreino(treinoSelecionado, {
      ...dadosAtuais,
      exerciciosConcluidos: novosConcluidos,
    })
  }

  function atualizarSerie(exercicioId, indiceSerie, campo, valor) {
    setRascunhos((atuais) => {
      const registroAtual = atuais[exercicioId] || {
        series: {},
        observacao: '',
      }

      const serieAtual = registroAtual.series?.[indiceSerie] || {}

      return {
        ...atuais,
        [exercicioId]: {
          ...registroAtual,
          series: {
            ...registroAtual.series,
            [indiceSerie]: {
              ...serieAtual,
              [campo]: valor,
            },
          },
        },
      }
    })

    setRegistroSalvo(null)
  }

  function atualizarObservacao(exercicioId, valor) {
    setRascunhos((atuais) => ({
      ...atuais,
      [exercicioId]: {
        ...(atuais[exercicioId] || {
          series: {},
        }),
        observacao: valor,
      },
    }))

    setRegistroSalvo(null)
  }

  function salvarExercicio(exercicioId) {
    const rascunho = rascunhos[exercicioId] || {
      series: {},
      observacao: '',
    }

    const novosRegistros = {
      ...registros,
      [exercicioId]: {
        ...rascunho,
        salvoEm: new Date().toISOString(),
      },
    }

    const novosConcluidos = exerciciosConcluidos.includes(exercicioId)
      ? exerciciosConcluidos
      : [...exerciciosConcluidos, exercicioId]

    persistirTreino(treinoSelecionado, {
      exerciciosConcluidos: novosConcluidos,
      registros: novosRegistros,
    })

    setRegistroSalvo(exercicioId)
  }

  const totalExercicios = treinoAtual.exercicios.length

  const concluidosDoTreino = treinoAtual.exercicios.filter((exercicio) =>
    exerciciosConcluidos.includes(exercicio.id)
  ).length

  const progresso =
    totalExercicios === 0
      ? 0
      : Math.round((concluidosDoTreino / totalExercicios) * 100)

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">
          Treino
        </h1>

        <p className="mt-2 text-slate-400">
          Acompanhe seu treino, suas séries, repetições e cargas.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {treinos.map((treino) => {
          const ativo = treino.id === treinoSelecionado

          return (
            <button
              key={treino.id}
              type="button"
              onClick={() => selecionarTreino(treino.id)}
              className={`cursor-pointer rounded-xl border px-5 py-3 font-medium transition ${
                ativo
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              {treino.nome}
            </button>
          )
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">
              Treino selecionado
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              {treinoAtual.nome}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {treinoAtual.descricao}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-400">
              {concluidosDoTreino} de {totalExercicios} exercícios
            </p>

            <p className="mt-1 text-xl font-semibold">
              {progresso}%
            </p>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">
          Exercícios
        </h2>

        <div className="mt-4 grid gap-4">
          {treinoAtual.exercicios.map((exercicio, indice) => {
            const concluido = exerciciosConcluidos.includes(exercicio.id)
            const aberto = exercicioAberto === exercicio.id

            const registroSalvoAtual = registros[exercicio.id] || {
              series: {},
              observacao: '',
            }

            const registro = aberto
              ? rascunhos[exercicio.id] || registroSalvoAtual
              : registroSalvoAtual

            return (
              <div
                key={exercicio.id}
                className={`rounded-2xl border bg-slate-900 transition ${
                  concluido
                    ? 'border-emerald-700'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:gap-4 sm:p-5">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => alternarConcluido(exercicio.id)}
                      className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border transition ${
                        concluido
                          ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                          : 'border-slate-600 hover:border-emerald-500'
                      }`}
                    >
                      {concluido ? '✓' : ''}
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-slate-500">
                          {String(indice + 1).padStart(2, '0')}
                        </span>

                        <h3 className="font-semibold">
                          {exercicio.nome}
                        </h3>

                        {concluido && (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                            Concluído
                          </span>
                        )}

                        {registros[exercicio.id] && (
                          <span className="rounded-full bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-400">
                            Registro salvo
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-slate-400">
                        {exercicio.series} × {exercicio.repeticoes}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alternarExercicio(exercicio.id)}
                    className="cursor-pointer rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    {aberto ? 'Ocultar ↑' : 'Registrar ↓'}
                  </button>
                </div>

                {aberto && (
                  <div className="border-t border-slate-800 p-4 sm:p-5">
                    <div className="w-full overflow-hidden">
                      <div className="w-full">
                        <div className="grid grid-cols-[48px_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-1 text-xs font-medium uppercase sm:grid-cols-[80px_1fr_1fr] sm:gap-3 sm:px-2 tracking-wide text-slate-500">
                          <span>Série</span>
                          <span>Carga (kg)</span>
                          <span>Repetições</span>
                        </div>

                        <div className="mt-3 grid gap-3">
                          {Array.from(
                            { length: exercicio.series },
                            (_, indiceSerie) => {
                              const numeroSerie = indiceSerie + 1
                              const serie =
                                registro.series?.[numeroSerie] || {}

                              return (
                                <div
                                  key={numeroSerie}
                                  className="grid grid-cols-[48px_minmax(0,1fr)_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[80px_1fr_1fr] sm:gap-3"
                                >
                                  <span className="px-2 text-sm font-medium text-slate-300">
                                    {numeroSerie}ª
                                  </span>

                                  <input
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    value={serie.carga || ''}
                                    onChange={(evento) =>
                                      atualizarSerie(
                                        exercicio.id,
                                        numeroSerie,
                                        'carga',
                                        evento.target.value
                                      )
                                    }
                                    placeholder="Ex.: 20"
                                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                                  />

                                  <input
                                    type="number"
                                    min="0"
                                    value={serie.repeticoes || ''}
                                    onChange={(evento) =>
                                      atualizarSerie(
                                        exercicio.id,
                                        numeroSerie,
                                        'repeticoes',
                                        evento.target.value
                                      )
                                    }
                                    placeholder="Ex.: 12"
                                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                                  />
                                </div>
                              )
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label
                        htmlFor={`observacao-${exercicio.id}`}
                        className="text-sm font-medium text-slate-300"
                      >
                        Observação
                      </label>

                      <textarea
                        id={`observacao-${exercicio.id}`}
                        value={registro.observacao || ''}
                        onChange={(evento) =>
                          atualizarObservacao(
                            exercicio.id,
                            evento.target.value
                          )
                        }
                        placeholder="Como foi o exercício? Alguma observação?"
                        rows="3"
                        className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => salvarExercicio(exercicio.id)}
                        className="cursor-pointer rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                      >
                        Salvar exercício
                      </button>

                      {registroSalvo === exercicio.id && (
                        <span className="text-sm font-medium text-emerald-400">
                          ✓ Registro salvo
                        </span>
                      )}
                    </div>
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

export default Treino


