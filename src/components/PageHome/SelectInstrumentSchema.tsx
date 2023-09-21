import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useActiveInstrumentSchema } from "@/hooks/useActiveInstrumentSchema";
import { useInstrumentSchemas } from "@/hooks/useInstrumentSchemas";
import { useInstumentSchemaContext } from "@/hooks/useInstrumentSchemaContext";

export const SelectInstrumentSchema = () => {
  const { schema: selectedSchema, setSchema: setSelectedSchema } =
    useInstumentSchemaContext();

  const {
    customInstrumentSchemas,
    systemInstrumentSchemas,
    instrumentSchemas,
  } = useInstrumentSchemas();

  return (
    <Select
      value={selectedSchema?.id}
      onChange={(e) => {
        //change active instrument
        e.preventDefault();
        const id = e.target.value;
        const instrumentSchema = instrumentSchemas.find(
          (instrumentSchema) => instrumentSchema.id === id
        );
        if (!instrumentSchema) return;
        setSelectedSchema(instrumentSchema);
      }}
    >
      {systemInstrumentSchemas.map((instrumentSchema) => {
        return (
          <option key={instrumentSchema.id} value={instrumentSchema.id}>
            {instrumentSchema.name}
          </option>
        );
      })}

      {customInstrumentSchemas.length > 0 && (
        <optgroup label="Custom Instruments">
          {customInstrumentSchemas.map((instrumentSchema) => {
            return (
              <option key={instrumentSchema.id} value={instrumentSchema.id}>
                {instrumentSchema.name}
              </option>
            );
          })}
        </optgroup>
      )}
    </Select>
  );
};
