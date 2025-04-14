
import { MathJaxContext, MathJax } from "better-react-mathjax";

const Materials = () => {
  return (
    <div className="flex flex-col shadow-md p-7 w-[90%] max-w-4xl mx-auto rounded-2xl bg-white space-y-6">
      <MathJaxContext>
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
            Onde os módulos \( m_1, m_2, \\dots, m_n \) são coprimos dois a dois. O TCR garante a existência e unicidade de uma solução módulo \( M = m_1 \\cdot m_2 \\cdots m_n \).
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-medium mt-6">Resumo dos Passos:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Calcular o produto \( M = m_1 \cdot m_2 \cdots m_n \)</li>
            <li>Para cada congruência, calcular \( M_i = M / m_i \)</li>
            <li>Encontrar o inverso de \( M_i \) módulo \( m_i \): \( y_i \)</li>
            <li>A solução é \( x = \\sum a_i \\cdot M_i \\cdot y_i \\mod M \)</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">Vídeo explicativo:</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/tcgi_4DRZM0"
              title="Teorema Chinês do Resto"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </MathJaxContext>
    </div>
  );
};

export default Materials;