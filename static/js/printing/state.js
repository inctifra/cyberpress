const STORAGE_KEY = "cyberprint_req_state";

export function getState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : {
    currentStep: 1,
    cafeId: null
  };
}

export function setState(newState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  window.reqState = newState;
}

export function updateState(partial) {
  const current = getState();
  const updated = { ...current, ...partial };
  setState(updated);
  return updated;
}