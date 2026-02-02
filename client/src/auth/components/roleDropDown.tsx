import React from "react";
import { FaChevronDown } from "react-icons/fa";

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
    <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Role)}
      onKeyDown={onKeyDown}
      className="inputField pr-10 appearance-none"
    >
      <option value="" disabled>Select role</option>
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="user">User</option>
    </select>
    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500 text-sm">
          <FaChevronDown />
        </span>

        </div>
  );
};

export default RoleDropdown;
