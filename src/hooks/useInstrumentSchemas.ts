import { instrumentSchemas as systemInstrumentSchemas } from "@/config/systemInstrumentSchemas";
import { useInstrumentSchemasStore } from "@/stores/InstrumentsSchemasStore";
import { InstrumentSchema } from "@/types";

export const useInstrumentSchemas = () => {
  const customInstrumentSchemas = useInstrumentSchemasStore(
    (state) => state.instrumentSchemas
  );

  const isSystemInstrumentSchema = (instrumentSchema: InstrumentSchema) => {
    return systemInstrumentSchemas.find((i) => i.id === instrumentSchema.id);
  };

  return {
    instrumentSchemas: [...systemInstrumentSchemas, ...customInstrumentSchemas],
    customInstrumentSchemas,
    systemInstrumentSchemas,
    isSystemInstrumentSchema,
    defaultInstrumentSchema: systemInstrumentSchemas[0],
  };
};
