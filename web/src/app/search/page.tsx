import { fetchAlbums } from '@/apis/fetchAlbums';
import { fetchCategories } from '@/apis/fetchCategories';
import CameraButton from '@/app/search/CameraButton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import Image from 'next/image';

export default async function Search() {
  const [albums, categories] = await Promise.all([
    fetchAlbums(),
    fetchCategories(),
  ]);

  const albumMap = albums.reduce((acc: any, album: any) => {
    acc[album.id] = album;
    return acc;
  }, {});

  return (
    <>
      <header className="flex flex-col gap-2 overscroll-none p-4 sticky">
        <div className="flex gap-2 align-center">
          <Badge className="rounded-full size-8 bg-amber-400">재</Badge>
          <span className="text-xl font-semibold">Search</span>
          <CameraButton className="ml-auto" />
        </div>
        <Input
          className="bg-foreground text-background"
          placeholder="What do you want to listen to?"
        />
      </header>
      <div className="p-4 flex flex-col gap-4">
        <h1 className="font-bold">Browse all</h1>

        <div className="grid grid-cols-2 gap-2">
          {categories.map((category: any, index: number) => (
            <Card
              className="w-full h-24 relative overflow-clip"
              key={index}
              style={{ background: category.bgColor }}
            >
              <CardContent className="flex items-center justify-start p-2 rounded-tl-4 gap-2">
                <Image
                  className="h-16 w-16 rotate-12 absolute right-0 bottom-0 translate-x-2 translate-y-4"
                  src={albumMap[category.albumId]?.cover}
                  alt={category.label}
                  width="100"
                  height="100"
                />
                <span className="text-sm font-semibold ">{category.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
