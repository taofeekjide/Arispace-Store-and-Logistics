import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function Form({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInput(control) {
    const value = formData[control.name] || "";

    switch (control.componentType) {
      case "input":
        return (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-700 bg-zinc-800 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500"
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(val) =>
              setFormData({ ...formData, [control.name]: val })
            }
            value={value}
          >
            <SelectTrigger className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 text-white focus:border-yellow-500 focus:ring-yellow-500">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control?.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={control.name}
            placeholder={control.placeholder}
            id={control.id}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-700 bg-zinc-800 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500"
          />
        );

      default:
        return (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-700 bg-zinc-800 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500"
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-4">
        {formControls.map((control) => (
          <div key={control.name} className="space-y-1">
            <Label
              htmlFor={control.name}
              className="block text-sm font-medium text-yellow-500"
            >
              {control.label}
            </Label>
            {renderInput(control)}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="w-full mt-4 bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 transition"
        disabled={isBtnDisabled}
      >
        {buttonText ? buttonText : "Submit"}
      </Button>
    </form>
  );
}
