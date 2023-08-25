import Isotope from "isotope-layout";

export default class FilterIsotopeUtil {
  isotope: Isotope;

  constructor(grid: string) {
    this.isotope = new Isotope(grid, {
      itemSelector: ".col",
      layoutMode: "fitRows",
      masonry: {
        columnWidth: 33.3333,
      },
      getSortData: {
        name: ".card-title",
      },
      sortBy: "name",
    });
  }
}
