import { createContext, useContext, type ReactNode } from 'react';
import {
  useForm,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from 'react-hook-form';

// 1. Context 타입 정의
type FormContextType<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
};

// 2. Context 생성 함수
function createFormContext<TFieldValues extends FieldValues>() {
  const Context = createContext<FormContextType<TFieldValues> | null>(null);
  Context.displayName = 'FormContext';
  return Context;
}

// 3. 컴포넌트 팩토리 함수
function createFormComponents<TFieldValues extends FieldValues>() {
  const FormContext = createFormContext<TFieldValues>();

  // Form 컴포넌트
  const FormComponent = ({
    children,
    ...formProps
  }: {
    children: ReactNode;
  } & Parameters<typeof useForm<TFieldValues>>[0]) => {
    const form = useForm<TFieldValues>(formProps);

    return (
      <FormContext.Provider value={{ form }}>{children}</FormContext.Provider>
    );
  };

  // Field 컴포넌트
  const FieldComponent = ({
    name,
    label,
    ...props
  }: {
    name: Path<TFieldValues>;
    label?: string;
  }) => {
    const { form } = useContext(FormContext)!;
    const {
      register,
      formState: { errors },
    } = form;
    const error = errors[name];

    return (
      <div>
        {label && <label>{label}</label>}
        <input {...register(name)} {...props} />
        {error && <span>{String(error.message)}</span>}
      </div>
    );
  };

  // Submit 컴포넌트
  const SubmitComponent = (props: {
    children: ReactNode;
    onClick: (value: TFieldValues) => void;
  }) => {
    const { children, onClick } = props;

    const { form } = useContext(FormContext)!;
    const { handleSubmit, formState } = form;

    return (
      <button onClick={handleSubmit(onClick)} disabled={!formState.isValid}>
        {children}
      </button>
    );
  };

  const Form = Object.assign(FormComponent, {
    Field: FieldComponent,
    Submit: SubmitComponent,
  });

  return {
    Form,
    useFormContext: () => {
      const context = useContext(FormContext);
      if (!context) {
        throw new Error(
          'useFormContext must be used within FormContext.Provider',
        );
      }
      return context.form;
    },
  };
}

export default createFormComponents;
