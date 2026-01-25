import React from "react";

export type Role = "admin" | "manager" | "user";

interface RoleDropdownProps {
  value: Role ;
  onChange: (value: Role) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLSelectElement>) => void;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Role)}
      onKeyDown={onKeyDown}
      className="inputField"
    >
      <option value="">Select role</option>
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="user">User</option>
    </select>
  );
};

export default RoleDropdown;
