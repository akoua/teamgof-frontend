import MOTIVATION_TYPES from "~/constants/motivationTypes";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getMotivationValue: (key: string) => MOTIVATION_TYPES[key],
      getMotivationKey: (value: string) =>
        Object.keys(MOTIVATION_TYPES).find(
          (k) => MOTIVATION_TYPES[k] === value
        ),
    },
  };
});
