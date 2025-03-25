import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { DayBased, OldFavorites, RecentlyPlayed } from '@/types';
import MusicCard from '@/components/MusicCard';

export default async function Home() {
  const data = await Promise.all([
    fetch('http://localhost:3001/recentlyPlayed'),
    fetch('http://localhost:3001/dayBased'),
    fetch('http://localhost:3001/oldFavorites'),
  ]);
  const [recentlyPlayed, dayBased, oldFavorites]: [
    RecentlyPlayed[],
    DayBased[],
    OldFavorites[]
  ] = await Promise.all([data[0].json(), data[1].json(), data[2].json()]);

  return (
    <>
      <header className="flex gap-2 overscroll-none p-4 sticky">
        <Badge className="rounded-full size-8 bg-amber-400">재</Badge>
        <div className="flex gap-3">
          <Badge className="bg-green-700 text-white">All</Badge>
          <Badge className="bg-gray-600 text-white">Music</Badge>
          <Badge className="bg-gray-600 text-white">Podcasts</Badge>
        </div>
      </header>
      <div className="h-full overflow-x-hidden overflow-y-auto py-0">
        <main className="my-8">
          <section className="grid grid-cols-2 gap-2 px-4">
            {recentlyPlayed.map((music) => (
              <MusicCard key={music.track.id} music={music.track} />
            ))}
          </section>
          <section className="flex flex-col gap-4 px-4">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              It&apos;s New Music Friday!
            </h3>
            <Carousel>
              <CarouselContent className="size-2/5">
                {dayBased.map((music, index) => (
                  <CarouselItem key={index}>
                    <div className="size-full">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0 rounded-sm overflow-hidden">
                          <Image
                            className="h-full w-full"
                            src={music.track.album?.cover ?? ''}
                            alt={music.track.title}
                            width="200"
                            height="200"
                          />
                        </CardContent>
                      </Card>
                      <span className="w-full break-all">
                        {music.track.title}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
          <section className="flex flex-col gap-4 px-4">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              Jump back in
            </h3>
            <Carousel opts={{}}>
              <CarouselContent className="size-2/5">
                {oldFavorites.map((music, index) => (
                  <CarouselItem key={index}>
                    <div className="size-full">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0 rounded-sm overflow-hidden">
                          <Image
                            className="h-full w-full"
                            src={music.track.album?.cover ?? ''}
                            alt={music.track.title}
                            width="200"
                            height="200"
                          />
                        </CardContent>
                      </Card>
                      <span className="w-full break-all">
                        {music.track.title}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
        </main>
      </div>
    </>
  );
}
