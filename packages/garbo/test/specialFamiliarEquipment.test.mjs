import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  specialFamiliarEquipmentPlan,
} from "../src/outfit/specialFamiliarEquipmentPlan.ts";

// Regression: In the Coral Corral, Jill without independent underwater
// breathing requires das boot. Forcing the LED candle prevents +sea.
test(
  "underwater Jill: reserve the familiar slot for das boot instead of LED candle",
  () => {
    assert.deepEqual(specialFamiliarEquipmentPlan(true, true), {
      equip: false,
      configure: false,
    });
  },
);

test("ordinary farming: keep Jill's LED candle and ultraviolet mode", () => {
  assert.deepEqual(specialFamiliarEquipmentPlan(true, false), {
    equip: true,
    configure: true,
  });
});

test("independent underwater breathing: retain LED candle", () => {
  // Driving Waterproofly or a naturally underwater familiar.
  assert.deepEqual(specialFamiliarEquipmentPlan(true, false), {
    equip: true,
    configure: true,
  });
});

test("a familiar without special gear retains its configuration hook", () => {
  // Chest Mimic configures Familiar Experience without required equipment.
  assert.deepEqual(specialFamiliarEquipmentPlan(false, true), {
    equip: false,
    configure: true,
  });
});

test("barf outfit builder uses the actual breathing-slot predicate", () => {
  const source = readFileSync(
    fileURLToPath(new URL("../src/outfit/barf.ts", import.meta.url)),
    "utf8",
  );
  assert.match(
    source,
    /specialFamiliarEquipmentPlan\(\s*Boolean\(specialFamiliar\?\.equip\),\s*familiarSlotNeededForBreathing\(FarmingStrategy\.location, spec\.familiar\),\s*\)/,
  );
  assert.match(
    source,
    /if \(applySpecialEquipment && specialFamiliar\?\.equip\)/,
  );
  assert.match(source, /if \(applySpecialConfiguration\)/);
});
