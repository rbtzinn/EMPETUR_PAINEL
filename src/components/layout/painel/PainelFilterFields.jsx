import React from "react";
import DropdownPesquisavel from "../../ui/DropdownPesquisavel";

export default function PainelFilterFields({
  fields,
  filtros,
  setFiltros,
  getOpcoes,
  className = "",
}) {
  return (
    <div className={className}>
      {Object.entries(fields).map(([field, label]) => (
        <DropdownPesquisavel
          key={field}
          label={label}
          value={filtros[field]}
          onChange={(value) =>
            setFiltros((current) => ({ ...current, [field]: value }))
          }
          options={getOpcoes(field)}
        />
      ))}
    </div>
  );
}
