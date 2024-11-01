export const nameRules = [
  { required: true, message: 'Введите название!', type: "string" },
  { warningOnly: true, message: 'Название слишком длинное!', max: 40 },
];

export const emailRules = [
  { required: true, message: 'Введите email!', type: "email" },
];

export const descriptionRules = [
  { required: true, message: 'Введите описание!', type: "string" },
  { warningOnly: true, message: 'Описание слишком длинное!', max: 250 },
];

export const durationRules = [
  { required: true, message: 'Введите длительность!', type: "number", max: 60 },
];

export const numberRules = [
  { required: true, message: 'Введите число!', type: "number" },
];