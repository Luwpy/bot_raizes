export function calculateLevel(currentXp: number): {
  level: number;
  xpToNextLevel: number;
} {
  // Tabela de XP para cada nível (D&D 5e)
  const xpTable = [
    0, 500, 1200, 2100, 3700, 5500, 7500, 9600, 12600, 15700, 18900, 22200,
    26000, 30300, 34700, 39200, 44700, 50300, 56000, 62000,
  ];

  let level = 0;

  // Determina o nível atual com base no XP
  while (level < xpTable.length - 1 && currentXp >= xpTable[level + 1]) {
    level++;
  }

  const xpToNextLevel =
    level < xpTable.length - 1 ? xpTable[level + 1] - currentXp : 0; // Se estiver no nível máximo, não há XP necessário para o próximo nível

  return {
    level: level + 1, // D&D começa no nível 1
    xpToNextLevel,
  };
}
