# 📊 Portal de Transparência e Inteligência de Dados - EMPETUR

Um ecossistema de dados e governança desenvolvido para o monitoramento das contratações artísticas do Estado de Pernambuco. O projeto transforma bases brutas contábeis (e-Fisco) em uma interface de inteligência geográfica, analítica e de fácil usabilidade para o cidadão.

Desenvolvido com foco absoluto em **Engenharia de Dados no Frontend** e conformidade com os rigorosos critérios do **Selo Diamante** do Programa Nacional de Transparência Pública (PNTP / TCE).

## 🚀 Visão Geral e Impacto
Em vez de expor o cidadão a planilhas densas e com jargões técnicos, a aplicação atua como um intermediário inteligente. Ela consome os dados abertos, higieniza as informações em tempo real e as projeta em um Dashboard interativo, garantindo o direito à informação previsto na LAI (Lei de Acesso à Informação) e o respeito à LGPD.

## ⚙️ Destaques de Engenharia & Arquitetura

* **Motor de Processamento de Dados (ETL in-browser):** Implementação de um pipeline em JavaScript que realiza o saneamento de dados via Regex. Ele unifica nomes de artistas, normaliza divergências de digitação nos municípios e aplica travas automáticas contra duplicidades e notas de empenho com valor liquidado zerado.
* **Geoprocessamento Reativo:** Uso de `D3-geo` e `React Simple Maps` para criar um mapa de calor 100% responsivo do estado de Pernambuco. O mapa possui um sistema de zoom "voador" reativo: ao filtrar um município por qualquer componente (sidebar, gráficos ou KPIs), o sistema calcula o centroide geográfico e realiza o foco espacial automático.
* **Arquitetura de Estado Sincronizada:** Dashboard construído sob o conceito de "Única Fonte da Verdade" (Single Source of Truth). Filtros aplicados em um gráfico de rosca, sidebar ou em KPIs de destaque são propagados instantaneamente para a tabela de histórico e para o mapa.
* **UI/UX Analítico:** Interface fluida construída com `Tailwind CSS` e `Tremor`, focada em performance. Conta com modais didáticos (Linguagem Cidadã), ferramentas de exportação para `.XLSX` (Dados Abertos) e Tooltips explicativos.

## 🛡️ Conformidade Legal e Acessibilidade

O painel foi arquitetado para gabaritar cartilhas de auditoria governamental:
- **Acessibilidade Plena:** Integração nativa com o **VLibras** (tradução para Língua Brasileira de Sinais) e injeção de manipulação de DOM para **Alto Contraste** visual.
- **Rastreabilidade Contábil:** Exibição do Número do Empenho original em todas as tabelas para cruzamento de dados com o Diário Oficial.
- **Dados Abertos:** Disponibilização da base de dados higienizada (exportação de view) e da Base Bruta original, acompanhada de metadados de fonte e data de atualização.
- **Transparência e LGPD:** Modais detalhando a base legal da publicação dos dados e os contatos oficiais de encarregados de proteção de dados (DPO).

## 🛠️ Tecnologias Utilizadas
* **React.js** (Vite)
* **Tailwind CSS** (Estilização e Design System)
* **Tremor** (Componentes de visualização de dados)
* **PapaParse** (Processamento e conversão rápida de CSV no lado do cliente)
* **React Simple Maps / D3-geo** (Renderização cartográfica)

## 👨‍💻 Desenvolvedor
**Roberto Gabriel Araújo Miranda** *Membro & Desenvolvedor de Controle Interno - EMPETUR*