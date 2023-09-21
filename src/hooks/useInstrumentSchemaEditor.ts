import { useState } from "react";
import { InstrumentSchema, InstrumentButtonSchema } from "@/types";
import { useInstrumentSchemasStore } from "@/stores/InstrumentsSchemasStore";

export const useInstrumentSchemaEditor = (instrumentSchemaId?: string) => {
  const instrumentSchemas = useInstrumentSchemasStore(
    (state) => state.instrumentSchemas
  );
  const [instrumentSchema, setInstrumentSchema] = useState<InstrumentSchema>(
    instrumentSchemas.find((i) => i.id === instrumentSchemaId) || {
      id: Math.random().toString(36).replace("0.", ""),
      name: "New InstrumentSchema",
      buttons: [],
    }
  );

  const [selectedButtonId, setSelectedButtonId] = useState<
    string | null | undefined
  >(null);

  const selectedButton = instrumentSchema.buttons.find(
    (b) => b.id === selectedButtonId
  );

  const update = (key: string, value: any) => {
    setInstrumentSchema({
      ...instrumentSchema,
      [key]: value,
    });
  };

  const createButton = () => {
    const id = Math.random().toString(36).replace("0.", "");

    const y =
      instrumentSchema.buttons.length === 0
        ? 0
        : instrumentSchema.buttons.reduce((acc, curr) => {
            return curr.y > acc ? curr.y : acc;
          }, 0) + 4;

    setInstrumentSchema({
      ...instrumentSchema,
      buttons: [
        ...instrumentSchema.buttons,
        {
          id,
          x: 0,
          y,
          shape: "full",
          label: "",
          note: "",
          shortcut: "",
        },
      ],
    });

    setSelectedButtonById(id);
  };

  const updateButton = (button: InstrumentButtonSchema) => {
    setInstrumentSchema({
      ...instrumentSchema,
      buttons: instrumentSchema.buttons.map((b) => {
        if (b.id === button.id) {
          return button;
        }
        return b;
      }),
    });
  };

  const deleteButton = (button: InstrumentButtonSchema) => {
    setInstrumentSchema({
      ...instrumentSchema,
      buttons: instrumentSchema.buttons.filter((b) => b.id !== button.id),
    });
  };

  const setSelectedButtonById = (id: string) => {
    setSelectedButtonId(id);
  };

  const setSelectedButton = (
    button: InstrumentButtonSchema | null | undefined
  ) => {
    setSelectedButtonId(button?.id);
  };

  return {
    instrumentSchema,
    update,
    createButton,
    updateButton,
    deleteButton,
    setSelectedButton,
    setSelectedButtonById,
    selectedButton,
  };
};
