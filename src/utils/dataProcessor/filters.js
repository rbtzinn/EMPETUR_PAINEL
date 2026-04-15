import { TERMOS_SERVICO_MEIO, TIPOS_DESPESA_ACEITOS } from "./constants";

export const hasAcceptedExpenseType = (tipoDespesa = "") =>
  TIPOS_DESPESA_ACEITOS.has(String(tipoDespesa || "").trim().toUpperCase());

export const temCaraDeShow = (obs = "", detalhamento = "") => {
  const texto = `${obs} ${detalhamento}`.toUpperCase();

  return (
    /APRE(?:S|SE|SENTA|SENTAÇÃO|SENTACAO)|ART[IÍ]STIC|SHOW|CACH[ÊE]|BANDA|CANTOR(?:A)?|ORQUESTRA|TRIO|GRUPO|DJ\b|DANÇA|DANCA|CIA\b|CIA\.|BLOCO/.test(
      texto
    ) ||
    /CARNAVAL|S[ÃA]O JO[ÃA]O|NATAL|RÉVEILLON|REVEILLON|PERNAMBUCO MEU PA[IÍ]S|APOIO A EVENTOS CULTURAIS/.test(
      String(detalhamento || "").toUpperCase()
    )
  );
};

export const ehServicoMeio = (obs = "") => {
  const texto = String(obs || "").toUpperCase();
  const temTermoMeio = TERMOS_SERVICO_MEIO.some((termo) => texto.includes(termo));
  const temSinalArtistico =
    /APRESENTA|ART[IÍ]STIC|SHOW|CACH[ÊE]|BANDA|CANTOR|ORQUESTRA|TRIO|DJ\b/.test(
      texto
    );

  return temTermoMeio && !temSinalArtistico;
};
