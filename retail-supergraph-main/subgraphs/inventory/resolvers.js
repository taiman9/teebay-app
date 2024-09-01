import { INVENTORY } from "./data.js";

export const resolvers = {
  Variant: {
    inventory: (v) => {
      const inv = INVENTORY.find((i) => i.id === v.id);

      if (!inv) return null;

      return {
        inStock: inv.inventory > 0,
        inventory: inv.inventory,
      };
    },
  },
};
