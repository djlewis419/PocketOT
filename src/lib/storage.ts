// src/lib/storage.ts — baseline: clients + observations (mood/note) + flags
export type AssessmentResponses = {
    [pillarId: number]: { rating: number; answers: Record<string, string> };
  };
  
  export type ClientRecord = {
    id: string;
    name?: string;
    dateISO: string;
    responses: AssessmentResponses;
    priorities: number[];
  };
  
  export type Observation = {
    id: string;
    dateISO: string;
    text: string;
    mood: number;
    flagged?: boolean;
  };
  
  const CLIENTS_KEY = 'clients';
  const obsKey = (clientId: string) => `obs:${clientId}`;
  
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
  
  /* Clients */
  export function getAllClients(): Record<string, ClientRecord> {
    return readJSON<Record<string, ClientRecord>>(CLIENTS_KEY, {});
  }
  export function getClient(id: string): ClientRecord | undefined {
    return getAllClients()[id];
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
    localStorage.removeItem(obsKey(id));
  }
  export function clearAll() {
    localStorage.removeItem(CLIENTS_KEY);
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith('obs:')) localStorage.removeItem(k);
    });
  }
  
  /* Observations */
  export function getObservations(clientId: string): Observation[] {
    const list = readJSON<Observation[]>(obsKey(clientId), []);
    return list.map((o) => ({
      id: String(o.id),
      dateISO: String(o.dateISO),
      text: String(o.text ?? ''),
      mood: Number.isFinite(o.mood) ? Number(o.mood) : 0,
      flagged: Boolean(o.flagged),
    }));
  }
  export function addObservation(clientId: string, obs: Observation) {
    const list = getObservations(clientId);
    list.push({
      ...obs,
      id: obs.id || `obs-${Date.now()}`,
      dateISO: obs.dateISO || new Date().toISOString(),
      text: String(obs.text ?? ''),
      mood: Number.isFinite(obs.mood) ? Number(obs.mood) : 0,
      flagged: Boolean(obs.flagged),
    });
    list.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
    writeJSON(obsKey(clientId), list);
  }
  export function setObservationFlag(clientId: string, obsId: string, flagged: boolean) {
    const list = getObservations(clientId);
    const i = list.findIndex((o) => o.id === obsId);
    if (i >= 0) {
      list[i] = { ...list[i], flagged };
      writeJSON(obsKey(clientId), list);
    }
  }
  
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