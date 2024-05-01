import { Vortex } from "@/components/vortex"

export const Home = () => {

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        className="flex items-center flex-col light justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-black text-2xl md:text-6xl font-bold text-center">
          The hell is this?
        </h2>
        <p className="text-muted-foreground text-sm md:text-2xl max-w-xl mt-6 text-center">
          This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
          burned and you&apos;ll have a scar.
        </p>
      </Vortex>
    </div>
  )
}