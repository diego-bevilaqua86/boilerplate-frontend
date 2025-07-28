import { forwardRef } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';

type BaseTextInputProps = TextInputProps & {
  error?: string;
};

type GenericTextInputProps = BaseTextInputProps;

type HookFormTextInputProps = BaseTextInputProps &
  Partial<UseControllerProps> & {
    name: string;
  };

const BaseTextInput = forwardRef<HTMLInputElement, BaseTextInputProps>(
  ({ error, ...props }, ref) => {
    return <TextInput ref={ref} error={error} {...props} />;
  }
);

// Alteração: agora os dois TextInputs são exportados com ref. preservada
// Alteração: adicionado erro caso control não seja repassado ao HookFormTextInput

export const GenericTextInput = forwardRef<HTMLInputElement, GenericTextInputProps>(
  (props, ref) => {
    return <BaseTextInput {...props} ref={ref} />;
  }
);

export const HookFormTextInput = forwardRef<HTMLInputElement, HookFormTextInputProps>(
  ({ name, control, defaultValue, rules, ...rest }, ref) => {
    const formContext = useFormContext();

    if (!control && !formContext) {
      console.error(
        'HookFormTextInput: Deve fornecer control ou usar dentro de FormProvider'
      );
      return <BaseTextInput error="Erro de configuração" {...rest} ref={ref} />;
    }

    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control: control || formContext?.control,
      defaultValue,
      rules,
    });

    return <BaseTextInput {...field} error={error?.message} {...rest} ref={ref} />;
  }
);