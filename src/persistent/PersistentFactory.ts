import { LocalPersistent } from "./LocalPersistent";
import { PersistentBase } from "./PersistentBase";
import { ProPersistent } from "./ProPersistent";

/**
 * We can have many persistent approaches
 * - Local storage
 * - Call to API
 * - ...
 */
export const Persistent: PersistentBase = process.env.REACT_APP_NODE_ENV==='development' ? new LocalPersistent() : new ProPersistent();
