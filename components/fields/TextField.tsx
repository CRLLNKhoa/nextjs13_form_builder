"use client";
import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementIstance } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "Value here...",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = FormElementIstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementIstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {element.extraAttributes.label}
        {element.extraAttributes.required && "*"}
      </Label>
      <Input readOnly disabled placeholder={element.extraAttributes.placeHolder} />
      {element.extraAttributes.helperText && (<p className="text-muted-foreground text-[0.8rem]">{element.extraAttributes.helperText}</p>)}
    </div>
  );
}