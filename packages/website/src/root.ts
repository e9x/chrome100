// define temp variables to force the flow to update for throwing

const tempRoot = document.getElementById("root");
if (!tempRoot) throw new Error("Cannot find root");

const tempHead = document.getElementById("head");
if (!tempHead) throw new Error("Cannot find head");

export const root = tempRoot;
export const head = tempHead;
