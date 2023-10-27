import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField"

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementIstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };

    designerComponent: React.FC<{
        elementInstance: FormElementIstance
    }>;
    formComponent: React.FC;
    propertiesComponent: React.FC;
}

export type FormElementIstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>
}

type FormElementsType = {
    [key in ElementsType]: FormElement
}

export const FormElements = {
    TextField: TextFieldFormElement,
};