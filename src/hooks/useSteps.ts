type Step = {
    title: string;
    substeps: {
      title: string;
      latex: string;
    }[];
  };
  
  export function useSteps(congruenceData, crtData) {
    // Recebe os dados calculados pelos outros hooks e monta os passos
    const steps: Step[] = [
      {
        title: "Transformar as equações que são não canônicas",
        substeps: [
          {
            title: "Por inverso",
            latex: `\\text{equação em LaTeX baseada em } ${congruenceData.equation}`,
          },
          {
            title: "Simplificação",
            latex: `${congruenceData.simplified}`,
          },
        ],
      },
      {
        title: "Calcular o Teorema do Resto Chinês",
        substeps: [
          {
            title: "Módulo total",
            latex: `${crtData.totalModulus}`,
          },
          {
            title: "Frações intermediárias",
            latex: `${crtData.partialMods}`,
          },
          {
            title: "Produto intermediário",
            latex: `${crtData.partialProducts}`,
          },
          {
            title: "Fórmula geral",
            latex: `${crtData.generalFormula}`,
          },
        ],
      },
    ];
  
    return { steps };
}  