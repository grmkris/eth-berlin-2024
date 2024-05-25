import Image from "next/image";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 m-0">
      <div className="relative flex flex-col place-items-center gap-20 before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative object-contain w-2/2 h-auto"
          src="/bet-logo.png"
          alt="Bet&Bed logo"
          width={360}
          height={74}
          priority
        />
      </div>
      <p className="text-white stick-no-bills-800 mt-20 text-3xl">
        Blind auctions to find your 
      </p>
      <p className="text-white stick-no-bills-800 mt-0 text-3xl">
      perfect match in crowded cities. 
      </p>
      <Button  className="mt-[10%] w-content p-4 xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl" variant="outline">DEMO</Button>

      <Image
          className="absolute bottom-[0%] left-[0%] object-contain w-2/5 h-auto"
          src="/goat-logo.png"
          alt="Bet&Bed logo"
          width={630}
          height={130}
          priority
      />  
       <Image
          className="absolute bottom-[0%] right-[0%] object-contain w-[32%] h-auto"
          src="/face1.png"
          alt="Bet&Bed logo face"
          width={630}
          height={130}
          priority
      />  
    </main>
  );
}
