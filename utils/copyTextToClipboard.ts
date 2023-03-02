export const copyText = async (text: string): Promise<boolean> => {
  let success = false;

  const incorrectRuntime =
    typeof window === 'undefined' || typeof navigator.clipboard === 'undefined';

  if (incorrectRuntime) {
    console.error('copyText only works in browser!');
    return success;
  }

  await navigator.clipboard
    .writeText(text)
    .then(() => (success = true))
    .catch((err: any) => console.error(err?.message ?? err));

  return success;
};

export default copyText;
