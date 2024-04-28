import { useUserStore } from '@/store/store.ts'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'sonner'
import { User } from '@/domain/user'

export interface LoggedOutletContext {
  user: User
}

export const LoggedRoute = () => {
  const user = useUserStore((state) => state.user)

  if (!user) {
    toast.error('Accès interdit', {
      description: 'Vous devez être connecté pour accéder à cette page.',
    })
    return <Navigate to="/" />
  }

  return <Outlet context={{ user }} />
}