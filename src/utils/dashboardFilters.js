import { BLOCKED_CYCLE_TERMS, FILTER_FIELDS } from "../constants/dashboard";

const localeCompare = (left, right) =>
  String(left).localeCompare(String(right), "pt-BR", { sensitivity: "base" });

export const isDisplayableCulturalRow = (item) => {
  const cycle = String(item?.ciclo || "").toLowerCase();
  return !BLOCKED_CYCLE_TERMS.some((term) => cycle.includes(term));
};

const getMunicipioValue = (item, useNormalizedMunicipio) =>
  useNormalizedMunicipio ? item.municipioNormalizado : item.municipio;

const matchesField = ({
  item,
  field,
  filterValue,
  allowMacroCycle,
  useNormalizedMunicipio,
}) => {
  if (!filterValue) return true;

  if (field === "municipio") {
    return getMunicipioValue(item, useNormalizedMunicipio) === filterValue;
  }

  if (field === "ciclo" && allowMacroCycle) {
    return item.ciclo === filterValue || item.cicloMacro === filterValue;
  }

  return item[field] === filterValue;
};

export const filterRows = (
  data,
  filters,
  {
    allowMacroCycle = false,
    useNormalizedMunicipio = false,
    excludeBlockedTerms = false,
  } = {}
) =>
  data.filter((item) => {
    if (excludeBlockedTerms && !isDisplayableCulturalRow(item)) {
      return false;
    }

    return FILTER_FIELDS.every((field) =>
      matchesField({
        item,
        field,
        filterValue: filters[field],
        allowMacroCycle,
        useNormalizedMunicipio,
      })
    );
  });

export const buildFilterOptions = (
  data,
  filters,
  {
    allowMacroCycle = false,
    useNormalizedMunicipio = false,
    excludeBlockedTerms = false,
  } = {}
) =>
  FILTER_FIELDS.reduce((options, currentField) => {
    const rows = data.filter((item) => {
      if (excludeBlockedTerms && !isDisplayableCulturalRow(item)) {
        return false;
      }

      return FILTER_FIELDS.every((field) => {
        if (field === currentField) return true;

        return matchesField({
          item,
          field,
          filterValue: filters[field],
          allowMacroCycle,
          useNormalizedMunicipio,
        });
      });
    });

    if (currentField === "municipio" && useNormalizedMunicipio) {
      const labelsByValue = new Map();

      rows.forEach((item) => {
        const value = item.municipioNormalizado;
        if (value && !labelsByValue.has(value)) {
          labelsByValue.set(value, item.municipio);
        }
      });

      options[currentField] = Array.from(labelsByValue.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((left, right) => localeCompare(left.label, right.label));

      return options;
    }

    options[currentField] = [...new Set(rows.map((item) => item[currentField]))]
      .filter(Boolean)
      .sort(localeCompare);

    return options;
  }, {});
