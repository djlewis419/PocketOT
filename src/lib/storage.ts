// src/lib/storage.ts

/** ---------- Types ---------- */
export type AssessmentResponses = {
    [pillarId: number]: { rating: number; answers: Record<string, string> };
  };
  
  export type ClientRecord = {
    id: string;
    name?: string;
    dateISO: string;               // last assessment date
    responses: AssessmentResponses;
    priorities: number[];
  };
  
  export type Observation = {
    id: string;
    dateISO: string;
    text: string;
    mood: number;                  // 0–10
    areas: string[];               // tags the client selected
    flagged?: boolean;             // therapist flag
  };
  
  /** ---------- Keys ---------- */
  const CLIENTS_KEY = 'clients';        // map: id -> ClientRecord
  const OBS_INDEX_KEY = 'obs:index';    // optional future use
  
  /** ---------- Safe JSON helpers ---------- */
  function readJSON<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }
  function writeJSON<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }
  
  /** ---------- Client CRUD ---------- */
  export function getAllClients(): Record<string, ClientRecord> {
    return readJSON<Record<string, ClientRecord>>(CLIENTS_KEY, {});
  }
  
  export function getClient(id: string): ClientRecord | undefined {
    const all = getAllClients();
    return all[id];
  }
  
  export function saveClient(record: ClientRecord) {
    const all = getAllClients();
    all[record.id] = record;
    writeJSON(CLIENTS_KEY, all);
  }
  
  export function deleteClient(id: string) {
    const all = getAllClients();
    delete all[id];
    writeJSON(CLIENTS_KEY, all);
    // also remove observations for that client
    localStorage.removeItem(obsKey(id));
  }
  
  export function clearAll() {
    // be surgical, don’t nuke everything by default
    localStorage.removeItem(CLIENTS_KEY);
    // remove all obs:* keys
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith('obs:')) localStorage.removeItem(k);
    });
  }
  
  /** ---------- Observation storage ---------- */
  function obsKey(clientId: string) {
    return `obs:${clientId}`;
  }
  
  export function getObservations(clientId: string): Observation[] {
    return readJSON<Observation[]>(obsKey(clientId), []);
  }
  
  export function addObservation(clientId: string, obs: Observation) {
    const list = getObservations(clientId);
    list.push(obs);
    // newest at top when reading
    list.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
    writeJSON(obsKey(clientId), list);
  }
  
  export function setObservationFlag(clientId: string, obsId: string, flagged: boolean) {
    const list = getObservations(clientId);
    const idx = list.findIndex((o) => o.id === obsId);
    if (idx >= 0) {
      list[idx] = { ...list[idx], flagged };
      writeJSON(obsKey(clientId), list);
    }
  }

  // Default export for convenience
  export default {
    getAllClients,
    getClient,
    saveClient,
    deleteClient,
    clearAll,
    getObservations,
    addObservation,
    setObservationFlag,
  };