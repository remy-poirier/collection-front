import { useEffect, useState } from "react"
import { useUserStore } from "./store/store"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuthStatus } from "./hooks/session/auth-status"
import { useSignout } from "./hooks/session/signout"
import { toast, Toaster } from 'sonner'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet"
import { Button } from "./components/ui/button"
import { Separator } from "./components/ui/separator"
import { MenuIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { ModeToggle } from "./components/mode-toggle"
import { userOperations } from "./operations/user"

function App() {

  const user = useUserStore((state) => state.user)
  const [showMobileSheet, setShowMobileSheet] = useState(false)
  const toggleShowMobileSheet = () => setShowMobileSheet(!showMobileSheet)

  const { signout } = useSignout()
  const { isLoading } = useAuthStatus()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (showMobileSheet) setShowMobileSheet(false)
  }, [location])

  const logout = async () => {
    signout().then(() => {
      navigate('/')
      toast.success('Déconnexion réussie')
    })
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement de l'application...</p>
      </div>
    )

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between max-w-screen-2xl">
          <div className="sm:block md:hidden">
          <Sheet open={showMobileSheet} onOpenChange={setShowMobileSheet}>
              <SheetTrigger asChild>
                <Button
                  onClick={toggleShowMobileSheet}
                  size="icon"
                  variant="outline"
                >
                  <MenuIcon size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                  {user ? (
                    <span>
                      Connecté(e) en tant que {user.fullName ?? user.email}
                      {user.isAdmin && ' (admin)'}
                    </span>
                  ) : (
                    <span>
                      Vous n&apos;êtes pas connecté(e). Connectez-vous pour
                      accéder aux fonctionnalités de l&apos;application.
                    </span>
                  )}
                </SheetDescription>
                <Separator className="my-4" />
                <nav>
                  <ul className="flex flex-col gap-4">
                    {user && (
                      <>
                        <li>
                          <Link to="/">
                            <Button className="w-full" variant="outline">
                              Accueil
                            </Button>
                          </Link>
                        </li>
                        <li>
                          <Link to="/app/dashboard">
                            <Button className="w-full" variant="outline">
                              Tableau de bord
                            </Button>
                          </Link>
                        </li>
                        <li>
                          <Link to="/app/collection">
                            <Button className="w-full" variant="outline">
                              Collection
                            </Button>
                          </Link>
                        </li>
                        {user.isAdmin && (
                          <>
                            <Separator />
                            <SheetDescription>Administration</SheetDescription>
                            <li>
                              <Link to="/app/admin/users">
                                <Button className="w-full" variant="outline">
                                  Utilisateurs
                                </Button>
                              </Link>
                            </li>
                          </>
                        )}
                        <li>
                          <Button
                            className="w-full"
                            variant="outline"
                            onClick={logout}
                          >
                            Déconnexion
                          </Button>
                        </li>
                      </>
                    )}

                    {!user && (
                      <>
                        <li>
                          <Link to="/signup">
                            <Button className="w-full" variant="outline">
                              Inscription
                            </Button>
                          </Link>
                        </li>
                        <li>
                          <Link to="/login">
                            <Button className="w-full" variant="outline">
                              Connexion
                            </Button>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Link to="/">
            <span className="sm:text-md md:text-xl font-bold">
              Mythica
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <>
                <Link to="/app/dashboard">
                  <Button variant="outline">Tableau de bord</Button>
                </Link>
                <Link to="/app/collection">
                  <Button variant="outline">Collection</Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer w-[2rem] h-[2rem]">
                      {user.avatarUrl && (
                        <AvatarImage
                          src={user.avatarUrl}
                          alt={user?.fullName ?? user.email}
                        />
                      )}
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {(user?.fullName ?? user.email).slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      Connecté(e) en tant que {user.fullName ?? user.email}{' '} <br />
                      <span className="text-xs font-normal">Pactole: {userOperations.getLastKnowTotalValue(user.totalValue)} €</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user.isAdmin && (
                      <>
                        <DropdownMenuLabel>Administration</DropdownMenuLabel>
                        <Link to="/app/admin/items">
                          <DropdownMenuItem className="cursor-pointer">
                            Objets
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={logout}
                    >
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {!user && (
              <>
                <Link to="/signup">
                  <Button variant="outline">Inscription</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">Connexion</Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
          <div className="flex md:hidden gap-4">
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="relative flex flex-1 flex-col bg-background">
        <main className="flex flex-col flex-1">
          <div className="container px-4 md:px-8 relative max-w-screen-2xl flex-1 flex flex-col">
            <section className="flex flex-col flex-1 py-2">
              <Outlet />
            </section>
          </div>
        </main>
      </div>
      <Toaster richColors />
    </div>
  )
}

export default App
