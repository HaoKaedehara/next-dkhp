"use client";

import { useSyncExternalStore } from "react";

// Mobile open/close state (temporary drawer)
let _open = false;
// Desktop collapsed state (mini variant for permanent drawer)
let _collapsed = false;

// Cache the snapshot object to keep referential equality when state hasn't changed
type Snapshot = { open: boolean; collapsed: boolean };
let _snapshot: Snapshot = { open: _open, collapsed: _collapsed };

// Cache the server snapshot to prevent infinite loops
const _serverSnapshot: Snapshot = { open: false, collapsed: false };

const listeners = new Set<() => void>();

function updateSnapshot() {
    // Only replace object if values changed to preserve referential stability
    const next: Snapshot = { open: _open, collapsed: _collapsed };
    if (next.open !== _snapshot.open || next.collapsed !== _snapshot.collapsed) {
        _snapshot = next;
    }
}

function notify() {
    updateSnapshot();
    listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
}

function getSnapshot() {
    // Return the cached object so React can bail out if unchanged
    return _snapshot;
}

// Server-side snapshot - always returns cached initial state to prevent hydration mismatches and infinite loops
function getServerSnapshot() {
    return _serverSnapshot;
}

function toggle() { _open = !_open; notify(); }
function close() { _open = false; notify(); }
function toggleCollapsed() { _collapsed = !_collapsed; notify(); }
function expand() { _collapsed = false; notify(); }
function collapse() { _collapsed = true; notify(); }

type SidebarState = {
    open: boolean;
    collapsed: boolean;
    toggle: () => void; // mobile
    close: () => void; // mobile
    toggleCollapsed: () => void; // desktop
    expand: () => void;
    collapse: () => void;
};

export function useSidebarStore<T>(selector: (s: SidebarState) => T) {
    const { open, collapsed } = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot // This ensures server/client consistency during hydration
    );
    return selector({ open, collapsed, toggle, close, toggleCollapsed, expand, collapse });
}
