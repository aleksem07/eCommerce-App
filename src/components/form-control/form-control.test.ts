import ValidatorUtil from "@Utils/validator/validator";
import FormControlComponent from "./form-control";
import FormControlView from "./form-control.view";

describe("FormControlComponent", () => {
  describe("inputHandler", () => {
    it("should call showValidation method of FormControlView when input is valid", async () => {
      // Arrange
      const formControlViewMock = jest.spyOn(FormControlView.prototype, "showValidation");
      const validatorUtilMock = jest.spyOn(ValidatorUtil.prototype, "validate");
      const formControlComponent = new FormControlComponent({
        formName: "testForm",
        inputName: "testInput",
        labelText: "Test Label",
        helpText: "Test Help Text",
      });
      const inputText = "valid input";

      // Act
      await formControlComponent.inputHandler(inputText);

      // Assert
      expect(validatorUtilMock).toHaveBeenCalledWith("testInput", inputText);
      expect(formControlViewMock).toHaveBeenCalledWith(true);
    });
  });
});
