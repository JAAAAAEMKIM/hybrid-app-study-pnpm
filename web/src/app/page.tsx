import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="h-[100vh] flex flex-col">
      <header className="flex gap-2 overscroll-none p-4 sticky">
        <Badge className="rounded-full size-8 bg-amber-400">재</Badge>
        <div className="flex gap-3">
          <Badge className="bg-green-700">All</Badge>
          <Badge className="bg-gray-600">Music</Badge>
          <Badge className="bg-gray-600">Podcasts</Badge>
        </div>
      </header>
      <ScrollArea className="h-full overflow-auto">
        <main className="py-8">
          <section className="grid grid-cols-2 gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card className="w-full h-16" key={index}>
                <CardContent className="flex items-center justify-center">
                  <span className="text-4xl font-semibold dark:text-white">
                    {index + 1}
                  </span>
                </CardContent>
              </Card>
            ))}
          </section>
          <section className="">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight dark:text-white">
              It&apos;s New Music Friday!
            </h3>
            <Carousel>
              <CarouselContent className="p-1 size-2/5">
                {Array.from({ length: 15 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 size-full">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                      <span className="w-full break-all">
                        texteststexttesttexttetxttext
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
          <section className="">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              Jump back in
            </h3>
            <Carousel>
              <CarouselContent className="p-1 size-2/5">
                {Array.from({ length: 15 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 size-full">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                      <span className="w-full break-all">
                        namenamenamenamenamenamenamename
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
        </main>
      </ScrollArea>
      <footer className="sticky bottom-0 w-full bg-white text-black dark:bg-black dark:text-white flex justify-around align-center">
        <Button className="h-16" variant="ghost">
          Home
        </Button>
        <Button className="h-16" variant="ghost">
          Search
        </Button>
        <Button className="h-16" variant="ghost">
          Library
        </Button>
        <Button className="h-16" variant="ghost">
          Create
        </Button>
      </footer>
    </div>
  );
}
