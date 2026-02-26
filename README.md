Esta documentação resume a arquitetura e as soluções de engenharia aplicadas no painel.

Visão Geral
O projeto é um ecossistema de dados para monitoramento das contratações artísticas de Pernambuco. Ele transforma bases brutas do eFisco em uma interface de inteligência geográfica e analítica.

Destaques de Engenharia:

Motor de Processamento de Dados: Implementação de um pipeline em JavaScript que realiza o saneamento de dados via Regex para unificação de nomes de artistas e normalização de municípios, além de filtragem automática de duplicidade e registros com valor liquidado zerado.

Geoprocessamento Reativo: Uso de D3-geo e React Simple Maps para criar um mapa de calor 100% responsivo. O mapa possui um sistema de zoom "voador" reativo: ao filtrar um município por qualquer componente (sidebar, gráficos ou KPIs), o mapa calcula o centroide geográfico e realiza o foco automático.

Arquitetura de Estado Sincronizada: Todo o dashboard é reativo. Filtros aplicados em um gráfico de rosca ou em KPIs de destaque são propagados instantaneamente para a tabela de histórico e para o mapa, garantindo uma "única fonte da verdade".

UI/UX Analítico: Interface construída com Tailwind CSS e Tremor, focada em acessibilidade e performance, com ferramentas de exportação para XLSX e Tooltips inteligentes.