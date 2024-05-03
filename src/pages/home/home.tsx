export const Home = () => {

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-screen overflow-hidden">
      <div
        className="flex items-center flex-col light justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-2xl md:text-6xl font-bold text-center">
          Mythica
        </h2>
        <p className="text-muted-foreground text-sm md:text-2xl max-w-xl mt-6 text-center">
          Gérez votre collection de cartes à collectionner en ligne.
        </p>
      </div>
    </div>
  )
}
