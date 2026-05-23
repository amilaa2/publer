export function useDemoMode() {
  return import.meta.env.VITE_DEMO_MODE !== 'false';
}

export async function withDemoDelay(data, ms = 400) {
  await new Promise((r) => setTimeout(r, ms));
  return data;
}
