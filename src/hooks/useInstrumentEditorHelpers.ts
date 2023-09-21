import { useState } from "react";
import { InstrumentSchema, InstrumentButtonSchema } from "@/types";
import { useInstrumentSchemasStore } from "@/stores/InstrumentsSchemasStore";

export const useInstrumentSchemaEditor = (
  instrumentSchema: instrumentSchema
) => {
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

  return {
    createButton,
    updateButton,
    deleteButton,
  };
};
