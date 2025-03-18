import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSelectProps {
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  defaultOption: string;
  label?: string;
}

export function FilterSelect({
  placeholder,
  value,
  onValueChange,
  options,
  defaultOption,
  label,
}: FilterSelectProps) {
  const handleValueChange = (newValue: string) => {
    if (newValue === defaultOption) {
      onValueChange(defaultOption);
    } else {
      const currentValues = value ? value.split(",") : [];
      if (currentValues.includes(defaultOption)) {
        onValueChange(newValue);
      } else {
        const newValues = currentValues.includes(newValue)
          ? currentValues.filter((v) => v !== newValue)
          : [...new Set([...currentValues, newValue])]; // Use Set to prevent duplicates
        onValueChange(newValues.length === 0 ? defaultOption : newValues.join(","));
      }
    }
  };

  const selectedValues = value.split(",");
  const displayValue = selectedValues.includes(defaultOption) 
    ? placeholder 
    : [...new Set(selectedValues)].map(v => {
        const option = options.find(opt => opt.value === v);
        return option ? option.label : v;
      }).join(", ");

  return (
    <div className={label ? "space-y-2" : ""}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            {displayValue}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={defaultOption}>{placeholder}</SelectItem>
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className={selectedValues.includes(option.value) ? "bg-accent text-accent-foreground" : ""}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}