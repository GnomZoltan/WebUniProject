export const jakobi = `
function solveByJacobi(matrix, results, tolerance = 1e-10, maxIterations = 100) {
    const n = matrix.length;
    let x = new Array(n).fill(0);
    let xNew = new Array(n).fill(0);

    let iterations = 0;
    let diff = Infinity;

    while (diff > tolerance && iterations < maxIterations) {
        diff = 0;

        for (let i = 0; i < n; i++) {
            let sum = results[i];

            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    sum -= matrix[i][j] * x[j];
                }
            }

            xNew[i] = sum / matrix[i][i];

            diff = Math.max(diff, Math.abs(xNew[i] - x[i]));
        }

        x = [...xNew];
        iterations++;
    }

    if (iterations === maxIterations) {
        console.warn("Maximum number of iterations reached.");
    }

    return x;
}
`;

export const cramer = `
function solveByCramer(matrix, results) {
  const n = matrix.length;

  const determinant = (m) => {
    if (m.length === 2) {
      return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    }
    let det = 0;
    for (let i = 0; i < m.length; i++) {
      const minor = m.slice(1).map((row) => row.filter((_, j) => j !== i));
      det += m[0][i] * determinant(minor) * (i % 2 === 0 ? 1 : -1);
    }
    return det;
  };

  const replaceColumn = (matrix, columnIndex, results) => {
    const newMatrix = matrix.map((row, i) => [...row]);
    for (let i = 0; i < results.length; i++) {
      newMatrix[i][columnIndex] = results[i];
    }
    return newMatrix;
  };

  const detA = determinant(matrix);

  if (detA === 0) {
    throw new Error(
      "Система не має єдиного розв'язку, оскільки визначник матриці дорівнює нулю."
    );
  }

  const solution = new Array(n);

  for (let i = 0; i < n; i++) {
    const detAi = determinant(replaceColumn(matrix, i, results));
    solution[i] = detAi / detA;
  }

  return solution;
}
`;

export const gauss = `
function solveByGauss(coefficients, results) {
  const n = coefficients.length;

  const matrix = coefficients.map((row, i) => [...row, results[i]]);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const factor = matrix[j][i] / matrix[i][i];
      for (let k = i; k <= n; k++) {
        matrix[j][k] -= factor * matrix[i][k];
      }
    }
  }

  const solution = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    solution[i] = matrix[i][n];
    for (let j = i + 1; j < n; j++) {
      solution[i] -= matrix[i][j] * solution[j];
    }
    solution[i] /= matrix[i][i];
  }

  return solution;
}
`;
