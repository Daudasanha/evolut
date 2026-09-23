export const resumoNutricional = {
  calorias: 1539,
  carboidratos: 186,
  proteinas: 126,
  gorduras: 29,
}

export const refeicoes = [
  {
    id: 1,
    nome: 'Almoço',
    horario: '13:00',
    calorias: 729,
    alimentos: [
      {
        id: 1,
        nome: 'Arroz branco cozido',
        quantidade: '150 g',
        alternativas:
          'Batata inglesa 385 g • Purê de batata 158 g • Mandioca 155 g • Macarrão cozido 125 g • Batata-doce 245 g • Inhame cozido 186 g',
      },
      {
        id: 2,
        nome: 'Feijão cozido',
        quantidade: '100 g',
      },
      {
        id: 3,
        nome: 'Frango grelhado',
        quantidade: '140 g',
        alternativas:
          'Acém/Patinho moído 128 g • Atum light 395 g • Peixe grelhado/assado 160 g • Filé mignon suíno 160 g • Lombo suíno 130 g • Moela cozida 220 g',
      },
      {
        id: 4,
        nome: 'Legumes cozidos',
        quantidade: '100 g',
        alternativas:
          'Abobrinha • Abóbora moranga • Berinjela • Beterraba • Brócolis • Cenoura • Chuchu • Couve-flor',
      },
      {
        id: 5,
        nome: 'Salada de folhas',
        quantidade: 'À vontade',
      },
      {
        id: 6,
        nome: 'Chocolate',
        quantidade: '18 g',
        alternativas:
          'Doce de leite 25 g • Paçoca 15 g • Brigadeiro 25 g • Nutella 20 g • Doce de banana 20 g • Goiabada 20 g',
      },
      {
        id: 7,
        nome: 'Suco de laranja natural',
        quantidade: '200 ml',
      },
    ],
  },

  {
    id: 2,
    nome: 'Lanche da tarde',
    horario: '18:00',
    calorias: 270,
    alimentos: [
      {
        id: 1,
        nome: 'Pão francês',
        quantidade: '1 unidade (50 g)',
        alternativas:
          'Tapioca 1 unidade (45 g) • Pão integral 2 fatias',
      },
      {
        id: 2,
        nome: 'Frango desfiado',
        quantidade: '60 g',
        alternativas: '3 ovos mexidos',
      },
      {
        id: 3,
        nome: 'Queijo branco / muçarela',
        quantidade: '1 fatia (20 g)',
        alternativas:
          'Requeijão light 1 colher de sopa (25 g)',
      },
    ],
    opcoesCompletas: [
      {
        id: 1,
        titulo: 'Opção alternativa',
        descricao:
          '1 iogurte natural + 30 g de whey concentrado + 1 porção de fruta + 3 colheres de sopa de farelo de aveia (30 g)',
      },
    ],
    observacao:
      'Whey concentrado ou 3W indicado no plano: 80% Growth, Concentrado Dux, 100% Integralmédica, 100% Black Skull, 100% Max Titanium ou Isolate Dark Labs.',
  },

  {
    id: 3,
    nome: 'Jantar',
    horario: '20:00',
    calorias: 540,
    alimentos: [
      {
        id: 1,
        nome: 'Arroz branco',
        quantidade: '150 g',
        alternativas:
          'Macarrão • Mandioca cozida 150 g • Batata inglesa cozida 360 g • Batata-baroa cozida 250 g • Inhame cozido • Batata-doce cozida 215 g',
      },
      {
        id: 2,
        nome: 'Feijão cozido',
        quantidade: '100 g',
        alternativas:
          'Lentilha • Ervilha • Grão-de-bico',
      },
      {
        id: 3,
        nome: 'Frango grelhado',
        quantidade: '140 g',
        alternativas:
          'Acém/Patinho moído 128 g • Atum light 395 g • Fígado bovino cozido 125 g • Peixe grelhado/assado 160 g • Filé mignon suíno 160 g • Lombo suíno 130 g • Moela cozida 220 g',
      },
      {
        id: 4,
        nome: 'Legumes cozidos',
        quantidade: '100 g',
        alternativas:
          'Abobrinha • Abóbora moranga • Berinjela • Beterraba • Brócolis • Cenoura • Chuchu • Couve-flor • Vagem',
      },
    ],
    opcoesCompletas: [
      {
        id: 1,
        titulo: 'Sanduíche',
        descricao:
          '1 pão francês + 135 g de patinho grelhado + 1 fatia de muçarela (20 g) + 1 ovo + salada de alface, tomate, cebola e milho.',
      },
      {
        id: 2,
        titulo: 'Crepioca',
        descricao:
          '3 colheres de sopa de tapioca (45 g) + 2 ovos + 1 fatia de muçarela (20 g) + 5 colheres de sopa de frango desfiado (100 g) + salada crua à vontade.',
      },
      {
        id: 3,
        titulo: 'Pizza brotinho',
        descricao:
          'Massa de pizza brotinho + 3 colheres de sopa de molho de tomate + 5 colheres de sopa de frango desfiado (100 g) + 2 fatias de muçarela (40 g) + tomate e cebola picados + azeitona e milho, se desejar + manjericão e orégano.',
      },
    ],
  },
]
