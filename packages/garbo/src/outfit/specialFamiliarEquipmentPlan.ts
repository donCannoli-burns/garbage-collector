/**
 * Special familiar gear must not occupy the familiar slot when that slot is
 * required for underwater breathing. Its gear-specific mode must also be
 * omitted; unrelated familiar configuration (e.g. Chest Mimic) is preserved.
 */
export function specialFamiliarEquipmentPlan(
  hasSpecialEquipment: boolean,
  needsFamiliarBreathingEquipment: boolean,
): { equip: boolean; configure: boolean } {
  const equip = hasSpecialEquipment && !needsFamiliarBreathingEquipment;
  return { equip, configure: !hasSpecialEquipment || equip };
}
