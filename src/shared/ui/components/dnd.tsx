import { createContext, useContext, useState, type ReactNode } from 'react';

const createDnDContext = <T,>() => {
  const Context = createContext<{
    grabbed: T | null;
    onDrag: (grabbed: T) => void;
    onDrop: (target: T) => void;
  } | null>(null);
  Context.displayName = 'DnDContext';
  return Context;
};

export const createDnDBoardComponents = <T,>() => {
  const DndContext = createDnDContext<T>();

  const DnDPanel = (props: {
    children: ReactNode;
    onDrag?: (grabbed: T) => void;
    onDrop?: (origin: T, target: T) => void;
  }) => {
    const { children, onDrop, onDrag } = props;
    const [grabbed, setGrabItem] = useState<T | null>(null);

    const handleDrag = (grabbed: T) => {
      setGrabItem(grabbed);
      onDrag?.(grabbed);
    };

    const handleDrop = (target: T) => {
      setGrabItem(null);

      if (!grabbed) return;
      onDrop?.(grabbed, target);
    };

    return (
      <DndContext.Provider
        value={{
          grabbed,
          onDrag: handleDrag,
          onDrop: handleDrop,
        }}
      >
        {children}
      </DndContext.Provider>
    );
  };

  return {
    DnDPanel,
    useDnDContext: () => {
      const context = useContext(DndContext);
      if (!context) {
        throw new Error(
          'useDnDContext must be used within DnDContext.Provider',
        );
      }

      return context;
    },
  };
};
