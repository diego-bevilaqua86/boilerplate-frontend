import { MantineProvider } from '@mantine/core';
import { FC } from 'react';
import { theme } from './theme';
import { TestTextInput } from './ui/atoms/TestTextInput/TestTextInput';
import { useForm } from 'react-hook-form';

export const App: FC<unknown> = () => {
  const { control } = useForm();

  return (
    <MantineProvider theme={theme} key="teste">
      Is it better now?
      
      {/* Versão sem react-hook-form */}
      <TestTextInput />
      
      {/* Versão com react-hook-form, passando control */}
      <TestTextInput 
        reactHookForm 
        name="teste" 
        control={control}
      />
    </MantineProvider>
  );
};