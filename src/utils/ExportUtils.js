import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportarParaExcelPersonalizado = async (dados, termoBusca) => {
  if (dados.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Relatório Cultural');

  worksheet.columns = [
    { header: 'ARTISTA', key: 'artista', width: 40 },
    { header: 'MUNICÍPIO', key: 'municipio', width: 25 },
    { header: 'CICLO CULTURAL', key: 'ciclo', width: 20 },
    { header: 'DATA DO EVENTO', key: 'data', width: 18 },
    { header: 'VALOR FOMENTO (R$)', key: 'valor', width: 22 },
  ];

  const headerRow = worksheet.getRow(1);
  headerRow.height = 30;
  
  headerRow.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0B2341' } };
    cell.font = { color: { argb: 'FFFFFF' }, bold: true, size: 11 };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = { bottom: { style: 'medium', color: { argb: '00AEEF' } } };
  });

  dados.forEach((d) => {
    const row = worksheet.addRow({
      artista: d.artista?.toUpperCase(),
      municipio: d.municipio?.toUpperCase(),
      ciclo: d.ciclo,
      data: d.dataEvento,
      valor: Number(d.valor) || 0
    });

    row.height = 20;
    row.alignment = { vertical: 'middle' };
    
    const valorCell = row.getCell('valor');
    valorCell.numFmt = '"R$ "#,##0.00';
    valorCell.font = { bold: true, color: { argb: '00AEEF' } };
    valorCell.alignment = { horizontal: 'right', vertical: 'middle' };
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1 && rowNumber % 2 === 0) {
      row.eachCell((cell) => {
        if (cell.address.indexOf('E') === -1) {
           cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
        }
      });
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const dataAtual = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
  saveAs(new Blob([buffer]), `Relatorio_Cultural_PE_${dataAtual}.xlsx`);
};

// 🔴 NOVA FUNÇÃO PARA SELO DIAMANTE (Dados Abertos)
export const exportarParaCSV = (dados) => {
  if (dados.length === 0) return;
  const separador = ';';
  const cabecalho = ['ARTISTA', 'MUNICÍPIO', 'CICLO CULTURAL', 'DATA DO EVENTO', 'VALOR FOMENTO (R$)'].join(separador) + '\n';
  
  const linhas = dados.map(d => {
    return [
      `"${(d.artista || '').toUpperCase()}"`,
      `"${(d.municipio || '').toUpperCase()}"`,
      `"${d.ciclo || ''}"`,
      `"${d.dataEvento || ''}"`,
      `"${Number(d.valor || 0).toFixed(2).replace('.', ',')}"` 
    ].join(separador);
  }).join('\n');

  // BOM para forçar o UTF-8 (caracteres com acentos) no Windows
  const blob = new Blob(['\uFEFF' + cabecalho + linhas], { type: 'text/csv;charset=utf-8;' });
  const dataAtual = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
  saveAs(blob, `Dados_Abertos_Cultura_${dataAtual}.csv`);
};