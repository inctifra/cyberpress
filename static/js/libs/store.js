// cyberconnect-store.js
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';


const store = createStore(devtools((set, get) => ({
    // ─── State ───
    files: [],
    activeFilter: 'all',
    isUploading: false,
    uploadProgress: {},
    selectedFiles: new Set(),

    // ─── Actions ───

    setFilter: (filter) => {
        set({ activeFilter: filter });
    },

    setFiles: (files) => {
        set({ files: [...files] });
    },

    // ─── Future stubs (ready to implement) ───
    addFile: (file) => set((state) => ({
        files: [file, ...state.files]
    })),

    removeFile: (id) => set((state) => ({
        files: state.files.filter(f => f.id !== id)
    })),

    updateFile: (id, updates) => set((state) => ({
        files: state.files.map(f => f.id === id ? { ...f, ...updates } : f)
    })),

    setUploadProgress: (id, progress) => set((state) => ({
        uploadProgress: { ...state.uploadProgress, [id]: progress }
    })),

    setUploading: (bool) => set({ isUploading: bool }),

    toggleSelect: (id) => set((state) => {
        const newSet = new Set(state.selectedFiles);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        return { selectedFiles: newSet };
    }),

    clearSelection: () => set({ selectedFiles: new Set() })
}), {name: 'CyberConnectStore'}));

// ─── Wrap Zustand for global access ───

class CyberConnectStore {
    constructor(zustandStore) {
        this._store = zustandStore;
    }

    // Proxy all Zustand methods
    getState() {
        return this._store.getState();
    }

    setState(partial) {
        this._store.setState(partial);
    }

    subscribe(callback) {
        return this._store.subscribe(callback);
    }

    // ─── Convenience methods matching your actions ───
    setFilter(filter) {
        this.getState().setFilter(filter);
    }

    setFiles(files) {
        this.getState().setFiles(files);
    }

    addFile(file) {
        this.getState().addFile(file);
    }

    removeFile(id) {
        this.getState().removeFile(id);
    }

    updateFile(id, updates) {
        this.getState().updateFile(id, updates);
    }

    setUploadProgress(id, progress) {
        this.getState().setUploadProgress(id, progress);
    }

    setUploading(bool) {
        this.getState().setUploading(bool);
    }

    toggleSelect(id) {
        this.getState().toggleSelect(id);
    }

    clearSelection() {
        this.getState().clearSelection();
    }
}

const cyberConnectStore = new CyberConnectStore(store);
window.CyberConnectStore = cyberConnectStore;

export default cyberConnectStore;