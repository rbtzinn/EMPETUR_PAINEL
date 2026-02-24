import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportarParaExcelPersonalizado = async (dados, termoBusca) => {
  if (dados.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Relatório Cultural');

  // 1. Definição das Colunas e Larguras
  worksheet.columns = [
    { header: 'ARTISTA', key: 'artista', width: 40 },
    { header: 'MUNICÍPIO', key: 'municipio', width: 25 },
    { header: 'CICLO CULTURAL', key: 'ciclo', width: 20 },
    { header: 'DATA DO EVENTO', key: 'data', width: 18 },
    { header: 'VALOR FOMENTO (R$)', key: 'valor', width: 22 },
  ];

  // 2. Estilização do Cabeçalho (Linha 1)
  const headerRow = worksheet.getRow(1);
  headerRow.height = 30;
  
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '0B2341' }, // Seu Azul Escuro
    };
    cell.font = {
      color: { argb: 'FFFFFF' },
      bold: true,
      size: 11,
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      bottom: { style: 'medium', color: { argb: '00AEEF' } } // Borda inferior Azul Claro
    };
  });

  // 3. Adicionando os Dados
  dados.forEach((d) => {
    const row = worksheet.addRow({
      artista: d.artista?.toUpperCase(),
      municipio: d.municipio?.toUpperCase(),
      ciclo: d.ciclo,
      data: d.dataEvento,
      valor: Number(d.valor) || 0
    });

    // Estilização das linhas de dados
    row.height = 20;
    row.alignment = { vertical: 'middle' };
    
    // Formatação da célula de Valor (Moeda)
    const valorCell = row.getCell('valor');
    valorCell.numFmt = '"R$ "#,##0.00';
    valorCell.font = { bold: true, color: { argb: '00AEEF' } }; // Azul claro nos valores
    valorCell.alignment = { horizontal: 'right', vertical: 'middle' };
  });

  // 4. Zebra Stripe (Linhas alternadas com fundo leve)
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1 && rowNumber % 2 === 0) {
      row.eachCell((cell) => {
        if (cell.address.indexOf('E') === -1) { // Não pinta a coluna de valor para manter destaque
           cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'F8FAFC' },
          };
        }
      });
    }
  });

  // 5. Gerar o arquivo e baixar
  const buffer = await workbook.xlsx.writeBuffer();
  const dataAtual = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
  const nomeArquivo = `Relatorio_Cultural_PE_${dataAtual}.xlsx`;
  
  saveAs(new Blob([buffer]), nomeArquivo);
};