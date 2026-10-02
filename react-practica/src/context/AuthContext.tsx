import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

export interface Usuario {
  nombre: string;
  email: string;
}

export interface AuthContextType {
  usuario: Usuario | null;
  setUsuario: Dispatch<SetStateAction<Usuario | null>>;
}

// El contexto se exporta para que las páginas puedan consumirlo con useContext.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}