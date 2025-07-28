import { MantineProvider } from '@mantine/core';
import { FC } from 'react';
import { theme } from './theme';
import { useForm } from 'react-hook-form';
import { HookFormTextInput, GenericTextInput } from '../src/ui/atoms/TestTextInput/TestTextInput';

export const App: FC<unknown> = () => {
  const { control } = useForm();

  return (
    <MantineProvider theme={theme} key="teste">
      Is it better now?
      
      {/* Versão sem react-hook-form */}
      <GenericTextInput />
      
      {/* Versão com react-hook-form, passando control */}
      <HookFormTextInput 
        name="teste" 
        control={control}
      />
    </MantineProvider>
  );
};