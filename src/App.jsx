import Carousel, { CarouselItem } from "./components/Carousel";

const App = () => {
  return (
    <div className="app">
      <Carousel show={1} infiniteLoop={true}>
        <CarouselItem>
          <div style={{ padding: "0 10px" }}>Item 1</div>
        </CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
        <CarouselItem>Item 4</CarouselItem>
        <CarouselItem>Item 5</CarouselItem>
        <CarouselItem>Item 6</CarouselItem>
      </Carousel>
    </div>
  );
};

export default App;
