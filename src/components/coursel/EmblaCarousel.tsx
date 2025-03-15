import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { CarsoulType } from '@/lib/type/product';
import { GridTileImage } from '@/components/grid/tile';

type PropType = {
  slides: CarsoulType;
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef

  ] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 })
  ]);


  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={Math.random()}>
              <div className="embla__slide__number">
                <GridTileImage
                  alt={index.name}
                  label={{
                    title: index.name
                  }}
                  src={index.featuredImage.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
