import { Link } from 'react-router-dom'
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
      link: '/alimentacao',
    },
    {
      titulo: 'Água',
      valor: `${progressoAgua}%`,
      detalhe: `${(agua / 1000).toFixed(2)} / 3.00 L`,
      barra: progressoAgua,
      link: '/agua',
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
      link: '/evolucao',
    },
  ]

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
          Visão geral do seu progresso de hoje.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.titulo}
            to={card.link}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5 transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-800/70"
          >
            <p className="text-sm text-slate-400">
              {card.titulo}
            </p>

            <p className="mt-2 text-xl font-bold sm:text-2xl">
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
            <p className="mt-4 text-xs font-medium text-slate-600 transition group-hover:text-slate-400">
              Ver detalhes →
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
        <Link
          to="/alimentacao"
          className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700 hover:bg-slate-800/50"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              Próxima refeição
            </p>

            <span className="text-sm text-slate-600 transition group-hover:text-slate-400">
              Abrir →
            </span>
          </div>

          {proximaRefeicao ? (
            <>
              <h2 className="mt-2 text-xl font-semibold">
                {proximaRefeicao.nome}
              </h2>

              <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
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

              <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
                Todas as refeições foram realizadas hoje.
              </p>
            </>
          )}
        </Link>

        <Link
          to="/treino"
          className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700 hover:bg-slate-800/50"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              Treino de hoje
            </p>

            <span className="text-sm text-slate-600 transition group-hover:text-slate-400">
              Abrir →
            </span>
          </div>

          {dadosTreinoHoje ? (
            <>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {dadosTreinoHoje.nome}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
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

              <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
                Nenhum treino programado para hoje.
              </p>
            </>
          )}
        </Link>
      </div>
    </div>
  )
}

export default Dashboard



