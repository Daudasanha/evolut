export const agendaTreino = {
  0: null,
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'A',
  5: 'B',
  6: 'C',
}

export function obterTreinoDoDia(data = new Date()) {
  return agendaTreino[data.getDay()]
}
