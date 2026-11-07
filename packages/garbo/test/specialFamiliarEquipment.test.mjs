import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import * as policy from "../src/outfit/specialFamiliarEquipmentPlan.ts";

const plan = policy.specialFamiliarEquipmentPlan;

test("underwater Jill needs das boot, not LED candle", () => {
  assert.deepEqual(plan(true, true), { equip: false, configure: false });
});

test("on land, Jill keeps her LED candle and ultraviolet mode", () => {
  assert.deepEqual(plan(true, false), { equip: true, configure: true });
});

test("independent underwater breathing permits the LED candle", () => {
  assert.deepEqual(plan(true, false), { equip: true, configure: true });
});

test("gearless special familiars retain their configuration", () => {
  assert.deepEqual(plan(false, true), { equip: false, configure: true });
});

test("barf outfit uses the underwater breathing slot policy", () => {
  const source = readFileSync(
    fileURLToPath(new URL("../src/outfit/barf.ts", import.meta.url)),
    "utf8",
  );
  assert.match(source, /specialFamiliarEquipmentPlan\(/);
  assert.match(source, /familiarSlotNeededForBreathing\(/);
  assert.match(source, /if \(applySpecialEquipment/);
  assert.match(source, /if \(applySpecialConfiguration/);
});
