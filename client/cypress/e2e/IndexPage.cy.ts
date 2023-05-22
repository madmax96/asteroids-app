import AsteroidsFeedJson from "../fixtures/asteroidsFeed.json";
import dayjs from "dayjs";

describe("IndexPage spec", () => {
  describe("when api call for asteroids feed is successfull", () => {
    function onBeforeLoad(window) {
      cy.stub(window, "fetch").resolves({
        ok: true,
        status: 200,
        json: () => Promise.resolve(AsteroidsFeedJson),
      });
    }
    beforeEach(() => {
      cy.visit("/", {
        onBeforeLoad,
      });
    });
    it("should render start date to current date", () => {
      cy.get('input[placeholder="YYYY-MM-DD"]') // TODO: need stronger selector for DatePicker component
        .first()
        .should("have.value", dayjs().format("YYYY-MM-DD"));
    });

    it("should render end date to current date + 7 days", () => {
      cy.get('input[placeholder="YYYY-MM-DD"]') // TODO: need stronger selector for DatePicker component
        .eq(1)
        .should("have.value", dayjs().add(7, "days").format("YYYY-MM-DD"));
    });

    it("should render show all favourites switch as disabled", () => {
      cy.get('[data-test-id="show-all-favourites-switch"]').should(
        "not.have.class",
        "Mui-checked"
      );
    });

    it("should render data table with first 20 asteroids", () => {
      cy.get(".MuiDataGrid-root").within(() => {
        cy.get(".MuiDataGrid-row").should("have.length", 20);
        cy.get(".MuiDataGrid-row").each((row, i) => {
          cy.wrap(row)
            .invoke("attr", "data-id")
            .should("equal", AsteroidsFeedJson[i].id);
        });
      });
    });
  });
});
