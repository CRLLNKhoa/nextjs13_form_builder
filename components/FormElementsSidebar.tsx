import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";

function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Kéo và thả các thành phần</p>
      <Separator className="my-2"/>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-2 md:col-span-2 my-2 place-self-start">Thành phần bố cục</p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <p className="text-sm text-muted-foreground col-span-2 md:col-span-2 my-2 place-self-start">Thành phần biểu mẫu</p>     
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
      </div>
    </div>
  );
}

export default FormElementsSidebar;
