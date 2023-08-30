const SwiperMock = jest.fn().mockImplementation(() => {
  return {
    update: jest.fn(),
    slideNext: jest.fn(),
    slidePrev: jest.fn(),
  };
});

export default SwiperMock;
