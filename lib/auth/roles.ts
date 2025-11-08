import { Role } from "@prisma/client";

export const ROLE_PRIORITY: Record<Role, number> = {
  [Role.LISTENER]: 0,
  [Role.CONTRIBUTOR]: 1,
  [Role.EDITOR]: 2,
  [Role.ADMIN]: 3,
};

export const ROLE_LABELS: Record<Role, string> = {
  [Role.LISTENER]: "Слушатель",
  [Role.CONTRIBUTOR]: "Контрибьютор",
  [Role.EDITOR]: "Редактор",
  [Role.ADMIN]: "Администратор",
};

export const DEFAULT_ROLE: Role = Role.LISTENER;

export function hasRole(required: Role | Role[], current: Role | null | undefined): boolean {
  if (!current) {
    return false;
  }

  const requiredRoles = Array.isArray(required) ? required : [required];
  return requiredRoles.includes(current);
}

export function hasAtLeastRole(minimum: Role, current: Role | null | undefined): boolean {
  if (!current) {
    return false;
  }

  return ROLE_PRIORITY[current] >= ROLE_PRIORITY[minimum];
}
