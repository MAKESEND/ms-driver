export enum LocalStorageKeys {
  FormInputs,
}

export type LocalStorageKeyList = {
  [key in LocalStorageKeys]: string;
};

export const localStorageKeyList = {
  [LocalStorageKeys.FormInputs]: 'form-inputs',
};
