import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductFilter from "./ProductFilter";
import { ProductFilterProvider } from "../../../context/filterProducts/filterProductProvider";
import { useProductFilter } from "../../../context/filterProducts/useFilterProduct";
import type { Product } from "../../../types/Product";

const fixture: Product[] = [
  { id: 1, name: "Jabón de Lavanda", department: "Bienestar", category: "Jabones" },
  { id: 2, name: "Aceite esencial de Eucalipto", department: "Bienestar", category: "Aceites" },
  { id: 3, name: "Vela de Soja Calmante", department: "Hogar", category: "Velas" },
];

function Results() {
  const { filteredProducts } = useProductFilter();
  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

function renderFilter() {
  render(
    <ProductFilterProvider>
      <ProductFilter products={fixture} />
      <Results />
    </ProductFilterProvider>
  );
}

function resultNames(): (string | null)[] {
  return screen.queryAllByRole("listitem").map((item) => item.textContent);
}

describe("ProductFilter", () => {
  it("lista todos los productos sin filtros", () => {
    renderFilter();
    expect(resultNames()).toEqual([
      "Jabón de Lavanda",
      "Aceite esencial de Eucalipto",
      "Vela de Soja Calmante",
    ]);
  });

  it("filtra por nombre de forma case-insensitive", async () => {
    const user = userEvent.setup();
    renderFilter();
    const input = screen.getByPlaceholderText("Buscar producto...");
    await user.type(input, "JAB");
    expect(resultNames()).toEqual(["Jabón de Lavanda"]);
  });

  it("filtra por nombre parcial", async () => {
    const user = userEvent.setup();
    renderFilter();
    const input = screen.getByPlaceholderText("Buscar producto...");
    await user.type(input, "ela");
    expect(resultNames()).toEqual(["Vela de Soja Calmante"]);
  });

  it("sin coincidencias por nombre muestra lista vacía", async () => {
    const user = userEvent.setup();
    renderFilter();
    const input = screen.getByPlaceholderText("Buscar producto...");
    await user.type(input, "xyz");
    expect(resultNames()).toEqual([]);
  });

  it("filtra por departamento y restringe las categorías al departamento", async () => {
    const user = userEvent.setup();
    renderFilter();
    const [departmentSelect, categorySelect] = screen.getAllByRole("combobox");
    await user.selectOptions(departmentSelect, "Bienestar");
    expect(resultNames()).toEqual(["Jabón de Lavanda", "Aceite esencial de Eucalipto"]);
    const categoryOptions = within(categorySelect)
      .getAllByRole("option")
      .map((option) => option.textContent);
    expect(categoryOptions).toEqual(["Todas las categorías", "Jabones", "Aceites"]);
    expect(categoryOptions).not.toContain("Velas");
  });

  it("lista departamentos únicos", async () => {
    const user = userEvent.setup();
    renderFilter();
    const [departmentSelect] = screen.getAllByRole("combobox");
    await user.selectOptions(departmentSelect, "Todos los departamentos");
    const options = within(departmentSelect)
      .getAllByRole("option")
      .map((option) => option.textContent);
    expect(options).toEqual(["Todos los departamentos", "Bienestar", "Hogar"]);
  });

  it("filtra por categoría", async () => {
    const user = userEvent.setup();
    renderFilter();
    const [, categorySelect] = screen.getAllByRole("combobox");
    await user.selectOptions(categorySelect, "Velas");
    expect(resultNames()).toEqual(["Vela de Soja Calmante"]);
  });

  it("combina nombre, departamento y categoría con intersección correcta", async () => {
    const user = userEvent.setup();
    renderFilter();
    const input = screen.getByPlaceholderText("Buscar producto...");
    const [departmentSelect, categorySelect] = screen.getAllByRole("combobox");
    await user.type(input, "aceite");
    await user.selectOptions(departmentSelect, "Bienestar");
    await user.selectOptions(categorySelect, "Aceites");
    expect(resultNames()).toEqual(["Aceite esencial de Eucalipto"]);
  });

  it("[CA-26] perder el foco no borra la búsqueda", async () => {
    const user = userEvent.setup();
    renderFilter();
    const input = screen.getByPlaceholderText("Buscar producto...");
    await user.type(input, "jab");
    await user.tab();
    expect(input).toHaveValue("jab");
    expect(resultNames()).toEqual(["Jabón de Lavanda"]);
  });
});