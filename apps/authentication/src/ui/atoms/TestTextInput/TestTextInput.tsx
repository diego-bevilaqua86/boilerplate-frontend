import { forwardRef } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';

type BaseTextInputProps = TextInputProps & {
  error?: string;
};

type ControlledTextInputProps = BaseTextInputProps & {
  reactHookForm?: false;
};

type HookFormTextInputProps = BaseTextInputProps &
  Partial<UseControllerProps> & {
    reactHookForm: true;
    name: string;
  };

type TextInputComponentProps = ControlledTextInputProps | HookFormTextInputProps;

const BaseTextInput = forwardRef<HTMLInputElement, BaseTextInputProps>(
  ({ error, ...props }, ref) => {
    return <TextInput ref={ref} error={error} {...props} />;
  }
);

export const TestTextInput = (props: TextInputComponentProps) => {
  if (props.reactHookForm) {
    const { reactHookForm, name, control, defaultValue, rules, ...rest } = props;
    const formContext = useFormContext();
    
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control: control || formContext?.control,
      defaultValue,
      rules,
    });

    if (!control && !formContext) {
      console.error('TestTextInput: Quando reactHookForm=true, você deve fornecer control ou usar dentro de FormProvider');
      return <BaseTextInput error="Erro de configuração" {...rest} />;
    }

    return <BaseTextInput {...field} error={error?.message} {...rest} />;
  }

  return <BaseTextInput {...props} />;
};