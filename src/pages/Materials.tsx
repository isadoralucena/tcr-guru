
import { MathJaxContext, MathJax } from "better-react-mathjax";

const Materials = () => {
  return (
    <MathJaxContext>
      <div className="flex flex-col shadow-md p-7 w-[90%] max-w-4xl mx-auto rounded-2xl bg-white space-y-6">
        
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Introdução ao Teorema Chinês do Resto</h2>
          <p>
            O <strong>Teorema Chinês do Resto (TCR)</strong> nos permite resolver sistemas de congruências como:
          </p>

          <MathJax>
            {`\\[
              \\begin{cases}
              x \\equiv a_1 \\ (\\text{mod } m_1) \\\\
              x \\equiv a_2 \\ (\\text{mod } m_2) \\\\
              \\vdots \\\\
              x \\equiv a_n \\ (\\text{mod } m_n)
              \\end{cases}
            \\]`}
          </MathJax>

          <p>
            Onde os módulos <MathJax inline>{"\\( m_1, m_2, \\dots, m_n \\)"}</MathJax> são coprimos dois a dois.
            O TCR garante a existência e unicidade de uma solução módulo <MathJax inline>{"\\( M = m_1 \\cdot m_2 \\dots m_n \\)"}</MathJax>.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-medium mt-6">Resumo dos Passos:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <MathJax inline>{"Calcular o produto \\( M = m_1 \\cdot m_2 \\cdots m_n \\)"}</MathJax>
            </li>
            <li>
              <MathJax inline>{"Para cada congruência, calcular \\( M_i = M / m_i \\)"}</MathJax>
            </li>
            <li>
              <MathJax inline>{"Encontrar o inverso de \\( M_i \\) módulo \\( m_i \\): \\( y_i \\)"}</MathJax>
            </li>
            <li>
              <MathJax inline>{"A solução é dada por \\( x = \\sum_{i=1}^{n} a_i \\cdot M_i \\cdot y_i \\mod M \\)"}</MathJax>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">Relatório Didático:</h3>
          <p>
            Você pode acessar um material escrito completo sobre o Teorema Chinês do Resto clicando no link abaixo:
          </p>
          <a
            href="https://docs.google.com/document/d/1jUm_yt_1ZGKBxBTMe9jTbwK2W6gPNYPXc1pqSUDxKvc/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            TCR Descomplicado 
          </a>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">Vídeo para aprofundamento:</h3>
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/tcgi_4DRZM0"
              title="Teorema Chinês do Resto"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default Materials;
