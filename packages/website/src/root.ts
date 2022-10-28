const tempRoot = document.getElementById("root");
if (!tempRoot) throw new Error("Cannot find root");
// force our above check to affect the flow
const root = tempRoot;
export { root };
