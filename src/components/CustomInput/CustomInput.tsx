import {FormGroup, Input, Label} from "reactstrap";
import React from "react";
import {InputType} from "reactstrap/types/lib/Input"

const CustomInput = ({label, placeholder, value, setValue, disabled, required=true, error=false, valid=false, type="string", className="w-100",min}) => {
    return (
        <FormGroup>
            <Label>{label}</Label>
            <Input
                placeholder={placeholder}
                className={className}
                type={type as InputType}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                invalid={error}
                disabled={disabled}
                required={required}
                valid={valid}
                min={min}
            />
        </FormGroup>
    );
};

export default CustomInput