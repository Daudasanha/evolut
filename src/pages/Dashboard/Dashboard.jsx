import { refeicoes, resumoNutricional } from '../../data/planoAlimentar'
import { treinos } from '../../data/planoTreino'
import { obterTreinoDoDia } from '../../data/agendaTreino'
import { obterDataLocal } from '../../lib/data'

const META_AGUA = 3000

function lerJson(chave, valorPadrao) {
  const salvo = localStorage.getItem(chave)

  if (!salvo) {
    return valorPadrao
  }

  try {
    return JSON.parse(salvo)
  } catch {
    return valorPadrao
  }
}

function Dashboard() {
  const hoje = obterDataLocal()
  const codigoTreinoHoje = obterTreinoDoDia()

  const treinoHoje = codigoTreinoHoje
    ? treinos.find((treino) => treino.id === codigoTreinoHoje)
    : null

  const refeicoesRealizadas = lerJson(
    `evolut-refeicoes-${hoje}`,
    []
  )

  const agua = Number(
    localStorage.getItem(`evolut-agua-${hoje}`) || 0
  )

  const registrosPeso = lerJson(
    'evolut-evolucao-peso',
    []
  )

  const caloriasRealizadas = refeicoes
    .filter((refeicao) =>
      refeicoesRealizadas.includes(refeicao.id)
    )
    .reduce(
      (total, refeicao) => total + refeicao.calorias,
      0
    )

  const progressoAlimentacao =
    refeicoes.length === 0
      ? 0
      : Math.round(
          (refeicoesRealizadas.length / refeicoes.length) * 100
        )

  const progressoAgua = Math.min(
    Math.round((agua / META_AGUA) * 100),
    100
  )

  let dadosTreinoHoje = null

  if (treinoHoje) {
    const dados = lerJson(
      `evolut-treino-${hoje}-${treinoHoje.id}`,
      {
        exerciciosConcluidos: [],
        registros: {},
      }
    )

    const concluidos = treinoHoje.exercicios.filter(
      (exercicio) =>
        dados.exerciciosConcluidos.includes(exercicio.id)
    ).length

    const total = treinoHoje.exercicios.length

    const progresso =
      total === 0
        ? 0
        : Math.round((concluidos / total) * 100)

    dadosTreinoHoje = {
      ...treinoHoje,
      concluidos,
      total,
      progresso,
    }
  }

  const proximaRefeicao = refeicoes.find(
    (refeicao) =>
      !refeicoesRealizadas.includes(refeicao.id)
  )

  const pesoAtual =
    registrosPeso.length > 0
      ? registrosPeso[0].peso
      : null

  const cards = [
    {
      titulo: 'Alimentação',
      valor: `${progressoAlimentacao}%`,
      detalhe: `${caloriasRealizadas} / ${resumoNutricional.calorias} kcal`,
      barra: progressoAlimentacao,
    },
    {
      titulo: 'Água',
      valor: `${progressoAgua}%`,
      detalhe: `${(agua / 1000).toFixed(2)} / 3.00 L`,
      barra: progressoAgua,
    },
    {
      titulo: 'Treino',
      valor: dadosTreinoHoje
        ? `${dadosTreinoHoje.progresso}%`
        : 'Descanso',
      detalhe: dadosTreinoHoje
        ? `${dadosTreinoHoje.concluidos} / ${dadosTreinoHoje.total} exercícios`
        : 'Sem treino programado',
      barra: dadosTreinoHoje
        ? dadosTreinoHoje.progresso
        : null,
    },
    {
      titulo: 'Peso',
      valor:
        pesoAtual !== null
          ? `${Number(pesoAtual).toFixed(1)} kg`
          : '--',
      detalhe:
        pesoAtual !== null
          ? 'Último registro'
          : 'Sem registros',
      barra: null,
    },
  ]

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Visão geral do seu progresso de hoje.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.titulo}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">
              {card.titulo}
            </p>

            <p className="mt-2 text-2xl font-bold">
              {card.valor}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {card.detalhe}
            </p>

            {card.barra !== null && (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${card.barra}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Próxima refeição
          </p>

          {proximaRefeicao ? (
            <>
              <h2 className="mt-2 text-xl font-semibold">
                {proximaRefeicao.nome}
              </h2>

              <p className="mt-2 text-slate-400">
                {proximaRefeicao.horario}
                {' • '}
                {proximaRefeicao.calorias} kcal
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-2 text-xl font-semibold text-emerald-400">
                Plano concluído
              </h2>

              <p className="mt-2 text-slate-400">
                Todas as refeições foram realizadas hoje.
              </p>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Treino de hoje
          </p>

          {dadosTreinoHoje ? (
            <>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {dadosTreinoHoje.nome}
                  </h2>

                  <p className="mt-2 text-slate-400">
                    {dadosTreinoHoje.descricao}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-semibold">
                    {dadosTreinoHoje.progresso}%
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {dadosTreinoHoje.concluidos}/{dadosTreinoHoje.total}
                  </p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${dadosTreinoHoje.progresso}%`,
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-3 text-xl font-semibold">
                Dia de descanso
              </h2>

              <p className="mt-2 text-slate-400">
                Nenhum treino programado para hoje.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
